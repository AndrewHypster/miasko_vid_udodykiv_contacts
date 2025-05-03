function sidebarOpen() {
  const body = document.body;
  const sidebar = document.querySelector(".sidebar");

  body.style.overflow = "hidden";
  sidebar.style.left = "0";
}

function sidebarClose() {
  const body = document.body;
  const sidebar = document.querySelector(".sidebar");

  body.style.overflow = "visible";
  sidebar.style.left = "100%";
}

let lastScroll = window.scrollY
window.addEventListener('scroll', function () {
  const header = document.querySelector('header')

  if (lastScroll < this.window.scrollY) header.style.transform = "translateY(-100%)"
  if (lastScroll > this.window.scrollY) header.style.transform = "translateY(0%)"

  lastScroll = this.window.scrollY
});

/* --------- *\
# S L I D E R #
\* --------- */
window.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = document.querySelector(".slides");
  const slideCount = document.querySelectorAll(".slide").length;
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dotsContainer = document.getElementById("dots");

  let currentIndex = 0;
  let startX = 0;

  function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    slides.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    updateDots();
  }

  function updateDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement("span");
      dot.classList.add('dot')
      dot.style.background = "transparrent";
      if (i === currentIndex) dot.style.background = 'var(--main)';
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  prev.addEventListener("click", () => goToSlide(currentIndex - 1));
  next.addEventListener("click", () => goToSlide(currentIndex + 1));

  // Swipe support
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    let diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) goToSlide(currentIndex - 1);
    else if (diff < -50) goToSlide(currentIndex + 1);
  });

  // Mouse drag support
  let isDragging = false;
  let mouseStartX = 0;

  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    mouseStartX = e.clientX;
  });

  slider.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    let diff = e.clientX - mouseStartX;
    if (diff > 50) goToSlide(currentIndex - 1);
    else if (diff < -50) goToSlide(currentIndex + 1);
  });

  goToSlide(0);
});
