/*===== EXIBIR MENU =====*/
// Controla abertura/fechamento do menu mobile: alterna o ícone (menu <-> x),
// escurece o fundo, trava o scroll da página e fecha ao clicar fora ou Esc —
// evita o efeito "bugado" de menu sobrepondo conteúdo sem dar feedback claro.
const toggle = document.getElementById("nav-toggle");
const toggleIcon = document.getElementById("nav-toggle-icon");
const navMenu = document.getElementById("nav-menu");
const navOverlay = document.getElementById("nav-overlay");

function openMenu() {
  navMenu.classList.add("show");
  navOverlay.classList.add("show");
  document.body.classList.add("nav-open");
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", "Fechar menu");
  toggleIcon.classList.replace("bx-menu", "bx-x");
}

function closeMenu() {
  navMenu.classList.remove("show");
  navOverlay.classList.remove("show");
  document.body.classList.remove("nav-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
  toggleIcon.classList.replace("bx-x", "bx-menu");
}

function toggleMenu() {
  const isOpen = navMenu.classList.contains("show");
  isOpen ? closeMenu() : openMenu();
}

if (toggle && navMenu && navOverlay) {
  toggle.addEventListener("click", toggleMenu);

  // Acessibilidade: permite abrir/fechar com teclado (Enter/Espaço)
  toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Fecha ao clicar no fundo escurecido
  navOverlay.addEventListener("click", closeMenu);

  // Fecha ao pressionar Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("show")) {
      closeMenu();
    }
  });
}

/*==================== FECHAR MENU MOBILE AO CLICAR EM UM LINK ====================*/
const navLink = document.querySelectorAll(".nav__link");
navLink.forEach((n) => n.addEventListener("click", closeMenu));

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
