#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <vector>
#include <string>
#include <sstream>
#include <random>
#include <algorithm>
#include <numeric>
#include <iostream>
#include <iomanip>

// [중요] 새로 생성된 데이터 파일 포함
#include "transitions_data.cpp"

using namespace emscripten;

// -------------------------------------------------------
// 1. 기본 데이터 구조 (로또 조합)
// -------------------------------------------------------
struct Combo
{
    uint8_t n1, n2, n3, n4, n5, n6;
};
std::vector<Combo> all_combos;

inline int get_sum(const Combo &c) { return c.n1 + c.n2 + c.n3 + c.n4 + c.n5 + c.n6; }

std::string format_combo(int index, const Combo &c)
{
    std::stringstream ss;
    ss << "#" << index << ": ["
       << (int)c.n1 << ", " << (int)c.n2 << ", " << (int)c.n3 << ", "
       << (int)c.n4 << ", " << (int)c.n5 << ", " << (int)c.n6 << "] "
       << "(합계: " << get_sum(c) << ")";
    return ss.str();
}

// -------------------------------------------------------
// 2. VBA 로직 이식: 범위 교차 확인
// -------------------------------------------------------
// Public Function RangesIntersect(a1, b1, a2, b2)
bool ranges_intersect(int a1, int b1, int a2, int b2)
{
    // Not (b1 < a2 Or b2 < a1)
    return !(b1 < a2 || b2 < a1);
}

// -------------------------------------------------------
// 3. 기능 함수들
// -------------------------------------------------------
bool load_data()
{
    all_combos.clear();
    all_combos.reserve(8145060);
    for (int i = 1; i <= 40; ++i)
    {
        for (int j = i + 1; j <= 41; ++j)
        {
            for (int k = j + 1; k <= 42; ++k)
            {
                for (int l = k + 1; l <= 43; ++l)
                {
                    for (int m = l + 1; m <= 44; ++m)
                    {
                        for (int n = m + 1; n <= 45; ++n)
                        {
                            all_combos.push_back({(uint8_t)i, (uint8_t)j, (uint8_t)k, (uint8_t)l, (uint8_t)m, (uint8_t)n});
                        }
                    }
                }
            }
        }
    }
    return true;
}

val get_random_combos(int count)
{
    val result = val::array();
    if (all_combos.empty())
        return result;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(0, all_combos.size() - 1);
    for (int i = 0; i < count; ++i)
    {
        int idx = dis(gen);
        result.call<void>("push", format_combo(idx, all_combos[idx]));
    }
    return result;
}

val filter_by_sum(int minSum, int maxSum, int limit)
{
    val result = val::array();
    int count = 0;
    for (size_t i = 0; i < all_combos.size(); ++i)
    {
        int s = get_sum(all_combos[i]);
        if (s >= minSum && s <= maxSum)
        {
            result.call<void>("push", format_combo(i, all_combos[i]));
            count++;
            if (count >= limit)
                break;
        }
    }
    return result;
}

// -------------------------------------------------------
// 4. 마르코프 예측 (VBA NextSumTopN_RangeAroundLatest 완벽 구현)
// -------------------------------------------------------
val predict_next_markov(int currentSum, int W, int topN, float thr)
{
    val result = val::array();

    // 범위: [S-W, S+W]
    int L = currentSum - W;
    int U = currentSum + W;

    int nCols = next_sum_labels.size();
    if (nCols == 0)
        return result;

    std::vector<double> sumWeighted(nCols, 0.0);
    double weightTotal = 0.0;

    for (const auto &row : transitions)
    {
        // [수정] 단일 값 비교 (범위 안에 들어오는지)
        // row.prev_val은 데이터 파일의 A열 값 (예: 105, 106...)
        if (row.prev_val >= L && row.prev_val <= U)
        {
            if (row.row_count > 0)
            {
                for (int j = 0; j < nCols; ++j)
                {
                    if (j < row.probs.size())
                    {
                        sumWeighted[j] += row.probs[j] * (double)row.row_count;
                    }
                }
                weightTotal += (double)row.row_count;
            }
        }
    }

    if (weightTotal <= 0.0)
        return result;

    // 3. 결과 구조체 및 정렬
    struct ResItem
    {
        int sum;
        double prob;
    };
    std::vector<ResItem> ranked;
    ranked.reserve(nCols);

    // 확률 계산 및 필터링
    for (int j = 0; j < nCols; ++j)
    {
        double p = sumWeighted[j] / weightTotal;
        // VBA InputBox Threshold (여기선 double로 비교)
        if (p >= (double)thr)
        {
            ranked.push_back({next_sum_labels[j], p});
        }
    }

    // 4. 정렬 (VBA: ArgsortDesc)
    // 정렬 기준: 1순위 확률(내림차순), 2순위 합계(오름차순)
    std::sort(ranked.begin(), ranked.end(), [](const ResItem &a, const ResItem &b)
              {
        // 오차 범위 내에서 다르면 비교
        if (std::abs(a.prob - b.prob) > 1e-12) {
            return a.prob > b.prob; // 확률 높으면 앞
        }
        // 확률 같으면 합계(Column Label) 작으면 앞 (VBA 87 vs 121 이슈 해결)
        return a.sum < b.sum; });

    // 5. Top N 반환
    int count = 0;
    for (const auto &item : ranked)
    {
        val resObj = val::object();
        resObj.set("sum", item.sum);
        resObj.set("prob", item.prob); // JS에 그대로 double 전달
        result.call<void>("push", resObj);

        count++;
        if (count >= topN)
            break;
    }

    return result;
}

EMSCRIPTEN_BINDINGS(my_module)
{
    function("load_data", &load_data);
    function("get_random_combos", &get_random_combos);
    function("filter_by_sum", &filter_by_sum);
    function("predict_next_markov", &predict_next_markov);
}
