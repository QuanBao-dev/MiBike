const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
window.addEventListener("resize", () => {
  displayHiddenNavBarMobile();
});
window.addEventListener("scroll", () => {
  handlingNavBarBackgroundAnimation();
  $$(".heading-container").forEach((element) => {
    headingViewportAnimation(element, element.children[0], element.children[1]);
  });

  $$(".container-image-list .container-image-item").forEach((element) => {
    elementViewportAnimationFadeIn(element, 430);
  })
  elementViewportAnimationFadeIn($(".container-card-bicycle"), 200);
  elementViewportAnimationFadeIn($(".section-4 .heading-3"), 50);
  elementViewportAnimationFadeIn($(".section-4 .heading-3"), 200);
  elementViewportAnimationFadeIn($(".section-4 .button-bold"), 100);
  elementViewportAnimationFadeIn($(".section-4 img"), 100);

  $$(".container-small-card-bicycle").forEach((element) => {
    elementViewportAnimationFadeIn(element, 200);
  });

  $$(".card-bike-news-item").forEach((element) => {
    elementViewportAnimationFadeIn(element, 240);
  });

  headingViewportAnimationSlide($(".section-4 .heading-1"), 200);
  headingViewportAnimationSlide($(".section-4 .heading-2"), 200);
});

let pageActiveCarousel = 1;
window.addEventListener("load", () => {
  displayHiddenNavBarMobile();
  updateNewPageCarousel();
  let pageItems = $$(".page-item");
  let pageArrows = $$(".page-arrow");
  pageArrows.forEach((pageArrow) => {
    pageArrow.addEventListener("click", (e) => {
      if (e.target.className.includes("left")) {
        if (pageActiveCarousel >= 1) pageActiveCarousel -= 1;
        if (pageActiveCarousel < 1) pageActiveCarousel = pageItems.length;
        updateNewPageCarousel();
        return;
      }
      if (pageActiveCarousel <= pageItems.length) pageActiveCarousel += 1;
      if (pageActiveCarousel > pageItems.length) pageActiveCarousel = 1;
      updateNewPageCarousel();
    });
  });
  pageItems.forEach((pageItem, index) => {
    pageItem.addEventListener("click", (e) => {
      if (!e.target.className.includes(" active")) {
        pageActiveCarousel = index + 1;
        updateNewPageCarousel();
      }
    });
  });

  $(".nav-bar-container .menu").addEventListener("click", () => {
    if (!$(".nav-bar-container .menu").className.includes("active")) {
      $(".nav-bar-container .menu").className = "menu active";
      document.body.style.overflow = "hidden"
      $(".side-bar-nav-container").className = "side-bar-nav-container active";
      return;
    }
    $(".nav-bar-container .menu").className = "menu";
    document.body.style.overflow = "auto"
    $(".side-bar-nav-container").className = "side-bar-nav-container";
  });

  $(".side-bar-nav-wrapper .close-button").addEventListener("click",() => {
    $(".nav-bar-container .menu").className = "menu";
    document.body.style.overflow = "auto"
    $(".side-bar-nav-container").className = "side-bar-nav-container";
  })
});

function headingViewportAnimationSlide(element, threshold) {
  if (isElementInViewport(element, threshold)) {
    element.style.transition = "2s";
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
  }
}
function elementViewportAnimationFadeIn(element, threshold) {
  if (isElementInViewport(element, threshold)) {
    element.style.transform = "translateY(0)";
    element.style.opacity = "1";
    element.style.transition = "1.5s";
    element.style.top = "66%";
  }
}

function headingViewportAnimation(section, heading1, heading2) {
  if (isElementInViewport(section, 70)) {
    heading1.style.transform = "translateX(-50%)";
    heading1.style.transition = "1s";
    setTimeout(() => {
      heading2.style.transition = "1s";
      heading2.style.transform = "translateX(0)";
    }, 500);
  }
}

function handlingNavBarBackgroundAnimation() {
  const navBarContainer = $(".nav-bar-container");
  if (window.scrollY === 0) {
    navBarContainer.style.backgroundColor = "transparent";
    navBarContainer.style.paddingTop = "40px";
  } else {
    navBarContainer.style.backgroundColor = "#3a3a3a";
    navBarContainer.style.paddingTop = "0";
  }
}

function updateNewPageCarousel() {
  let carouselSlideItems = $$(".carousel-slide-item");
  let pageItems = $$(".page-item");
  pageItems.forEach((pageItem, index) => {
    if (index === pageActiveCarousel - 1) {
      if (!pageItem.className.includes(" active"))
        pageItem.className += " active";
      return;
    }
    pageItem.className = pageItem.className.replace(" active", "");
  });
  carouselSlideItems.forEach((carouselSlideItem, index) => {
    if (
      !carouselSlideItem.className.includes(" active") &&
      index === pageActiveCarousel - 1
    ) {
      carouselSlideItem.className += " active";
      return;
    }
    carouselSlideItem.className = carouselSlideItem.className.replace(
      " active",
      ""
    );
  });
}

function isElementInViewport(element, threshold) {
  return element.getBoundingClientRect().y - window.innerHeight + threshold < 0;
}

function displayHiddenNavBarMobile() {
  if (window.innerWidth < 1000) {
    $(".nav-bar-container").className = "nav-bar-container mobile";
    return;
  }
  $(".nav-bar-container").className = "nav-bar-container";
}
