/* ----------- *\
# S I D E B A R #
\* ----------- */
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

/* --------- *\
# H E A D E R #
\* --------- */
let lastScroll = window.scrollY;
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (lastScroll < this.window.scrollY)
    header.style.transform = "translateY(-100%)";
  if (lastScroll > this.window.scrollY)
    header.style.transform = "translateY(0%)";

  lastScroll = this.window.scrollY;
});

/* --------- *\
# S L I D E R #
\* --------- */
window.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    const slides = slider.querySelector(".slides");
    const slideItems = slider.querySelectorAll(".slide");
    const slideCount = slideItems.length;
    let currentIndex = 0;

    const enableArrows = slider.dataset.arrows === "true";
    const enableDots = slider.dataset.dots === "true";

    // Create navigation buttons if needed
    let prevBtn, nextBtn;
    if (enableArrows) {
      prevBtn = document.createElement("button");
      nextBtn = document.createElement("button");
      prevBtn.textContent = "‹";
      nextBtn.textContent = "›";
      prevBtn.className = "nav-button prev";
      nextBtn.className = "nav-button next";
      slider.appendChild(prevBtn);
      slider.appendChild(nextBtn);
    }

    // Create dots container if needed
    let dotsContainer;
    if (enableDots) {
      dotsContainer = document.createElement("div");
      dotsContainer.className = "dots";
      slider.appendChild(dotsContainer);
    }

    function goToSlide(index) {
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;
      slides.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
      updateDots();
    }

    if (enableDots) {
      dotsContainer = document.createElement("div");
      dotsContainer.className = "dots";
      slider.appendChild(dotsContainer);
    }

    function updateDots() {
      if (!enableDots || !dotsContainer) return;

      dotsContainer.innerHTML = "";
      for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    if (enableArrows) {
      prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
      nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
    }

    // Touch support
    let startX = 0;
    slides.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    slides.addEventListener("touchend", (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 50) goToSlide(currentIndex - 1);
      else if (diff < -50) goToSlide(currentIndex + 1);
    });

    // Mouse drag support
    let isDragging = false;
    let mouseStartX = 0;

    slides.addEventListener("mousedown", (e) => {
      isDragging = true;
      mouseStartX = e.clientX;
    });

    slides.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = e.clientX - mouseStartX;
      if (diff > 50) goToSlide(currentIndex - 1);
      else if (diff < -50) goToSlide(currentIndex + 1);
    });

    goToSlide(0);
  });
});

/* ----- *\
# F O R M #
\* ----- */
function openForm() {
  document.querySelector('.form-bg').classList.remove("close");
}

function closeForm(btn) {
  document.querySelector(".form-bg").classList.add("close");
}

document.querySelector(".form-bg").addEventListener("click", function (event) {
  // якщо клік був саме по фону, а не по формі
  if (event.target === this) {
    this.classList.add("close"); // ховаємо форму
  }
});

/* --------------- *\
# S E N D   F O R M #
\* --------------- */
function sendForm(btn) {
  const [name, phone, mssg] = btn.form
  console.log([name, phone, mssg]);
  if (name.value.length == 0) {
    name.classList.add('err')
    name.parentElement.classList.add("err");
  } else {
    name.classList.remove("err");
    name.parentElement.classList.remove("err");
  }
  
  if (phone.value.length != 10) {
    phone.classList.add("err");
    phone.parentElement.classList.add("err");
  } else {
    phone.classList.remove("err");
    phone.parentElement.classList.remove("err");
  };

  if (name.value.length == 0 || phone.value.length != 10) return

  fetch("http://localhost:3000/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      phone: phone.value,
      mssg: mssg.value,
    }),
  })
    .then((req) => {
      if (req.status == 200) {
        alert("Повідомлення успішно надіслано");
      } else {
        alert(`Error ${req.status}: Виникла помилка`);
      }
    })
    .catch((err) => alert(`Error: Виникла помилка`));
}