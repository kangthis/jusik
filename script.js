document.getElementById('predictBtn').addEventListener('click', function() {
    const stockName = document.getElementById('stockName').value;
    if (stockName) {
        fetch(`https://openai.highbuff.com/?method=portfolioAI&name=${stockName}`)
            .then(response => {
                // 응답이 JSON인지 확인
                if (!response.ok) {
                    throw new Error('네트워크 응답이 좋지 않습니다.');
                }
                return response.text(); // 응답을 텍스트로 변환
            })
            .then(text => {
                try {
                    const data = JSON.parse(text); // 텍스트를 JSON으로 파싱
                    document.getElementById('result').innerHTML = `
                        <h2>${stockName} 예측 결과</h2>
                        <p>예측 값: ${data.prediction}</p>
                    `;
                } catch (error) {
                    document.getElementById('result').innerHTML = `<p>응답을 JSON으로 변환하는 중 오류가 발생했습니다: ${error.message}</p>`;
                }
            })
            .catch(error => {
                document.getElementById('result').innerHTML = `<p>오류가 발생했습니다: ${error.message}</p>`;
            });
    } else {
        alert('종목 이름을 입력하세요.');
    }
});