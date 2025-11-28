#include <iostream>
#include <vector>
#include <cstdint>
#include <algorithm>
#include <fstream>
#include <execution>
#include <filesystem>
#include <iomanip>
#include <span>

namespace fs = std::filesystem;

struct LottoCombo
{
    uint8_t nums[6];
};

// ---------------------------------------------------------------
// 1) Generate 8,145,060 combinations (FAST: resize + direct index)
// ---------------------------------------------------------------
void generate_all_combos(std::vector<LottoCombo> &out)
{
    constexpr size_t TOTAL = 8'145'060;

    out.resize(TOTAL);

    size_t idx = 0;
    LottoCombo c;

    for (uint8_t i1 = 1; i1 <= 40; ++i1)
    {
        c.nums[0] = i1;
        for (uint8_t i2 = i1 + 1; i2 <= 41; ++i2)
        {
            c.nums[1] = i2;
            for (uint8_t i3 = i2 + 1; i3 <= 42; ++i3)
            {
                c.nums[2] = i3;
                for (uint8_t i4 = i3 + 1; i4 <= 43; ++i4)
                {
                    c.nums[3] = i4;
                    for (uint8_t i5 = i4 + 1; i5 <= 44; ++i5)
                    {
                        c.nums[4] = i5;
                        for (uint8_t i6 = i5 + 1; i6 <= 45; ++i6)
                        {
                            c.nums[5] = i6;
                            out[idx++] = c;
                        }
                    }
                }
            }
        }
    }
}

// ---------------------------------------------------------------
// 2) Parallel statistics processing (No index vector)
// ---------------------------------------------------------------
void process_stats(
    std::span<const LottoCombo> combos,
    std::vector<uint8_t> &oddEven,
    std::vector<uint16_t> &sumData,
    std::vector<uint8_t> &tierData)
{
    const size_t n = combos.size();

    oddEven.resize(n);
    sumData.resize(n);
    tierData.resize(n);

    std::for_each(std::execution::par_unseq,
                  combos.begin(), combos.end(),
                  [&](const LottoCombo &c)
                  {
                      size_t i = &c - combos.data();

                      int odd = 0;
                      int sum = 0;
                      int low = 0, mid = 0, high = 0;

                      for (uint8_t v : c.nums)
                      {
                          if (v & 1)
                              odd++;
                          sum += v;

                          if (v <= 15)
                              low++;
                          else if (v <= 30)
                              mid++;
                          else
                              high++;
                      }

                      oddEven[i] = static_cast<uint8_t>(odd);
                      sumData[i] = static_cast<uint16_t>(sum);
                      tierData[i] = static_cast<uint8_t>((low << 4) | (mid << 2) | high);
                  });
}

// ---------------------------------------------------------------
// 3) Save binary using span
// ---------------------------------------------------------------
template <typename T>
void save_bin(const std::string &filename, std::span<const T> data)
{
    fs::path dir = "bin";
    fs::path file = dir / filename;

    std::error_code ec;
    if (!fs::exists(dir, ec))
        fs::create_directories(dir, ec);

    std::ofstream ofs(file, std::ios::binary);
    if (!ofs)
        throw std::runtime_error("Cannot open file: " + file.string());

    ofs.write(reinterpret_cast<const char *>(data.data()), data.size_bytes());

    double mb = double(data.size_bytes()) / (1024.0 * 1024.0);
    std::cout << "[Saved] " << std::setw(12) << filename
              << "  (" << std::fixed << std::setprecision(2) << mb << " MB)\n";
}

// ---------------------------------------------------------------
int main()
{
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);

    try
    {
        std::cout << ">>> Step 1: Generating combinations...\n";
        std::vector<LottoCombo> combos;
        generate_all_combos(combos);
        std::cout << "    Total: " << combos.size() << "\n";

        std::cout << ">>> Step 2: Processing statistics...\n";
        std::vector<uint8_t> oddEven;
        std::vector<uint16_t> sumData;
        std::vector<uint8_t> tierData;

        process_stats(std::span<const LottoCombo>(combos), oddEven, sumData, tierData);

        std::cout << ">>> Step 3: Saving files to bin/ ...\n";
        save_bin("combos.bin", std::span<const LottoCombo>(combos));
        save_bin("oddeven.bin", std::span<const uint8_t>(oddEven));
        save_bin("sum.bin", std::span<const uint16_t>(sumData));
        save_bin("tier.bin", std::span<const uint8_t>(tierData));

        std::cout << "\n>>> Completed.\n";
    }
    catch (const std::exception &ex)
    {
        std::cerr << "[FATAL] " << ex.what() << "\n";
        return 1;
    }
    return 0;
}
