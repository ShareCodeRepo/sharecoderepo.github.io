# -----------------------------------------------------------------------------
# [LottoProject] 통합 빌드 스크립트
# 1. 데이터 생성 (C++ Native)
# 2. 데이터 이동 (bin 폴더 정리)
# 3. 웹 리소스 복사
# 4. WASM 컴파일 (Emscripten)
# -----------------------------------------------------------------------------

$ErrorActionPreference = "Stop"

echo "🚀 Build Process Started..."

# 0. 폴더 정리 (Clean)
if (Test-Path "build") { 
    echo "🧹 Cleaning build folder..."
    Remove-Item "build" -Recurse -Force 
}
New-Item -ItemType Directory -Path "build" -Force | Out-Null

if (Test-Path "bin") {
    # 기존 bin은 놔둘지 지울지 선택 (여기선 안전하게 유지하거나, 새로 만들고 싶으면 주석 해제)
    # echo "🧹 Cleaning bin folder..."
    # Remove-Item "bin" -Recurse -Force
} else {
    New-Item -ItemType Directory -Path "bin" -Force | Out-Null
}

# -----------------------------------------------------------------------------
# 1. 데이터 생성기 컴파일 및 실행 (PreCompute)
# -----------------------------------------------------------------------------
echo "⚙️ [Step 1] Compiling & Running PreCompute..."

# 컴파일 (MSVC 기준, 없을 시 g++ 사용하도록 수정 필요)
# /Fe:PreCompute.exe는 출력 파일명 지정
cl /EHsc /std:c++20 /O2 src/cpp/PreCompute.cpp /Fe:PreCompute.exe
if (-not $?) { Write-Error "PreCompute compilation failed!"; exit 1 }

# 실행 (데이터 생성 -> bin/ 폴더에 파일들 생성됨)
# PreCompute.exe는 현재 폴더(루트)에서 실행되므로, 코드 내부의 "bin/xxx" 경로가 "LottoProject/bin/xxx"가 됨
.\PreCompute.exe
if (-not $?) { Write-Error "PreCompute execution failed!"; exit 1 }

# 임시 실행파일 정리
Remove-Item "PreCompute.exe", "PreCompute.obj" -ErrorAction SilentlyContinue

# -----------------------------------------------------------------------------
# 2. 웹 리소스 복사
# -----------------------------------------------------------------------------
echo "📂 [Step 2] Copying Web Assets..."
Copy-Item "src/web/*" "build/" -Recurse -Force

# -----------------------------------------------------------------------------
# 3. WASM 컴파일 (lotto_web.cpp)
# -----------------------------------------------------------------------------
echo "🔨 [Step 3] Compiling WASM (lotto_web.cpp)..."

# 데이터 파일 4개를 모두 패키징 (--preload-file)
# 실제 경로(bin/xxx) @ 가상 경로(bin/xxx)
emcc src/cpp/lotto_web.cpp -o build/lotto_web.js `
  -O3 `
  --bind `
  --preload-file bin/combos.bin@bin/combos.bin `
  --preload-file bin/oddeven.bin@bin/oddeven.bin `
  --preload-file bin/sum.bin@bin/sum.bin `
  --preload-file bin/tier.bin@bin/tier.bin `
  -s ALLOW_MEMORY_GROWTH=1 `
  -s MODULARIZE=1 `
  -s EXPORT_ES6=1 `
  -s "EXPORTED_RUNTIME_METHODS=['ccall']"

if ($?) {
    echo "✅ Build Complete!"
    echo "👉 To run: python -m http.server 8000 --directory build"
} else {
    Write-Error "❌ WASM Compilation Failed."
}
