document.getElementById('predictBtn').addEventListener('click', function() {
    const stockName = document.getElementById('stockName').value;
    if (stockName) {
        fetch(`https://openai.highbuff.com/?method=portfolioAI&name=${stockName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 좋지 않습니다.');
                }
                return response.blob(); // 응답을 Blob으로 변환
            })
            .then(blob => {
                const imgUrl = URL.createObjectURL(blob); // Blob을 URL로 변환
                document.getElementById('result').innerHTML = `
                    <h2>${stockName} 예측 결과</h2>
                    <img src="${imgUrl}" alt="${stockName} 예측 이미지" style="max-width: 100%; height: auto;">
                `;
            })
            .catch(error => {
                document.getElementById('result').innerHTML = `<p>오류가 발생했습니다: ${error.message}</p>`;
            });
    } else {
        alert('종목 이름을 입력하세요.');
    }
});