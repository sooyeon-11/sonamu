/* 슬라이드 토글 */
document.querySelectorAll(".acc_btn").forEach((button) => {
    button.addEventListener("click", function () {
        const content = this.nextElementSibling;

        // 모든 패널을 닫기
        document.querySelectorAll(".acc_cont").forEach((el) => {
            if (el !== content) {
                el.style.maxHeight = null;
            }
        });

        // 현재 패널 열기/닫기
        if (content.style.maxHeight) {
            content.style.maxHeight = null; // 닫기
        } else {
            content.style.maxHeight = content.scrollHeight + "px"; // 열기
        }
    });
});



/* 색상변환 */

let selectedElement = null;

function toggleColor(element) {
    if (selectedElement && selectedElement !== element) {
        selectedElement.classList.remove('clicked');
    }

    element.classList.toggle('clicked');

    selectedElement = element.classList.contains('clicked') ? element : null;
}


/* 페이지네이션 */

function createPagination(totalPages, currentPage) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // 기존 내용 삭제

    // "이전" 버튼 생성
    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.classList.add('prev');
    prevButton.innerHTML = '&laquo;';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            createPagination(totalPages, currentPage - 1);
            // 페이지 내용 업데이트하는 함수 호출
            updatePageContent(currentPage - 1);
        }
    });
    paginationContainer.appendChild(prevButton);

    // 페이지 번호 버튼 생성
    const maxVisiblePages = 1; // 한 번에 보여줄 페이지 수
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisiblePages) {
        // 현재 페이지가 앞쪽에 있을 때
        if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
            endPage = maxVisiblePages;
        }
        // 현재 페이지가 뒤쪽에 있을 때
        else if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
            startPage = totalPages - maxVisiblePages + 1;
        }
        // 현재 페이지가 중간에 있을 때
        else {
            startPage = currentPage - Math.floor(maxVisiblePages / 2);
            endPage = currentPage + Math.ceil(maxVisiblePages / 2) - 1;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.classList.add('page-number');
        pageLink.textContent = i;

        if (i === currentPage) {
            pageLink.classList.add('active');
        }

        pageLink.addEventListener('click', () => {
            createPagination(totalPages, i);
            // 페이지 내용 업데이트하는 함수 호출
            updatePageContent(i);
        });
        paginationContainer.appendChild(pageLink);
    }

    // "다음" 버튼 생성
    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.classList.add('next');
    nextButton.innerHTML = '&raquo;';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            createPagination(totalPages, currentPage + 1);
            // 페이지 내용 업데이트하는 함수 호출
            updatePageContent(currentPage + 1);
        }
    });
    paginationContainer.appendChild(nextButton);
}

// 페이지 내용 업데이트 (데이터 로딩) 함수 예시
function updatePageContent(pageNumber) {
    // 여기에 페이지 번호(pageNumber)에 따라 데이터를 가져오거나 필터링하는 로직을 구현합니다.
    // 예를 들어, AJAX 요청을 보내서 서버에서 해당 페이지의 데이터를 가져올 수 있습니다.
    console.log('현재 페이지:', pageNumber);
    // 가져온 데이터를 화면에 표시하는 로직을 추가합니다.
}

// 초기 페이지네이션 생성 (총 페이지 수와 초기 페이지 번호 설정)
const totalPages = 10; // 총 페이지 수 예시
const initialPage = 1; // 초기 페이지 번호
createPagination(totalPages, initialPage);
updatePageContent(initialPage)