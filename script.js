/* ============================================
   BÍÐUM BETUR — JAVASCRIPT
   ============================================ */

// ---- Resources Data ----
const resources = [
  {
    type: "book",
    typeLabel: "Bók",
    title: "The Anxious Generation",
    author: "Jonathan Haidt",
    description:
      "Hvernig endurskipulagning æskuárinnar á snjallsímum og samfélagsmiðlum veldur farsótt geðsjúkdóma meðal ungmennis.",
    link: "https://www.anxiousgeneration.com/"
  },
  {
    type: "book",
    typeLabel: "Bók",
    title: "How to Break Up with Your Phone",
    author: "Catherine Price",
    description:
      "Hagnýt ráð til að taka aflið til baka frá snjallsímanum og lifa meðvitaðra með tækni.",
    link: "https://www.catherineprice.com/books"
  },
  {
    type: "research",
    typeLabel: "Rannsókn",
    title: "Sapien Labs — Age of First Smartphone",
    author: "Sapien Labs",
    description:
      "Rannsókn sem sýnir beina fylgni milli aldurs við fyrsta snjallsíma og geðheilsu ungmenna.",
    link: "https://sapienlabs.org/age-of-first-smartphone-and-mental-wellbeing-outcomes/"
  },
  {
    type: "org",
    typeLabel: "Samtök",
    title: "Wait Until 8th",
    author: "Bandaríkin",
    description:
      "Foreldrahreyfing í Bandaríkjunum sem hvetur foreldra til að bíða með snjallsíma til 8. bekkjar.",
    link: "https://www.waituntil8th.org/"
  },
  {
    type: "org",
    typeLabel: "Samtök",
    title: "Smartphone Free Childhood",
    author: "Bretland",
    description:
      "Bresk foreldrahreyfing sem barðist fyrir meðvitaðri tæknivaldri og verndar barnæskuna.",
    link: "https://smartphonefreechildhood.co.uk/"
  },
  {
    type: "research",
    typeLabel: "Rannsókn",
    title: "UNESCO — Smartphones in Schools",
    author: "UNESCO 2023",
    description:
      "Skýrsla UNESCO um neikvæð áhrif snjallsíma á nám og bekkjardýnamík í skólum.",
    link: "https://www.unesco.org/gem-report/en/technology"
  },
  {
    type: "book",
    typeLabel: "Bók",
    title: "Stolen Focus",
    author: "Johann Hari",
    description:
      "Af hverju við getum ekki einbeitt okkur — og hvað við getum gert til að ná athyglinni til baka.",
    link: "https://stolenfocusbook.com/"
  },
  {
    type: "org",
    typeLabel: "Samtök",
    title: "Center for Humane Technology",
    author: "Tristan Harris o.fl.",
    description:
      "Samtök sem berjast gegn reikniritstýrðri tæknifíkn og beita sér fyrir mannlegri tækni.",
    link: "https://www.humanetech.com/"
  }
];

// ---- Render Resources ----
const resourcesList = document.getElementById("resources-list");
if (resourcesList) {
  resources.forEach((res) => {
    const card = document.createElement("article");
    card.className = "resource-card fade-in";
    card.innerHTML = `
      <span class="resource-type ${res.type}">${res.typeLabel}</span>
      <h3>${res.title}</h3>
      <p><em>${res.author}</em> — ${res.description}</p>
      <a href="${res.link}" target="_blank" rel="noopener">Skoða nánar →</a>
    `;
    resourcesList.appendChild(card);
  });
}

// ---- Year in footer ----
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ---- Header hide on scroll ----
const siteHeader = document.getElementById("site-header");
let lastScrollY = window.scrollY;

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

// ---- Mobile menu toggle ----
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("nav-open");
  });

  // Close menu on link click
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("nav-open");
    });
  });
}

// ---- Animated stat counters ----
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// ---- Intersection Observer for fade-in ----
const fadeElements = document.querySelectorAll(".fade-in");
const cards = document.querySelectorAll(
  ".card, .ai-concern, .tip, .join-option"
);
cards.forEach((el) => el.classList.add("fade-in"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// ---- Animate stats on scroll ----
let statsAnimated = false;
const statsBar = document.querySelector(".stats-bar");
if (statsBar) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
      }
    },
    { threshold: 0.4 }
  );
  statsObserver.observe(statsBar);
}

// ---- Toast helper ----
let toastEl = null;
function showToast(message) {
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 3500);
}

// ---- Signup form ----
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = signupForm.querySelector('[name="name"]').value.trim();
    showToast(`Takk, ${name}! Þú ert skráð/ur á póstlistann 💛`);
    signupForm.reset();
  });
}

// ---- Pledge button ----
const pledgeBtn = document.getElementById("pledge-btn");
const pledgeCount = document.getElementById("pledge-count");
let pledges = parseInt(localStorage.getItem("bidum-betur-pledges") || "247", 10);
let hasPledged = localStorage.getItem("bidum-betur-pledged") === "true";

if (pledgeCount) {
  pledgeCount.textContent = pledges;
}

if (pledgeBtn) {
  if (hasPledged) {
    pledgeBtn.textContent = "Þú hefur tekið heitið ✓";
    pledgeBtn.disabled = true;
    pledgeBtn.style.opacity = "0.7";
  }

  pledgeBtn.addEventListener("click", () => {
    if (!hasPledged) {
      pledges++;
      hasPledged = true;
      localStorage.setItem("bidum-betur-pledges", pledges);
      localStorage.setItem("bidum-betur-pledged", "true");
      pledgeCount.textContent = pledges;
      pledgeBtn.textContent = "Þú hefur tekið heitið ✓";
      pledgeBtn.disabled = true;
      pledgeBtn.style.opacity = "0.7";
      showToast("Takk fyrir! Þú ert hluti af hreyfingunni 🛡️");
    }
  });
}

// ---- Share button ----
const shareBtn = document.getElementById("share-btn");
if (shareBtn) {
  shareBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const shareData = {
      title: "Bíðum Betur",
      text: "Foreldrahópur á Íslandi sem styður seinkun snjallsíma og samfélagsmiðla fyrir börn. Barnæskan er ekki til sölu. 🛡️",
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${shareData.text}\n${shareData.url}`
      ).then(() => {
        showToast("Skilaboðin afrituð! Deildu þeim áfram 📣");
      });
    }
  });
}
