const projects = [
  {
    title: "Launaráður",
    description:
      "Innovation project með fókus á skýra upplifun, virði fyrir notendur og skapandi framsetningu.",
    tags: ["Innovation", "Strategy", "Product"],
    link: "#"
  },
  {
    title: "Ráður",
    description:
      "Ráðgjöf sem sameinar greiningu, framkvæmd og mannlega nálgun til að ná raunverulegum árangri.",
    tags: ["Consulting", "Operations", "People"],
    link: "#"
  },
  {
    title: "Orkan",
    description:
      "Data innovation og digital change verkefni sem styðja við skýrari ákvörðunartöku og þróun.",
    tags: ["Data", "Digital Change", "Innovation"],
    link: "#"
  },
  {
    title: "Samrými",
    description:
      "Co-working space hugmynd sem byggir á samfélagi, samstarfi og rými til að skapa.",
    tags: ["Community", "Co-working", "Experience"],
    link: "#"
  }
];

const projectsList = document.getElementById("projects-list");
const yearSpan = document.getElementById("year");
const siteHeader = document.getElementById("site-header");
let lastScrollY = window.scrollY;

yearSpan.textContent = new Date().getFullYear();

projects.forEach((project) => {
  const article = document.createElement("article");
  article.className = "project-card";

  const tags = project.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  article.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-tags">${tags}</div>
    <p><a href="${project.link}">Skoða nánar</a></p>
  `;

  projectsList.appendChild(article);
});

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY <= 16) {
    siteHeader.classList.remove("header-hidden");
  } else if (currentScrollY > lastScrollY) {
    siteHeader.classList.add("header-hidden");
  } else {
    siteHeader.classList.remove("header-hidden");
  }

  lastScrollY = currentScrollY;
});
