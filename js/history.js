document.addEventListener("DOMContentLoaded", () => {
    const ham = document.querySelector(".ham");
    const mgnb = document.querySelector(".mgnb");

    ham.addEventListener("click", () => {
        ham.classList.toggle("active");
        mgnb.classList.toggle("active");
    });

    const menuItems = document.querySelectorAll(".mgnb");
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            ham.classList.remove("active");
            mgnb.classList.remove("active");
        });
    });
});

//메인
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1101px)", () => {
        historyBgAnimation();
        historyAreaPinAnimation();
        addScrolledClass();
    });
});

function historyBgAnimation() {
    // 초기 상태 강제 지정
    gsap.set(".main_bg", {
        opacity: 1,
        scale: 0.47,
        y: 0 // 스크롤 전 transform 값이 0이 되도록 설정
    });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main_bg",
            start: "top 70%",
            end: "top 30%",
            scrub: 1.5,
            toggleActions: "play none none reverse",
        }
    });

    // let yValue = -5;
    // let scaleValue = 2.5;

    // gsap.matchMedia().add("(max-width: 800px)", () => {
    //     yValue = -6;
    //     scaleValue = 2;
    // });


    tl.fromTo(".main_bg",
        { opacity: 1, scale: 0.47, y: 0 },
        { opacity: 1, scale: 2.5, y: -20, duration: 1.5, ease: "power2.out" }
    );

    tl.to(".dark_overlay", {
        background: "rgba(0, 0, 0, 0.5)",
        duration: 0.6
    }, "-=0.8");

    tl.fromTo(".main_bg_text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4"
    );
}

function historyAreaPinAnimation() {
    ScrollTrigger.create({
        trigger: ".main",
        pin: ".main_bg",
        start: "top top",
        end: "bottom 100%",
        scrub: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
    });
}

function addScrolledClass() {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".main",
            start: "top 30%",
            end: "bottom 100%",
            toggleClass: { targets: ".main", className: "scrolled" },
            toggleActions: "play none none reverse",
            scrub: 1
        }
    });
}


// 스크롤 시 고정 유지
document.addEventListener("DOMContentLoaded", function () {
    let mainYearBottom = document.querySelector(".main_year_bottom");
    let yearItems = document.querySelectorAll(".main_year_bottom ul li");
    let progressBar = document.querySelector(".main_year_bottom .progress");
    let sections = document.querySelectorAll("section[class^='History']");

    let mainYearBottomOffset = mainYearBottom.offsetTop;
    let isFixed = false;

    function updateOffsets() {
        mainYearBottomOffset = mainYearBottom.offsetTop;

        //반응형: 고정될 때 너비와 위치를 조정
        let viewportWidth = window.innerWidth;
        let containerPadding = viewportWidth > 1200 ? 50 : 20; // 예시: 1200px 이상이면 50px 여백, 이하이면 20px
        let maxContainerWidth = viewportWidth; // 최대 너비 제한

        let newWidth = Math.min(viewportWidth - containerPadding * 2, maxContainerWidth);
        mainYearBottom.style.width = newWidth + "px";
        mainYearBottom.style.left = "50%";
        mainYearBottom.style.transform = "translateX(-50%)"; // 중앙 정렬 유지
    }
    // let newLeft = (viewportWidth - newWidth) / 2; // 화면 중앙 정렬

    // mainYearBottom.style.width = newWidth + "px";
    // mainYearBottom.style.left = newLeft + "px";
    // }

    window.addEventListener("resize", updateOffsets);
    updateOffsets(); // 초기 실행

    window.addEventListener("scroll", function () {
        let scrollY = window.scrollY;
        let windowHeight = window.innerHeight;
        let scrollPosition = scrollY + windowHeight / 2; // 화면 중앙 기준

        // 특정 위치를 지나면 고정(fixed) 적용
        if (scrollY > mainYearBottomOffset) {
            if (!isFixed) {
                mainYearBottom.classList.add("fixed");
                isFixed = true;
            }
        } else {
            if (isFixed) {
                mainYearBottom.classList.remove("fixed");
                isFixed = false;
            }
        }

        let activeIndex = -1;

        sections.forEach((section, index) => {
            let sectionTop = section.offsetTop;
            let sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop) {
                yearItems[index]?.classList.add("active");
                activeIndex = index;
            } else {
                yearItems[index]?.classList.remove("active");
            }
        });

        // 진행 바 길이 조정
        // 진행 바 길이 조정
        if (activeIndex >= 0) {
            let lastActiveItem = yearItems[activeIndex];

            if (activeIndex === yearItems.length - 1) {
                // 마지막 항목일 경우 진행 바를 더 확장 (예: 기존 너비의 1.5배)
                let progressWidth = lastActiveItem.offsetLeft + lastActiveItem.offsetWidth * 1;

                // 최대 너비가 부모 요소(.main_year_bottom)의 전체 너비를 넘지 않도록 제한
                let maxWidth = mainYearBottom.offsetWidth;
                progressBar.style.width = Math.min(progressWidth, maxWidth) + "px";
            } else {
                // 일반적인 경우 진행 바의 길이 계산
                let progressWidth = lastActiveItem.offsetLeft + lastActiveItem.offsetWidth / 2;
                progressBar.style.width = progressWidth + "px";
            }
        } else {
            progressBar.style.width = "0px";
        }

    });
});


//history
document.addEventListener("DOMContentLoaded", function () {
    const texts = document.querySelectorAll(".timeline_text");

    function fadeInOnScroll() {
        texts.forEach((text) => {
            const rect = text.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                text.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll();
});

//img
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".History [class^='History_sec']").forEach(section => {
        gsap.fromTo(section,
            { scale: 0.8 }, // 초기 크기
            {
                scale: 1.2, // 확대
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1.5

                }
            }
        );
    });
});

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    let timelineTexts = document.querySelectorAll(".History .timeline_text");
    let historyText = document.querySelector(".History .History_text"); // 세로선 대상

    let activeIndex = -1; // 현재 활성화된 점의 인덱스

    timelineTexts.forEach((text, index) => {
        ScrollTrigger.create({
            trigger: text,
            start: "top 70%",
            end: "top 50%",
            toggleActions: "play none none reverse",
            onEnter: () => {
                activateTimeline(index);
            },
            onLeaveBack: () => {
                deactivateTimeline(index);
            }
        });
    });

    function activateTimeline(index) {
        timelineTexts.forEach((text, i) => {
            if (i <= index) {
                text.classList.add("active"); // 현재 점까지 활성화
            }
        });

        // 활성화된 점의 개수를 기반으로 세로선 색상 조정
        let percentage = ((index + 1) / timelineTexts.length) * 100;
        historyText.style.setProperty("--line-percentage", percentage + "%");
    }

    function deactivateTimeline(index) {
        timelineTexts.forEach((text, i) => {
            if (i > index) {
                text.classList.remove("active"); // 이전 점들 비활성화
            }
        });

        // 활성화된 점이 하나도 없을 때 원래대로
        let percentage = ((index + 1) / timelineTexts.length) * 100;
        historyText.style.setProperty("--line-percentage", percentage + "%");
    }
});




