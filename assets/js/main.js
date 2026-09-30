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
  toggle.setAttribute("aria-label", translations["menu.close"][document.documentElement.lang]);
  toggleIcon.classList.replace("bx-menu", "bx-x");
}

function closeMenu() {
  navMenu.classList.remove("show");
  navOverlay.classList.remove("show");
  document.body.classList.remove("nav-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", translations["menu.open"][document.documentElement.lang]);
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

/*==================== EFEITO DE DIGITAÇÃO (CARGO) ====================*/
let roleText = "Desenvolvedor Full Stack";
const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 500;

const roleEl = document.querySelector(".home__title-role");

let roleInterval;
let roleTimeout;

function animateRole() {
  clearInterval(roleInterval);
  clearTimeout(roleTimeout);
  if (!roleEl) return;

  function typeRole() {
    let index = 0;
    roleInterval = setInterval(() => {
      roleEl.textContent = roleText.slice(0, ++index);
      if (index === roleText.length) {
        clearInterval(roleInterval);
        roleTimeout = setTimeout(deleteRole, PAUSE_AFTER_TYPE);
      }
    }, TYPE_SPEED);
  }

  function deleteRole() {
    let index = roleText.length;
    roleInterval = setInterval(() => {
      roleEl.textContent = roleText.slice(0, --index);
      if (index === 0) {
        clearInterval(roleInterval);
        roleTimeout = setTimeout(typeRole, PAUSE_AFTER_DELETE);
      }
    }, DELETE_SPEED);
  }

  roleEl.textContent = "";
  typeRole();
}

animateRole();

/*==================== TEMA E IDIOMA ====================*/
const translations = {
  "nav.home": { "pt-BR": "Home", en: "Home" },
  "nav.about": { "pt-BR": "Sobre", en: "About" },
  "nav.experience": { "pt-BR": "Experiência", en: "Experience" },
  "nav.skills": { "pt-BR": "Skills", en: "Skills" },
  "nav.work": { "pt-BR": "Projetos", en: "Projects" },
  "nav.contact": { "pt-BR": "Contato", en: "Contact" },
  "home.greeting": { "pt-BR": "Olá,", en: "Hello," },
  "home.intro": { "pt-BR": "sou ", en: "I'm " },
  "about.subtitle": { "pt-BR": "Eu sou Lucas", en: "I'm Lucas" },
  "about.text": {
    "pt-BR": "Tecnólogo em Sistemas para Internet pelo IFRN, com foco em desenvolvimento backend e fullstack. Desenvolvo APIs REST com Django e Django REST Framework, banco de dados relacional com PostgreSQL e deploys em produção na Railway. O MacNF - sistema de gestão de notas fiscais que construí para a empresa onde trabalho - está rodando com usuários reais e sendo formalizado como serviço pago. Sou de Canguaretama, interior do RN, e resolvo problemas reais com código.",
    en: "I hold a degree in Internet Systems from IFRN, focusing on backend and full-stack development. I build REST APIs with Django and Django REST Framework, relational databases with PostgreSQL, and production deployments on Railway. MacNF, an invoice management system I built for my employer, is running with real users and is being formalized as a paid service. I'm from Canguaretama, in the countryside of Rio Grande do Norte, Brazil, and I solve real problems with code.",
  },
  "experience.backendRole": { "pt-BR": "Desenvolvedor Full Stack (Freelancer)", en: "Full-Stack Developer (Freelance)" },
  "experience.company": { "pt-BR": "Mac Madeiras · Rio Grande do Norte", en: "Mac Madeiras · Rio Grande do Norte" },
  "experience.backendDescription": {
    "pt-BR": "Desenvolvi o MacNF, sistema de gestão de notas fiscais para uma rede de 3 lojas de materiais de construção, em produção com usuários reais e em processo de formalização como serviço pago.",
    en: "Built MacNF, an invoice management system for a chain of three construction supply stores. It is live with real users and being formalized as a paid service.",
  },
  "experience.item1": { "pt-BR": "API REST com Django REST Framework e autenticação por token", en: "REST API with Django REST Framework and token authentication" },
  "experience.item2": { "pt-BR": "Controle de acesso por perfis (estoquista, fiscal, compras)", en: "Role-based access control (inventory, finance, purchasing)" },
  "experience.item3": { "pt-BR": "Armazenamento seguro de PDFs no Cloudflare R2 com URLs assinadas", en: "Secure PDF storage on Cloudflare R2 with signed URLs" },
  "experience.item4": { "pt-BR": "Deploy na Railway com PostgreSQL em produção", en: "Railway deployment with PostgreSQL in production" },
  "experience.item5": { "pt-BR": "Diagnóstico e correção de falhas em produção, análise de logs e suporte técnico aos usuários", en: "Production incident diagnosis and fixes, log analysis, and user support" },
  "experience.webRole": { "pt-BR": "Desenvolvimento de Software e Suporte Técnico", en: "Software Development and Technical Support" },
  "experience.freelancer": { "pt-BR": "Freelancer · Rio Grande do Norte", en: "Freelance · Rio Grande do Norte" },
  "experience.webDescription": { "pt-BR": "Desenvolvimento de sistemas web e manutenção de computadores, prestando suporte técnico, instalação de softwares e diagnóstico de problemas.", en: "Web system development and computer maintenance, including technical support, software installation, and troubleshooting." },
  "skills.subtitle": { "pt-BR": "Habilidades Técnicas", en: "Technical Skills" },
  "skills.intro": { "pt-BR": "Atuação fullstack: do modelo de dados e das APIs REST em Django ao frontend que consome essas APIs, passando por apps mobile e testes automatizados.", en: "Full-stack work: from data models and Django REST APIs to the frontend that consumes them, plus mobile apps and automated testing." },
  "skills.python": { "pt-BR": "APIs REST, autenticação por token/JWT, ORM e migrations, deploy em produção", en: "REST APIs, token/JWT authentication, ORM and migrations, production deployments" },
  "skills.frontend": { "pt-BR": "Interfaces responsivas integradas ao backend, do layout ao consumo de API REST", en: "Responsive interfaces integrated with backends, from layout through REST API consumption" },
  "skills.database": { "pt-BR": "Modelagem relacional, queries e migrations aplicadas em sistema real em produção", en: "Relational modeling, queries, and migrations used in a real production system" },
  "skills.mobile": { "pt-BR": "Apps mobile e testes automatizados com Jest e React Native Testing Library", en: "Mobile apps and automated tests with Jest and React Native Testing Library" },
  "skills.git": { "pt-BR": "Versionamento e fluxo de branches em projetos profissionais e acadêmicos", en: "Version control and branch workflows across professional and academic projects" },
  "work.production": { "pt-BR": "Em produção", en: "In production" },
  "work.macnfAlt": { "pt-BR": "MacNF - Sistema de gestão de notas fiscais em produção", en: "MacNF - Production invoice management system" },
  "work.macnfCaption": { "pt-BR": "Usado por usuários reais em múltiplas lojas · virando serviço pago", en: "Used by real customers across multiple stores · becoming a paid service" },
  "work.todoAlt": { "pt-BR": "To-Do List - Gerenciamento de tarefas com Django", en: "To-Do List - Task management with Django" },
  "work.todoCaption": { "pt-BR": "CRUD completo de tarefas com autenticação por sessão, filtros e gerenciamento de perfil de usuário", en: "Complete task management with session authentication, filters, and user profile management" },
  "work.englistAlt": { "pt-BR": "EngList - Gerenciamento de obras com Django", en: "EngList - Construction project management with Django" },
  "work.englistCaption": { "pt-BR": "Board Kanban para gestão de obras, com upload de imagens e API REST paralela à interface web", en: "Kanban board for construction management, with image uploads and a REST API alongside the web interface" },
  "work.atuarAlt": { "pt-BR": "Atuar Engenharia - Landing page responsiva", en: "Atuar Engenharia - Responsive landing page" },
  "work.archived": { "pt-BR": "Arquivado", en: "Archived" },
  "work.atuarCaption": { "pt-BR": "Landing page institucional freelance com integração ao WhatsApp e feed do Instagram", en: "Freelance company landing page integrated with WhatsApp and the Instagram feed" },
  "work.award": { "pt-BR": "TCC · nota máxima", en: "Thesis · top grade" },
  "work.smartAlt": { "pt-BR": "Smart Reservoir - App mobile React Native", en: "Smart Reservoir - React Native mobile app" },
  "work.smartCaption": { "pt-BR": "61 casos de teste em 14 suítes automatizadas", en: "61 test cases across 14 automated suites" },
  "work.soon": { "pt-BR": "Em breve", en: "Coming soon" },
  "contact.name": { "pt-BR": "Nome", en: "Name" },
  "contact.email": { "pt-BR": "E-mail", en: "Email" },
  "contact.emailLabel": { "pt-BR": "Enviar e-mail", en: "Send email" },
  "contact.message": { "pt-BR": "Mensagem", en: "Message" },
  "contact.send": { "pt-BR": "Enviar", en: "Send" },
  "experience.currentPeriod": { "pt-BR": "2023 - atual", en: "2023 - present" },
  "language.label": { "pt-BR": "Idioma", en: "Language" },
  "footer.copyright": { "pt-BR": "© 2026 Lucas Emanoel da Silva Freitas. Todos os direitos reservados.", en: "© 2026 Lucas Emanoel da Silva Freitas. All rights reserved." },
  "theme.light": { "pt-BR": "Mudar para tema claro", en: "Switch to light theme" },
  "theme.dark": { "pt-BR": "Mudar para tema escuro", en: "Switch to dark theme" },
  "menu.open": { "pt-BR": "Abrir menu", en: "Open menu" },
  "menu.close": { "pt-BR": "Fechar menu", en: "Close menu" },
  role: { "pt-BR": "Desenvolvedor Full Stack", en: "Full-stack Developer" },
};

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-toggle-icon");
const languageButtons = document.querySelectorAll("[data-language]");

function readPreference(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function writePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The selected setting remains active until the page is closed.
  }
}

function applyTheme(theme) {
  const isDark = theme !== "light";
  root.dataset.theme = isDark ? "dark" : "light";
  const label = translations[isDark ? "theme.light" : "theme.dark"][root.lang];
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
  themeIcon.className = `bx ${isDark ? "bx-sun" : "bx-moon"}`;
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#080808" : "#f7f8f5";
}

function applyLanguage(language) {
  const selectedLanguage = language === "en" ? "en" : "pt-BR";
  root.lang = selectedLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translation = translations[element.dataset.i18n];
    if (translation) element.textContent = translation[selectedLanguage];
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const translation = translations[element.dataset.i18nAlt];
    if (translation) element.alt = translation[selectedLanguage];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const translation = translations[element.dataset.i18nPlaceholder];
    if (translation) element.placeholder = translation[selectedLanguage];
  });
  document.querySelectorAll("[data-i18n-value]").forEach((element) => {
    const translation = translations[element.dataset.i18nValue];
    if (translation) element.value = translation[selectedLanguage];
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const translation = translations[element.dataset.i18nAriaLabel];
    if (translation) element.setAttribute("aria-label", translation[selectedLanguage]);
  });
  document.querySelector(".language-switch").setAttribute(
    "aria-label",
    translations["language.label"][selectedLanguage],
  );
  languageButtons.forEach((button) => {
    const isSelected = button.dataset.language === selectedLanguage;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  toggle.setAttribute(
    "aria-label",
    translations[navMenu.classList.contains("show") ? "menu.close" : "menu.open"][selectedLanguage],
  );
  roleText = translations.role[selectedLanguage];
  animateRole();
  applyTheme(root.dataset.theme || "dark");
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
  writePreference("portfolio-theme", nextTheme);
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.language);
    writePreference("portfolio-language", button.dataset.language);
  });
});

applyLanguage(readPreference("portfolio-language", "pt-BR"));
applyTheme(readPreference("portfolio-theme", "dark"));

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
