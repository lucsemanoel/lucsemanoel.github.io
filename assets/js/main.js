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
  toggle.setAttribute(
    "aria-label",
    translations["menu.close"][document.documentElement.lang],
  );
  toggleIcon.classList.replace("bx-menu", "bx-x");
}

function closeMenu() {
  navMenu.classList.remove("show");
  navOverlay.classList.remove("show");
  document.body.classList.remove("nav-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute(
    "aria-label",
    translations["menu.open"][document.documentElement.lang],
  );
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
  "home.resume": { "pt-BR": "Currículo", en: "Resume" },
  "home.greeting": { "pt-BR": "Olá,", en: "Hello," },
  "home.intro": { "pt-BR": "sou ", en: "I'm " },
  "about.subtitle": { "pt-BR": "Eu sou Lucas", en: "I'm Lucas" },
  "about.text": {
    "pt-BR":
      "Tecnólogo em Sistemas para Internet pelo IFRN (2026), com foco em Python, Django e Django REST Framework. Atuo da modelagem de dados e das APIs REST até a interface, incluindo autenticação, controle de acesso por perfis e deploy em produção. O MacNF, sistema de gestão de notas fiscais que construí para a Mac Madeiras, roda nas 3 lojas com 11+ usuários e 250+ notas por mês. Também desenvolvo apps com React Native e planejo testes automatizados: meu TCC, nota 100, validou um app IoT com 61 casos de teste. Sou de Canguaretama, interior do RN, e resolvo problemas reais com código.",
    en: "I hold a degree in Internet Systems from IFRN (2026), focused on Python, Django and Django REST Framework. I work from data modeling and REST APIs through to the interface, including authentication, role-based access control and production deployment. MacNF, the invoice management system I built for Mac Madeiras, runs in all 3 stores with 11+ users and 250+ invoices per month. I also build React Native apps and plan automated tests: my capstone project, graded 100, validated an IoT app with 61 test cases. I'm from Canguaretama, in the countryside of Rio Grande do Norte, Brazil, and I solve real problems with code.",
  },
  "experience.backendRole": {
    "pt-BR": "Desenvolvedor Full Stack (Freelancer)",
    en: "Full-Stack Developer (Freelance)",
  },
  "experience.company": {
    "pt-BR": "Mac Madeiras · Rio Grande do Norte",
    en: "Mac Madeiras · Rio Grande do Norte",
  },
  "experience.backendDescription": {
    "pt-BR":
      "Substituí o controle de notas fiscais via WhatsApp por uma plataforma única, o MacNF, em produção nas 3 lojas, com 11+ usuários e 250+ notas por mês.",
    en: "Replaced invoice tracking over WhatsApp with a single platform, MacNF, live in all 3 stores with 11+ users and 250+ invoices per month.",
  },
  "experience.item1": {
    "pt-BR": "API REST do zero com Django REST Framework e autenticação JWT",
    en: "REST API built from scratch with Django REST Framework and JWT authentication",
  },
  "experience.item2": {
    "pt-BR":
      "Controle de acesso por 3 perfis (estoquista, fiscal, compras) e histórico de auditoria",
    en: "Role-based access control with 3 roles (inventory, finance, purchasing) and an audit history",
  },
  "experience.item6": {
    "pt-BR":
      "Validação automática de CNPJ e da chave de acesso da NF-e, incluindo o dígito verificador, que antes era feita à mão",
    en: "Automatic validation of the CNPJ and the NF-e access key, including the check digit, previously done by hand",
  },
  "experience.item3": {
    "pt-BR": "Armazenamento seguro de PDFs no Cloudflare R2 com URLs assinadas",
    en: "Secure PDF storage on Cloudflare R2 with signed URLs",
  },
  "experience.item4": {
    "pt-BR": "Deploy na Railway com PostgreSQL em produção",
    en: "Railway deployment with PostgreSQL in production",
  },
  "experience.item5": {
    "pt-BR":
      "Monitoramento e manutenção contínuos em produção: análise de logs, correção de falhas e suporte aos usuários",
    en: "Ongoing production monitoring and maintenance: log analysis, bug fixes and user support",
  },
  "experience.macPeriod": {
    "pt-BR": "jun. 2026 - atual",
    en: "Jun 2026 - present",
  },
  "experience.ifrnRole": {
    "pt-BR": "Desenvolvedor Backend",
    en: "Backend Developer",
  },
  "experience.ifrnPeriod": {
    "pt-BR": "jul. 2025 - jan. 2026",
    en: "Jul 2025 - Jan 2026",
  },
  "experience.ifrnCompany": {
    "pt-BR": "IFRN, Campus Canguaretama",
    en: "IFRN, Canguaretama Campus",
  },
  "experience.ifrnDescription": {
    "pt-BR":
      "Backend do Portfólio On-line e do Mural Web, em produção, centralizando a divulgação de projetos e oportunidades do campus.",
    en: "Backend for the Online Portfolio and Web Bulletin Board, in production, centralizing the campus projects and opportunities.",
  },
  "experience.ifrnItem1": {
    "pt-BR": "APIs REST em Django com CRUD completo e banco relacional",
    en: "REST APIs in Django with full CRUD and a relational database",
  },
  "experience.ifrnItem2": {
    "pt-BR":
      "Login integrado ao SUAP (SSO institucional), sem cadastro separado, com permissões por papéis",
    en: "Login integrated with SUAP (institutional SSO), no separate sign-up, with role-based permissions",
  },
  "skills.subtitle": {
    "pt-BR": "Habilidades Técnicas",
    en: "Technical Skills",
  },
  "skills.intro": {
    "pt-BR":
      "Atuação fullstack: do modelo de dados e das APIs REST em Django ao frontend que consome essas APIs, passando por apps mobile, IoT e testes automatizados.",
    en: "Full-stack work: from data models and Django REST APIs to the frontend that consumes them, plus mobile apps, IoT and automated testing.",
  },
  "skills.python": {
    "pt-BR":
      "APIs REST, autenticação por token/JWT, ORM e migrations, deploy em produção",
    en: "REST APIs, token/JWT authentication, ORM and migrations, production deployments",
  },
  "skills.frontend": {
    "pt-BR":
      "Interfaces responsivas integradas ao backend, do layout ao consumo de API REST",
    en: "Responsive interfaces integrated with backends, from layout through REST API consumption",
  },
  "skills.database": {
    "pt-BR":
      "Modelagem relacional, queries e migrations aplicadas em sistema real em produção",
    en: "Relational modeling, queries, and migrations used in a real production system",
  },
  "skills.mobile": {
    "pt-BR":
      "Apps mobile e testes automatizados com Jest e React Native Testing Library",
    en: "Mobile apps and automated tests with Jest and React Native Testing Library",
  },
  "skills.git": {
    "pt-BR":
      "Versionamento e fluxo de branches em projetos profissionais e acadêmicos",
    en: "Version control and branch workflows across professional and academic projects",
  },
  "skills.testing": {
    "pt-BR":
      "Testes de unidade, integração e sistema; 61 casos de teste no TCC, nota 100",
    en: "Unit, integration and system tests; 61 test cases in the capstone project, graded 100",
  },
  "skills.iot": {
    "pt-BR":
      "Comunicação entre dispositivos e app mobile de monitoramento hídrico",
    en: "Device-to-app communication for a water monitoring mobile app",
  },
  "skills.security": {
    "pt-BR": "Criptografia, hashing e exercícios práticos de ataque e defesa",
    en: "Cryptography, hashing and hands-on attack and defense exercises",
  },
  "skills.tools": {
    "pt-BR":
      "Terminal e shell script, protótipos de interface e organização de tarefas com Scrum e Kanban",
    en: "Terminal and shell scripting, interface prototypes and task management with Scrum and Kanban",
  },
  "skills.learning": {
    "pt-BR": "Em aprendizado: contêineres, nuvem, Terraform e GitHub Actions",
    en: "Learning: containers, cloud, Terraform and GitHub Actions",
  },
  "work.production": { "pt-BR": "Em produção", en: "In production" },
  "work.macnfAlt": {
    "pt-BR": "MacNF - Sistema de gestão de notas fiscais em produção",
    en: "MacNF - Production invoice management system",
  },
  "work.macnfCaption": {
    "pt-BR": "Em produção nas 3 lojas · 11+ usuários · 250+ notas por mês",
    en: "Live in all 3 stores · 11+ users · 250+ invoices per month",
  },
  "work.todoAlt": {
    "pt-BR": "To-Do List - Gerenciamento de tarefas com Django",
    en: "To-Do List - Task management with Django",
  },
  "work.todoCaption": {
    "pt-BR":
      "CRUD completo de tarefas com autenticação por sessão, filtros e gerenciamento de perfil de usuário",
    en: "Complete task management with session authentication, filters, and user profile management",
  },
  "work.englistAlt": {
    "pt-BR": "EngList - Gerenciamento de obras com Django",
    en: "EngList - Construction project management with Django",
  },
  "work.englistCaption": {
    "pt-BR":
      "Board Kanban para gestão de obras, com upload de imagens e API REST paralela à interface web",
    en: "Kanban board for construction management, with image uploads and a REST API alongside the web interface",
  },
  "work.atuarAlt": {
    "pt-BR": "Atuar Engenharia - Landing page responsiva",
    en: "Atuar Engenharia - Responsive landing page",
  },
  "work.archived": { "pt-BR": "Arquivado", en: "Archived" },
  "work.atuarCaption": {
    "pt-BR":
      "Landing page institucional freelance com integração ao WhatsApp e feed do Instagram",
    en: "Freelance company landing page integrated with WhatsApp and the Instagram feed",
  },
  "work.award": { "pt-BR": "TCC · nota máxima", en: "Thesis · top grade" },
  "work.smartAlt": {
    "pt-BR": "Smart Reservoir - App mobile React Native",
    en: "Smart Reservoir - React Native mobile app",
  },
  "work.smartCaption": {
    "pt-BR":
      "App de monitoramento hídrico via IoT · 61 casos de teste em 14 suítes (unidade, integração e sistema)",
    en: "Water monitoring app via IoT · 61 test cases in 14 suites (unit, integration and system)",
  },
  "work.soon": { "pt-BR": "Em breve", en: "Coming soon" },
  "contact.name": { "pt-BR": "Nome", en: "Name" },
  "contact.email": { "pt-BR": "E-mail", en: "Email" },
  "contact.emailLabel": { "pt-BR": "Enviar e-mail", en: "Send email" },
  "contact.message": { "pt-BR": "Mensagem", en: "Message" },
  "contact.send": { "pt-BR": "Enviar", en: "Send" },
  "contact.sending": { "pt-BR": "Enviando...", en: "Sending..." },
  "contact.success": {
    "pt-BR": "Mensagem enviada! Respondo assim que possível.",
    en: "Message sent! I'll reply as soon as I can.",
  },
  "contact.error": {
    "pt-BR":
      "Não foi possível enviar agora. Tente de novo ou me chame por e-mail ou WhatsApp.",
    en: "Couldn't send right now. Please try again or reach me by email or WhatsApp.",
  },
  "contact.invalid": {
    "pt-BR": "Preencha nome, e-mail válido e mensagem.",
    en: "Please fill in your name, a valid email and a message.",
  },
  "contact.mailto": {
    "pt-BR": "Abrindo seu aplicativo de e-mail com a mensagem pronta.",
    en: "Opening your email app with the message ready.",
  },
  "language.label": { "pt-BR": "Idioma", en: "Language" },
  "footer.copyright": {
    "pt-BR":
      "© 2026 Lucas Emanoel da Silva Freitas. Todos os direitos reservados.",
    en: "© 2026 Lucas Emanoel da Silva Freitas. All rights reserved.",
  },
  "theme.light": {
    "pt-BR": "Mudar para tema claro",
    en: "Switch to light theme",
  },
  "theme.dark": {
    "pt-BR": "Mudar para tema escuro",
    en: "Switch to dark theme",
  },
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
  document.querySelector('meta[name="theme-color"]').content = isDark
    ? "#080808"
    : "#f7f8f5";
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
    if (translation)
      element.setAttribute("aria-label", translation[selectedLanguage]);
  });
  document
    .querySelector(".language-switch")
    .setAttribute(
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
    translations[
      navMenu.classList.contains("show") ? "menu.close" : "menu.open"
    ][selectedLanguage],
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

/*==================== FORMULÁRIO DE CONTATO ====================*/
// Envio via Formspree (https://formspree.io): crie um formulário lá, copie o
// endereço "https://formspree.io/f/xxxxxxxx" e cole abaixo. Enquanto o ID não
// for trocado, o formulário abre o app de e-mail do visitante com a mensagem
// pronta (mailto), então nunca fica "morto".
const CONTACT_ENDPOINT = "https://formspree.io/f/SEU_ID";
const CONTACT_EMAIL = "lucasedasilva30@gmail.com";

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

function setContactStatus(key, state) {
  if (!contactStatus) return;
  if (!key) {
    contactStatus.removeAttribute("data-i18n");
    contactStatus.removeAttribute("data-state");
    contactStatus.textContent = "";
    return;
  }
  // data-i18n faz a mensagem acompanhar a troca de idioma
  contactStatus.dataset.i18n = key;
  contactStatus.dataset.state = state;
  contactStatus.textContent = translations[key][root.lang];
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    if (data.get("_gotcha")) return; // robô preencheu o campo escondido

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !message) {
      setContactStatus("contact.invalid", "error");
      return;
    }

    // Sem endpoint configurado: abre o app de e-mail com tudo preenchido
    if (CONTACT_ENDPOINT.includes("SEU_ID")) {
      const subject = encodeURIComponent(`Contato pelo portfólio - ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setContactStatus("contact.mailto", "info");
      return;
    }

    const submitButton = contactForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    setContactStatus("contact.sending", "info");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      contactForm.reset();
      setContactStatus("contact.success", "success");
    } catch {
      setContactStatus("contact.error", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
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
