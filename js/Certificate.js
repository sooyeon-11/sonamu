document.addEventListener("DOMContentLoaded", function () {
    const textItems = document.querySelectorAll(".text");
    const cotImages = document.querySelectorAll(".cot_img");
  
    textItems.forEach(item => {
      item.addEventListener("click", function () {
        const targetClass = this.dataset.target;
  
        // 모든 텍스트에서 active 제거 후 현재 선택한 텍스트에만 추가
        textItems.forEach(p => p.classList.remove("active"));
        this.classList.add("active");
  
        // 모든 이미지 숨기고, 해당하는 cot_img만 보이게
        cotImages.forEach(img => img.classList.remove("active"));
        document.querySelector(`.cot_img.${targetClass}`).classList.add("active");
      });
    });
  
    // 첫 번째 탭 자동 활성화
    textItems[0].click();
  });
  

  document.addEventListener("DOMContentLoaded", function () {
    const textItems = document.querySelectorAll(".text");
    const line = document.querySelector(".certificate-list::after"); // 세로선
  
    textItems.forEach((item, index) => {
      item.addEventListener("click", function () {
        // 모든 텍스트에서 active 제거
        textItems.forEach((el) => el.classList.remove("active"));
  
        // 현재 클릭한 텍스트에 active 추가
        this.classList.add("active");
  
        // 세로선의 높이를 클릭된 버튼에 맞게 변경
        const heightPercentage = (index + 1) * 20; // (예시: 1번 클릭 시 20%, 2번 클릭 시 40%, 3번 클릭 시 60%)
        document.styleSheets[0].addRule(".certificate-list::after", `height: ${heightPercentage}%;`);
      });
    });
  });
  
  textItems.forEach((item, index) => {
    item.addEventListener("click", function () {
       textItems.forEach((el) => el.classList.remove("active"));
       this.classList.add("active");
 
       // 부모 요소에 data-height 값 추가
       document.querySelector(".certificate-list").setAttribute("data-height", (index + 1) * 20);
    });
 });
 