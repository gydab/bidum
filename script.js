/* ============================================
   BÍÐUM BETUR — JAVASCRIPT
   Skólabundið viljayfirlýsingakerfi
   ============================================ */

// ============================================
// GRUNNSKÓLAR Á ÍSLANDI — eftir sveitarfélögum
// ============================================
const skolar = {
  "Reykjavík": [
    "Austurbæjarskóli", "Breiðagerðisskóli", "Dalskóli", "Engidalsskóli",
    "Fellaskóli", "Foldaskóli", "Fossvogsskóli", "Grandaskóli",
    "Hagaskóli", "Hlíðaskóli", "Húsaskóli", "Ingunnarskóli",
    "Kelduskóli", "Langholtsskóli", "Laugarnesskóli", "Laugalækjarskóli",
    "Melaskóli", "Norðlingaskóli", "Réttarholtsskóli", "Rimaskóli",
    "Selásskóli", "Seljaskóli", "Smáraskóli", "Sólvangsskóli",
    "Vesturbæjarskóli", "Vogaskóli", "Þelamerkurskóli", "Árbæjarskóli",
    "Brúarskóli", "Geislabaugur", "Hamraskóli", "Hólabrekkuskóli",
    "Lækjarskóli", "Lágmúlaskóli", "Naustaskóli"
  ],
  "Kópavogur": [
    "Kópavogsskóli", "Lindaskóli", "Lækjarbotnasskóli", "Mennta- og nýsköpunarskóli Kópavogs",
    "Sæmundarskóli", "Vatnsendaskóli", "Salaskóli", "Smárasskóli",
    "Álftanesskóli"
  ],
  "Hafnarfjörður": [
    "Hafnarfjarðarskóli", "Hvaleyrarskóli", "Úthlíðarskóli", "Vörðuskóli",
    "Skólabrú", "Bakkaskóli", "Ferstikla"
  ],
  "Garðabær": [
    "Álftanesskóli", "Garðaskóli", "Flataskóli", "Hoflandaskóli", "Sjálandsskóli"
  ],
  "Mosfellsbær": [
    "Varmárskóli", "Helgafellsskóli", "Krikaskóli"
  ],
  "Seltjarnarnes": [
    "Seltjarnarnesskóli"
  ],
  "Reykjanesbær": [
    "Duushús", "Hæðarskóli", "Keflavíkurskóli", "Njörðvíkurskóli",
    "Njarðvíkurskóli"
  ],
  "Grindavík": [
    "Grunnskóli Grindavíkur"
  ],
  "Sandgerði": [
    "Grunnskóli Sandgerðis"
  ],
  "Vogar": [
    "Grunnskólinn í Vogum"
  ],
  "Akranes": [
    "Grunnskólinn á Akranesi", "Brekkuskóli"
  ],
  "Borgarnes": [
    "Grunnskóli Borgarfjarðar"
  ],
  "Akureyri": [
    "Glerárskóli", "Lundarskóli", "Naustaskóli", "Oddeyrarskóli",
    "Brekkuskóli"
  ],
  "Ísafjörður": [
    "Grunnskóli Ísafjarðar"
  ],
  "Vestmannaeyjar": [
    "Barnaskóli Vestmannaeyja", "Hamarsskóli"
  ],
  "Selfoss": [
    "Sunnulækjarskóli", "Engidalsskóli Selfoss"
  ],
  "Hveragerði": [
    "Grunnskóli Hveragerðis"
  ],
  "Þorlákshöfn": [
    "Grunnskóli Ölfuss"
  ],
  "Stykkishólmur": [
    "Grunnskóli Stykkishólms"
  ],
  "Dalvík": [
    "Grunnskóli Dalvíkurbyggðar"
  ],
  "Siglufjörður": [
    "Grunnskóli Fjallabyggðar"
  ],
  "Húsavík": [
    "Grunnskóli Húsavíkur"
  ],
  "Sauðárkrókur": [
    "Grunnskólinn á Sauðárkróki"
  ],
  "Blönduós": [
    "Grunnskólinn á Blönduósi"
  ],
  "Egilsstaðir": [
    "Egilsstaðaskóli", "Fellaskóli Egilsstaðir"
  ],
  "Neskaupstaður": [
    "Grunnskóli Neskaupstaðar"
  ],
  "Seyðisfjörður": [
    "Seyðisfjarðarskóli"
  ],
  "Ólafsvík": [
    "Grunnskólinn á Ólafsvík"
  ],
  "Bolungarvík": [
    "Grunnskólinn í Bolungarvík"
  ],
  "Patreksfjörður": [
    "Grunnskóli Vesturbyggðar"
  ],
  "Vík í Mýrdal": [
    "Grunnskóli Mýrdalshrepps"
  ],
  "Höfn í Hornafirði": [
    "Grunnskólinn á Höfn"
  ],
  "Hvammstangi": [
    "Grunnskóli Húnaþings vestra"
  ],
  "Hella": [
    "Grunnskóli Rangárþings ytra"
  ],
  "Laugarás": [
    "Grunnskóli Bláskógabyggðar"
  ],
  "Flúðir": [
    "Grunnskólinn á Flúðum"
  ],
  "Reyðarfjörður": [
    "Grunnskóli Fjarðabyggðar"
  ],
  "Borgarfjörður eystri": [
    "Grunnskólinn í Borgarfirði eystra"
  ]
};

// ============================================
// RESOURCES DATA
// ============================================
function getBookPlatformLinks(_title, _author = "", directLinks = {}) {
  const orderedLabels = [
    "Spotify",
    "Storytel",
    "Audible",
    "Amazon",
    "Rafbókasafnið",
    "Bókasafnið",
    "Leitir.is"
  ];

  return orderedLabels
    .filter((label) => Boolean(directLinks[label]))
    .map((label) => ({
      label,
      link: directLinks[label]
    }));
}

const resources = [
  {
    type: "book", typeLabel: "Bók",
    title: "The Anxious Generation", author: "Jonathan Haidt",
    description: "Hvernig endurskipulagning æskuárinnar á snjallsímum og samfélagsmiðlum veldur farsótt geðsjúkdóma meðal ungmennis.",
    link: "https://www.anxiousgeneration.com/",
    tags: ["Geðheilsa", "Samfélagsmiðlar", "Foreldraráð"],
    platformLinks: getBookPlatformLinks("The Anxious Generation", "Jonathan Haidt")
  },
  {
    type: "book", typeLabel: "Bók",
    title: "How to Break Up with Your Phone", author: "Catherine Price",
    description: "Hagnýt ráð til að taka aflið til baka frá snjallsímanum og lifa meðvitaðra með tækni.",
    link: "https://www.catherineprice.com/books",
    tags: ["Skjánotkun", "Athygli", "Dagleg venja"],
    platformLinks: getBookPlatformLinks("How to Break Up with Your Phone", "Catherine Price")
  },
  {
    type: "book", typeLabel: "Bók",
    title: "Scattered Minds", author: "Gabor Maté",
    description: "Um athyglisbrest, tilfinningar og hvernig tengslamyndun og umhverfi móta börn.",
    tags: ["ADHD", "Tengslamyndun", "Geðheilsa"],
    platformLinks: getBookPlatformLinks("Scattered Minds", "Gabor Maté", {
      Rafbókasafnið: "https://rafbokasafnid.overdrive.com/media/4251242"
    })
  },
  {
    type: "book", typeLabel: "Bók",
    title: "Hold On to Your Kids", author: "Gordon Neufeld & Gabor Maté",
    description: "Af hverju foreldratengsl skipta mestu máli og hvernig má styrkja þau í nútímasamfélagi.",
    tags: ["Uppeldi", "Tengsl", "Félagsþrýstingur"],
    platformLinks: getBookPlatformLinks("Hold On to Your Kids", "Gordon Neufeld Gabor Maté")
  },
  {
    type: "book", typeLabel: "Bók",
    title: "The Whole-Brain Child", author: "Daniel J. Siegel & Tina Payne Bryson",
    description: "Hagnýtar leiðir fyrir foreldra til að styðja tilfinningaþroska og sjálfsstjórn barna.",
    tags: ["Heilaþroski", "Tilfinningastjórnun", "Uppeldi"],
    platformLinks: getBookPlatformLinks("The Whole-Brain Child", "Daniel J Siegel Tina Payne Bryson")
  },
  {
    type: "book", typeLabel: "Bók",
    title: "The Book You Wish Your Parents Had Read", author: "Philippa Perry",
    description: "Bókin sem þú vildir að foreldrar þínir hefðu lesið — um samskipti, mörk og heilbrigð tengsl.",
    tags: ["Foreldrahlutverkið", "Samskipti", "Mörk"],
    platformLinks: getBookPlatformLinks("The Book You Wish Your Parents Had Read", "Philippa Perry")
  },
  {
    type: "research", typeLabel: "Rannsókn",
    title: "Sapien Labs — Age of First Smartphone", author: "Sapien Labs",
    description: "Rannsókn sem sýnir beina fylgni milli aldurs við fyrsta snjallsíma og geðheilsu ungmenna.",
    link: "https://sapienlabs.org/age-of-first-smartphone-and-mental-wellbeing-outcomes/"
  },
  {
    type: "org", typeLabel: "Samtök",
    title: "Wait Until 8th", author: "Bandaríkin",
    description: "Foreldrahreyfing í Bandaríkjunum sem hvetur foreldra til að bíða með snjallsíma til 8. bekkjar.",
    link: "https://www.waituntil8th.org/"
  },
  {
    type: "org", typeLabel: "Samtök",
    title: "Smartphone Free Childhood", author: "Bretland",
    description: "Bresk foreldrahreyfing sem barðist fyrir meðvitaðri tæknivaldri og verndar barnæskuna.",
    link: "https://smartphonefreechildhood.co.uk/"
  },
  {
    type: "research", typeLabel: "Rannsókn",
    title: "UNESCO — Smartphones in Schools", author: "UNESCO 2023",
    description: "Skýrsla UNESCO um neikvæð áhrif snjallsíma á nám og bekkjardýnamík í skólum.",
    link: "https://www.unesco.org/gem-report/en/technology"
  },
  {
    type: "article", typeLabel: "Grein",
    title: "WHO — Addictive behaviours: gaming disorder", author: "WHO",
    description: "Yfirlit um ávanabindandi hegðun tengda skjánotkun og mikilvægi forvarna fyrir börn og ungmenni.",
    link: "https://www.who.int/news-room/questions-and-answers/item/addictive-behaviours-gaming-disorder"
  },
  {
    type: "book", typeLabel: "Bók",
    title: "Stolen Focus", author: "Johann Hari",
    description: "Af hverju við getum ekki einbeitt okkur — og hvað við getum gert til að ná athyglinni til baka.",
    link: "https://stolenfocusbook.com/",
    tags: ["Athygli", "Skjáheimur", "Samfélag"],
    platformLinks: getBookPlatformLinks("Stolen Focus", "Johann Hari")
  },
  {
    type: "podcast", typeLabel: "Hlaðvarp",
    title: "Viðring í uppeldi", author: "Spotify",
    description: "Hlaðvarp um uppeldi og áskoranir foreldra í samtímanum.",
    link: "https://open.spotify.com/search/vi%C3%B0ring%20%C3%AD%20uppeldi"
  },
  {
    type: "podcast", typeLabel: "Hlaðvarp",
    title: "Kvíðakynslóðin", author: "Spotify",
    description: "Hlaðvarp um kvíða, geðheilsu barna og áhrif stafræns umhverfis.",
    link: "https://open.spotify.com/search/kv%C3%AD%C3%B0akynsl%C3%B3%C3%B0in"
  },
  {
    type: "org", typeLabel: "Samtök",
    title: "Center for Humane Technology", author: "Tristan Harris o.fl.",
    description: "Samtök sem berjast gegn reikniritstýrðri tæknifíkn og beita sér fyrir mannlegri tækni.",
    link: "https://www.humanetech.com/"
  }
];

// ============================================
// PLEDGE DATA (localStorage)
// ============================================
const apiBaseUrl = window.location.origin;

function getLocalPledgeData() {
  try {
    return JSON.parse(localStorage.getItem("bidum-pledges") || "[]");
  } catch {
    return [];
  }
}

let pledgeCache = getLocalPledgeData();

function getPledgeData() {
  return pledgeCache;
}

function savePledgeData(data) {
  pledgeCache = data;
  localStorage.setItem("bidum-pledges", JSON.stringify(data));
}

async function syncPledgeToServer(pledge) {
  try {
    const response = await fetch(`${apiBaseUrl}/api/pledges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pledge)
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      if (response.status === 409 && result.error) {
        showToast(result.error);
      }
    }
  } catch {
    // local fallback remains available
  }
}

async function hydratePledgesFromServer() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/pledges`);
    if (!response.ok) return;

    const serverPledges = await response.json();
    if (!Array.isArray(serverPledges)) return;

    savePledgeData(serverPledges);
    updateTotals();
    renderSchoolDirectory();
  } catch {
    // local fallback remains available
  }
}

function addPledge(pledge) {
  const data = getPledgeData();
  const savedPledge = {
    ...pledge,
    timestamp: new Date().toISOString()
  };

  data.push(savedPledge);
  savePledgeData(data);
  syncPledgeToServer(savedPledge);
  return data;
}

function getPledgesBySchool(schoolName) {
  return getPledgeData().filter(p => p.school === schoolName);
}

function getTotalPledges() {
  return getPledgeData().length;
}

function getSchoolsWithPledges() {
  const data = getPledgeData();
  const schools = new Set(data.map(p => p.school));
  return schools.size;
}

// ============================================
// RENDER RESOURCES
// ============================================
const resourcesList = document.getElementById("resources-list");
const resourceFilterButtons = document.querySelectorAll(".resource-filter-btn");
let currentResourceFilter = "all";

function renderResources() {
  if (!resourcesList) return;

  const filteredResources =
    currentResourceFilter === "all"
      ? resources
      : resources.filter((res) => res.type === currentResourceFilter);

  resourcesList.innerHTML = "";

  filteredResources.forEach((res) => {
    const card = document.createElement("article");
    card.className = "resource-card";
    const tagsHtml = Array.isArray(res.tags) && res.tags.length
      ? `<div class="resource-tags">${res.tags
          .map((tag) => `<span class="resource-tag">${tag}</span>`)
          .join("")}</div>`
      : "";

    const links = Array.isArray(res.platformLinks) && res.platformLinks.length
      ? res.platformLinks
      : res.link
        ? [{ label: "Skoða nánar", link: res.link }]
        : [];

    const linksHtml = links.length
      ? `<div class="resource-links">${links
          .map(
            (item) =>
              `<a href="${item.link}" target="_blank" rel="noopener">${item.label}</a>`
          )
          .join("")}</div>`
      : "";

    card.innerHTML = `
      <span class="resource-type ${res.type}">${res.typeLabel}</span>
      <h3>${res.title}</h3>
      <p><em>${res.author}</em> — ${res.description}</p>
      ${tagsHtml}
      ${linksHtml}
    `;
    resourcesList.appendChild(card);
  });
}

if (resourceFilterButtons.length) {
  resourceFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentResourceFilter = button.dataset.resourceFilter || "all";
      resourceFilterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderResources();
    });
  });
}

renderResources();

// ============================================
// YEAR IN FOOTER
// ============================================
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ============================================
// HEADER HIDE ON SCROLL
// ============================================
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

// ============================================
// MOBILE MENU
// ============================================
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("nav-open");
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mainNav.classList.remove("nav-open"));
  });
}

// ============================================
// ANIMATED STAT COUNTERS
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ============================================
// INTERSECTION OBSERVER — FADE IN
// ============================================
const cards = document.querySelectorAll(
  ".card, .ai-concern, .tip, .join-option, .step, .total-box"
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

// ============================================
// STATS ON SCROLL
// ============================================
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

// ============================================
// TOAST HELPER
// ============================================
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

// ============================================
// POPULATE SVEITARFÉLAG + SCHOOL DROPDOWNS
// ============================================
const sveitarfelagSelect = document.getElementById("pledge-sveitarfelag");
const schoolSelect = document.getElementById("pledge-school");

if (sveitarfelagSelect) {
  const sortedMunicipalities = Object.keys(skolar).sort((a, b) =>
    a.localeCompare(b, "is")
  );

  sortedMunicipalities.forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    sveitarfelagSelect.appendChild(opt);
  });

  sveitarfelagSelect.addEventListener("change", () => {
    const municipality = sveitarfelagSelect.value;
    schoolSelect.innerHTML = '<option value="">— Veldu skóla —</option>';

    if (municipality && skolar[municipality]) {
      skolar[municipality].sort((a, b) => a.localeCompare(b, "is")).forEach((s) => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        schoolSelect.appendChild(opt);
      });
      schoolSelect.disabled = false;
    } else {
      schoolSelect.disabled = true;
    }
  });
}

// ============================================
// PLEDGE FORM SUBMIT
// ============================================
const pledgeForm = document.getElementById("pledge-form");
if (pledgeForm) {
  pledgeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("pledge-name").value.trim();
    const email = document.getElementById("pledge-email").value.trim();
    const sveitarfelag = document.getElementById("pledge-sveitarfelag").value;
    const school = document.getElementById("pledge-school").value;
    const grade = document.getElementById("pledge-grade").value;
    const childName = document.getElementById("pledge-child-name").value.trim();

    if (!name || !email || !sveitarfelag || !school || !grade) {
      showToast("Vinsamlegast fylltu út alla reiti");
      return;
    }

    // Check if already pledged for this school+grade
    const existing = getPledgeData().find(
      (p) => p.email === email && p.school === school && p.grade === grade
    );
    if (existing) {
      showToast("Þú hefur þegar skrifað undir fyrir þennan bekk!");
      return;
    }

    addPledge({
      name,
      email,
      sveitarfelag,
      school,
      grade,
      childName: childName || null
    });

    showToast(
      `Takk, ${name}! Þú hefur skrifað undir fyrir ${school}, ${grade}. bekk 🛡️`
    );
    pledgeForm.reset();
    schoolSelect.disabled = true;

    updateTotals();
    renderSchoolDirectory();
  });
}

// ============================================
// UPDATE TOTALS
// ============================================
function updateTotals() {
  const totalPledgesEl = document.getElementById("total-pledges");
  const totalSchoolsEl = document.getElementById("total-schools");

  if (totalPledgesEl) totalPledgesEl.textContent = getTotalPledges();
  if (totalSchoolsEl) totalSchoolsEl.textContent = getSchoolsWithPledges();
}

updateTotals();
hydratePledgesFromServer();

// ============================================
// SCHOOL DIRECTORY
// ============================================
let currentFilter = "all";
let currentSearch = "";

function getAllSchoolsFlat() {
  const list = [];
  for (const [municipality, schools] of Object.entries(skolar)) {
    for (const school of schools) {
      list.push({ name: school, municipality });
    }
  }
  return list.sort((a, b) => a.name.localeCompare(b.name, "is"));
}

function renderSchoolDirectory() {
  const container = document.getElementById("school-directory");
  if (!container) return;

  let schools = getAllSchoolsFlat();

  // Filter by municipality
  if (currentFilter !== "all") {
    schools = schools.filter((s) => s.municipality === currentFilter);
  }

  // Filter by search
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    schools = schools.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.municipality.toLowerCase().includes(q)
    );
  }

  if (schools.length === 0) {
    container.innerHTML =
      '<div class="no-results">Enginn skóli fannst. Prófaðu aðra leit.</div>';
    return;
  }

  container.innerHTML = schools
    .map((school) => {
      const pledges = getPledgesBySchool(school.name);
      const totalForSchool = pledges.length;
      const hasPledges = totalForSchool > 0;

      // Build grade bars
      const gradeBars = Array.from({ length: 10 }, (_, i) => {
        const grade = i + 1;
        const count = pledges.filter((p) => parseInt(p.grade) === grade).length;
        const maxExpected = 25;
        const pct = Math.min((count / maxExpected) * 100, 100);
        const hasP = count > 0;
        return `
          <div class="grade-bar ${hasP ? "has-pledges" : ""}" title="${grade}. bekkur: ${count} undirskrift${count !== 1 ? "ir" : ""}">
            <div class="grade-bar-fill" style="height: ${pct}%"></div>
            <span class="grade-bar-label">${grade}</span>
          </div>
        `;
      }).join("");

      return `
        <div class="school-card ${hasPledges ? "has-pledges" : ""} fade-in">
          <div class="school-card-header">
            <div>
              <h3>${school.name}</h3>
              <div class="school-municipality">${school.municipality}</div>
            </div>
            <span class="school-pledge-count ${hasPledges ? "" : "empty"}">
              ${totalForSchool} undirskrift${totalForSchool !== 1 ? "ir" : ""}
            </span>
          </div>
          <div class="grade-bars">${gradeBars}</div>
          <div class="school-card-footer">
            <span>Bekkir 1–10</span>
            <a href="#skrifa-undir">Skrifa undir →</a>
          </div>
        </div>
      `;
    })
    .join("");

  // Re-observe fade-in
  container.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

// ============================================
// SCHOOL FILTER BUTTONS
// ============================================
function renderFilterButtons() {
  const filterBar = document.getElementById("sveitarfelag-filters");
  if (!filterBar) return;

  const municipalities = Object.keys(skolar).sort((a, b) =>
    a.localeCompare(b, "is")
  );

  const pledgeData = getPledgeData();
  const municipalitiesWithPledges = new Set(pledgeData.map((p) => p.sveitarfelag));

  municipalities.forEach((name) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = name;
    btn.textContent = name;
    if (municipalitiesWithPledges.has(name)) {
      btn.textContent += " ✓";
    }
    filterBar.appendChild(btn);
  });

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    filterBar.querySelectorAll(".filter-btn").forEach((b) =>
      b.classList.remove("active")
    );
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    renderSchoolDirectory();
  });
}

renderFilterButtons();

// ============================================
// SCHOOL SEARCH
// ============================================
const schoolSearchInput = document.getElementById("school-search");
if (schoolSearchInput) {
  let searchTimeout;
  schoolSearchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearch = schoolSearchInput.value.trim();
      renderSchoolDirectory();
    }, 250);
  });
}

// ============================================
// INITIAL RENDER
// ============================================
renderSchoolDirectory();

// ============================================
// SHARE BUTTON
// ============================================
const shareBtn = document.getElementById("share-btn");
if (shareBtn) {
  shareBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const shareData = {
      title: "Bíðum Betur",
      text: "Foreldrahópur á Íslandi sem styður seinkun snjallsíma og samfélagsmiðla fyrir börn. Skrifaðu undir viljayfirlýsinguna fyrir skólann þinn! 🛡️",
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard
        .writeText(`${shareData.text}\n${shareData.url}`)
        .then(() => showToast("Skilaboðin afrituð! Deildu þeim áfram 📣"));
    }
  });
}
