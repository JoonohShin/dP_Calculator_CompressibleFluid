// 파이썬의 calc_pressure_loss_10m 함수를 JS로 변환한 함수
function calcPressureLoss10m(d_mm, Q_lpm, P_mpa) {
    // L = 10 m (고정)
    const L = 10.0;
    const numerator = 0.00237 * Math.pow(Q_lpm, 2) * L;
    const denominator = Math.pow(d_mm, 5.31) * (P_mpa + 0.1013);

    return numerator / denominator; // MPa / 10m
}

// DOM이 로드된 후 이벤트 연결
document.addEventListener("DOMContentLoaded", function () {
    const diameterInput = document.getElementById("diameter");
    const flowrateInput = document.getElementById("flowrate");
    const pressureInput = document.getElementById("pressure");
    const calcButton = document.getElementById("calcButton");
    const resultBox = document.getElementById("result");
    const errorBox = document.getElementById("error");

    calcButton.addEventListener("click", function () {
        // 기존 에러 메시지 숨기기
        errorBox.style.display = "none";
        errorBox.textContent = "";

        // 입력값 읽기
        const d = parseFloat(diameterInput.value);
        const Q = parseFloat(flowrateInput.value);
        const P = parseFloat(pressureInput.value);

        // 기본 입력 검증
        if (isNaN(d) || isNaN(Q) || isNaN(P)) {
            errorBox.textContent = "모든 입력값을 숫자로 입력해 주세요.";
            errorBox.style.display = "block";
            resultBox.textContent = "결과가 여기에 표시됩니다.";
            return;
        }

        if (d <= 0 || Q < 0 || P < 0) {
            errorBox.textContent = "배관 내경은 0보다 커야 하며, 유량과 압력은 0 이상이어야 합니다.";
            errorBox.style.display = "block";
            resultBox.textContent = "결과가 여기에 표시됩니다.";
            return;
        }

        // 계산
        const deltaP_10m = calcPressureLoss10m(d, Q, P);

        // 결과 표시 (파이썬에서 f"{deltaP_10m:.6f}"에 대응)
        const deltaP_10m_str = deltaP_10m.toFixed(6);

        resultBox.innerHTML = `
            <strong>계산 결과</strong><br>
            압력손실 ΔP = <strong>${deltaP_10m_str} MPa / 10 m</strong><br>
            <span style="font-size: 0.85rem; color:#555;">
            </span>
        `;
    });
});
