const tabList = document.querySelectorAll('.inner .menu li');
for(var i = 0; i < tabList.length; i++){
  tabList[i].querySelector('.btn').addEventListener('click', function(e){
    e.preventDefault();
    for(var j = 0; j < tabList.length; j++){
      tabList[j].classList.remove('is_on');
    }
    this.parentNode.classList.add('is_on');
  });
}



document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".menu li a"); // 모든 탭 버튼 선택
    const contents = document.querySelectorAll(".cont"); // 모든 탭 내용 선택

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function (e) {
            e.preventDefault(); // a 태그 기본 동작 방지

            // 모든 탭 버튼, 내용 초기화
            tabs.forEach(t => t.parentElement.classList.remove("is_on"));
            contents.forEach(c => c.classList.remove("active"));

            // 클릭된 탭 활성화
            this.parentElement.classList.add("is_on");
            contents[index].classList.add("active");
        });
    });
});

