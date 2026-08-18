/*===== EXIBIR MENU =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== FECHAR MENU MOBILE AO CLICAR EM UM LINK ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== LINK ATIVO CONFORME A SEÇÃO VISÍVEL ====================*/
// Usa IntersectionObserver em vez de um listener de "scroll" — evita recalcular
// a cada pixel rolado e só reage quando uma seção realmente entra/sai da tela.
const sections = document.querySelectorAll("section[id]");

const observerOptions = {
  rootMargin: "-58px 0px -60% 0px", // compensa a altura do header fixo
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sectionId = entry.target.getAttribute("id");
    const link = document.querySelector(`.nav__menu a[href*="#${sectionId}"]`);

    if (!link) return; // evita erro caso não exista link correspondente

    if (entry.isIntersecting) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

/*==================== ROTAÇÃO DO CARGO (ROLE) ====================*/
const roles = ["Dev Backend Jr", "Dev Fullstack Jr"];
let roleIndex = 0;
const roleEl = document.querySelector(".home__title-role");

if (roleEl) {
  setInterval(() => {
    roleEl.classList.add("fade");
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleEl.textContent = roles[roleIndex];
      roleEl.classList.remove("fade");
    }, 350);
  }, 3000);
}

/*==================== FALLBACK PARA IMAGEM QUEBRADA ====================*/
// Se alguma miniatura de projeto falhar ao carregar (arquivo ausente/renomeado),
// esconde a imagem em vez de mostrar o ícone quebrado + alt text sobrepostos.
document.querySelectorAll(".work__img img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.visibility = "hidden";
  });
});

/*==================== CARROSSEL AO PASSAR O MOUSE (HOVER) ====================*/
document.querySelectorAll(".work__img[data-images]").forEach((card) => {
  const images = card.dataset.images.split(",");
  const img = card.querySelector("img");
  let index = 0;
  let interval = null;

  images.forEach((src) => {
    new Image().src = src;
  });

  // Garante que a imagem exibida ao carregar a página seja sempre uma das
  // imagens reais do data-images, em vez de depender do src fixo no HTML
  // (que pode ficar desatualizado ou apontar pra um arquivo inexistente).
  if (images[0]) {
    img.src = images[0];
  }

  card.addEventListener("mouseenter", () => {
    index = 1;
    interval = setInterval(() => {
      img.style.opacity = "0";
      setTimeout(() => {
        img.src = images[index];
        img.style.opacity = "1";
        index = (index + 1) % images.length;
      }, 180);
    }, 900);
  });

  card.addEventListener("mouseleave", () => {
    clearInterval(interval);
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = images[0];
      img.style.opacity = "1";
    }, 180);
  });
});

/*===== ANIMAÇÃO DE ENTRADA (SCROLL REVEAL) =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });
