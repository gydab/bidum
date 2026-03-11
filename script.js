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
const resources = [
  {
    type: "article",
    typeLabel: "Grein",
    title: "Foreldraþorpið — leiðir fyrir foreldra í stafrænum áskorunum",
    source: "Fyrstu fimm",
    sourceType: "Fræðsluverkefni",
    summary: "Aðgengilegt efni fyrir foreldra um netnotkun barna, samskipti heima og hagnýt skref til að setja mörk.",
    link: "https://fyrstufimm.is/",
    tags: ["Foreldraráð", "Samfélagsmiðlar", "Mörk"],
    audience: ["parents"],
    trustLevel: "A",
    publishedAt: "2025-01-01",
    dialoguePoints: [
      "Vísaðu í sameiginlega ábyrgð heimilis og skóla á stafrænu umhverfi barns.",
      "Byggðu samtal á skýrum, framkvæmdanlegum daglegum venjum í stað refsinga."
    ]
  },
  {
    type: "org",
    typeLabel: "Samtök",
    title: "Heimili og skóli — samstarf heimila og skóla",
    source: "Heimili og skóli",
    sourceType: "Samtök",
    summary: "Efni um foreldrasamstarf, réttindi og uppbyggileg samskipti við skóla sem nýtast vel í formlegum samtölum.",
    link: "https://heimiliogskoli.is/",
    tags: ["Skólasamstarf", "Foreldrar", "Réttindi barns"],
    audience: ["parents", "school-dialogue"],
    trustLevel: "A",
    publishedAt: "2025-01-01",
    dialoguePoints: [
      "Leggðu áherslu á sameiginleg markmið: vellíðan, öryggi og nám barns.",
      "Biddu um skýra samskiptaleið milli foreldra, umsjónarkennara og stjórnenda."
    ]
  },
  {
    type: "org",
    typeLabel: "Samtök",
    title: "Barnaheill — stafrænt öryggi og réttindi barna",
    source: "Barnaheill",
    sourceType: "Samtök",
    summary: "Fræðsla um öryggi barna á netinu, réttindi barns og vernd gegn skaðlegu efni og netofbeldi.",
    link: "https://barnaheill.is/",
    tags: ["Netöryggi", "Réttindi barns", "Samfélagsmiðlar"],
    audience: ["parents", "school-dialogue"],
    trustLevel: "A",
    publishedAt: "2025-01-01",
    dialoguePoints: [
      "Nefndu rétt barns til verndar og þátttöku í öruggu stafrænu umhverfi.",
      "Óskaðu eftir skólareglum sem taka á neteinelti og stafrænu áreiti."
    ]
  },
  {
    type: "research",
    typeLabel: "Rannsókn",
    title: "UNESCO — Technology in Education",
    source: "UNESCO",
    sourceType: "Alþjóðastofnun",
    summary: "Yfirlit um áhrif tækni í skólastarfi, þar á meðal athyglibrest, lærdóm og þörf á skýrum reglum.",
    link: "https://www.unesco.org/gem-report/en/technology",
    tags: ["Skóli", "Skjátími", "Stefnumótun"],
    audience: ["school-dialogue"],
    trustLevel: "A",
    publishedAt: "2023-07-26",
    dialoguePoints: [
      "Styðjið tillögur með alþjóðlegum gögnum um áhrif á nám og athygli.",
      "Ræðið hvernig samræmdar reglur milli bekkja draga úr álagi á foreldra og kennara."
    ]
  },
  {
    type: "article",
    typeLabel: "Grein",
    title: "Embætti landlæknis — geðheilsa barna og ungmenna",
    source: "Embætti landlæknis",
    sourceType: "Stofnun",
    summary: "Fræðslu- og leiðbeiningarefni um geðheilsu barna, áhættuþætti og hvar megi leita aðstoðar.",
    link: "https://island.is/s/landlaeknir",
    tags: ["Geðheilsa", "Forvarnir", "Úrræði"],
    audience: ["parents", "school-dialogue"],
    trustLevel: "A",
    publishedAt: "2025-01-01",
    dialoguePoints: [
      "Vísaðu í opinberar leiðbeiningar um snemmtæka íhlutun og samvinnu kerfa.",
      "Leggðu til skýra verkferla þegar áhyggjur vakna af kvíða, svefni eða félagslegri einangrun."
    ]
  },
  {
    type: "org",
    typeLabel: "Samtök",
    title: "SAFT — örugg netnotkun barna",
    source: "SAFT",
    sourceType: "Fræðsluverkefni",
    summary: "Efni um netöryggi, samfélagsmiðla og stafræna borgaravitund sem foreldrar og skólar geta nýtt saman.",
    link: "https://www.saft.is/",
    tags: ["Netöryggi", "Samfélagsmiðlar", "Skóli"],
    audience: ["parents", "school-dialogue"],
    trustLevel: "A",
    publishedAt: "2025-01-01",
    dialoguePoints: [
      "Kallaðu eftir fræðsluáætlun í skóla um örugga netnotkun eftir aldurshópum.",
      "Stillið saman væntingar heimilis og skóla um samskiptareglur á netinu."
    ]
  },
  {
    type: "org",
    typeLabel: "Samtök",
    title: "Bergið headspace — snemmbær geðheilbrigðisstuðningur",
    source: "Bergið headspace",
    sourceType: "Úrræði",
    summary: "Lágþröskuldur fyrir ungt fólk og fjölskyldur með áherslu á stuðning áður en vandi stækkar.",
    link: "https://www.bergid.is/",
    tags: ["Geðheilsa", "Snemmtæk íhlutun", "Stuðningur"],
    audience: ["parents"],
    trustLevel: "A",
    publishedAt: "2025-01-01",
    dialoguePoints: [
      "Vísaðu í mikilvægi lágþröskuldsúrræða þegar börn sýna fyrstu merki vanlíðanar.",
      "Ræðið hvernig skóli og foreldrar geti samræmt tilvísunarleiðir að úrræðum."
    ]
  },
  {
    type: "org",
    typeLabel: "Samtök",
    title: "Geðhjálp — fræðsla og stuðningur",
    source: "Geðhjálp",
    sourceType: "Samtök",
    summary: "Fræðsla um geðrækt, kvíða og leiðir að stuðningi fyrir fjölskyldur sem vilja bregðast snemma við.",
    link: "https://gedhjalp.is/",
    tags: ["Geðheilsa", "Kvíði", "Foreldrar"],
    audience: ["parents"],
    trustLevel: "A",
    publishedAt: "2025-01-01",
    dialoguePoints: [
      "Byggðu samtalið á því að markmiðið sé vellíðan barns, ekki aðeins agi eða árangur.",
      "Notaðu efnið til að ræða snemmbær viðbrögð áður en einkenni harðna."
    ]
  },
  {
    type: "article",
    typeLabel: "Grein",
    title: "Miðstöð menntunar og skólaþjónustu — ráðgjöf fyrir skóla",
    source: "Miðstöð menntunar og skólaþjónustu",
    sourceType: "Stofnun",
    summary: "Opinber vettvangur með leiðbeiningum sem skólar og foreldrar geta stuðst við við stefnumótun og útfærslu.",
    link: "https://island.is/s/midstod-menntunar-og-skolathjonustu",
    tags: ["Skólasamstarf", "Stefna", "Stuðningskerfi"],
    audience: ["school-dialogue"],
    trustLevel: "A",
    publishedAt: "2025-01-01",
    dialoguePoints: [
      "Ræddu hvernig samræmd framkvæmd milli skóla minnkar ójöfnuð milli barna.",
      "Notið efnið sem grunn að skriflegri aðgerðaáætlun skóla og foreldrafélags."
    ]
  },
  {
    type: "research",
    typeLabel: "Rannsókn",
    title: "UNICEF — Child Rights and the Digital Environment",
    source: "UNICEF",
    sourceType: "Alþjóðastofnun",
    summary: "Áhersla á réttindi barna í stafrænu umhverfi, vernd, þátttöku og ábyrgð opinberra aðila.",
    link: "https://www.unicef.is/",
    tags: ["Réttindi barns", "Stafrænt umhverfi", "Stefnumótun"],
    audience: ["school-dialogue"],
    trustLevel: "A",
    publishedAt: "2024-01-01",
    dialoguePoints: [
      "Rammaðu umræðuna inn sem réttindamál barna fremur en smekksatriði.",
      "Krefstu mælanlegra markmiða um öryggi og stafræna vellíðan í skólaumhverfi."
    ]
  },
  {
    type: "article",
    typeLabel: "Grein",
    title: "Píeta samtökin — fræðsla um vanlíðan og forvarnir",
    source: "Píeta",
    sourceType: "Samtök",
    summary: "Fræðsluefni um andlega vanlíðan og forvarnir sem getur stutt við erfið samtöl um börn og ungmenni.",
    link: "https://pieta.is/",
    tags: ["Geðheilsa", "Forvarnir", "Stuðningur"],
    audience: ["parents", "school-dialogue"],
    trustLevel: "A",
    publishedAt: "2025-01-01",
    dialoguePoints: [
      "Leggðu áherslu á að snemmtæk viðbrögð og opið samtal geta dregið úr alvarlegri þróun.",
      "Biddu um samstillt viðbragð heimilis, skóla og heilbrigðisþjónustu þegar þörf krefur."
    ]
  }
];

const legacyResources = [
  {
    type: "book", typeLabel: "Bók",
    title: "The Anxious Generation", author: "Jonathan Haidt",
    description: "Hvernig endurskipulagning æskuárinnar á snjallsímum og samfélagsmiðlum veldur farsótt geðsjúkdóma meðal ungmennis.",
    link: "https://www.anxiousgeneration.com/",
    tags: ["Geðheilsa", "Samfélagsmiðlar", "Foreldraráð"]
  },
  {
    type: "book", typeLabel: "Bók",
    title: "How to Break Up with Your Phone", author: "Catherine Price",
    description: "Hagnýt ráð til að taka aflið til baka frá snjallsímanum og lifa meðvitaðra með tækni.",
    link: "https://www.catherineprice.com/books",
    tags: ["Skjánotkun", "Athygli", "Dagleg venja"]
  },
  {
    type: "book", typeLabel: "Bók",
    title: "Scattered Minds", author: "Gabor Maté",
    description: "Um athyglisbrest, tilfinningar og hvernig tengslamyndun og umhverfi móta börn.",
    tags: ["ADHD", "Tengslamyndun", "Geðheilsa"]
  },
  {
    type: "book", typeLabel: "Bók",
    title: "Hold On to Your Kids", author: "Gordon Neufeld & Gabor Maté",
    description: "Af hverju foreldratengsl skipta mestu máli og hvernig má styrkja þau í nútímasamfélagi.",
    tags: ["Uppeldi", "Tengsl", "Félagsþrýstingur"]
  },
  {
    type: "book", typeLabel: "Bók",
    title: "The Whole-Brain Child", author: "Daniel J. Siegel & Tina Payne Bryson",
    description: "Hagnýtar leiðir fyrir foreldra til að styðja tilfinningaþroska og sjálfsstjórn barna.",
    tags: ["Heilaþroski", "Tilfinningastjórnun", "Uppeldi"]
  },
  {
    type: "book", typeLabel: "Bók",
    title: "The Book You Wish Your Parents Had Read", author: "Philippa Perry",
    description: "Bókin sem þú vildir að foreldrar þínir hefðu lesið — um samskipti, mörk og heilbrigð tengsl.",
    tags: ["Foreldrahlutverkið", "Samskipti", "Mörk"]
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
    tags: ["Athygli", "Skjáheimur", "Samfélag"]
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

function normalizeLegacyResource(item) {
  return {
    type: item.type,
    typeLabel: item.typeLabel,
    title: item.title,
    source: item.author || "Ótilgreind heimild",
    sourceType: "Greinasafn",
    summary: item.description || "",
    link: item.link,
    tags: item.tags || [],
    audience: ["parents"],
    trustLevel: "B",
    publishedAt: "",
    dialoguePoints: []
  };
}

const resourcesCatalog = [...resources, ...legacyResources.map(normalizeLegacyResource)]
  .filter((item) => item.type !== "org");

const organizationOverviewItems = [
  { name: "Heimili og skóli", focus: "Foreldrasamstarf og skólasamskipti", link: "https://heimiliogskoli.is/" },
  { name: "Barnaheill", focus: "Réttindi barna og netöryggi", link: "https://barnaheill.is/" },
  { name: "SAFT", focus: "Örugg netnotkun barna", link: "https://www.saft.is/" },
  { name: "Bergið headspace", focus: "Snemmtækur geðheilbrigðisstuðningur", link: "https://www.bergid.is/" },
  { name: "Píeta", focus: "Fræðsla og forvarnir í geðheilbrigði", link: "https://pieta.is/" },
  { name: "Geðhjálp", focus: "Stuðningur og geðrækt", link: "https://gedhjalp.is/" },
  { name: "ADHD samtökin", focus: "Fræðsla um athygli og stuðningsúrræði", link: "https://www.adhd.is/" },
  { name: "Einhverfusamtökin", focus: "Ráðgjöf og réttindagæsla", link: "https://www.einhverfa.is/" }
];

let skolarData = { ...skolar };

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
const orgOverviewList = document.getElementById("org-overview-list");
const resourceFilterButtons = document.querySelectorAll(".resource-filter-btn");
let currentResourceFilter = "all";

function formatResourceDate(dateString) {
  if (!dateString) return "Dagsetning ekki skráð";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Dagsetning ekki skráð";

  return date.toLocaleDateString("is-IS", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}

function renderResources() {
  if (!resourcesList) return;

  let filteredResources =
    currentResourceFilter === "all"
      ? resourcesCatalog
      : resourcesCatalog.filter((res) => res.type === currentResourceFilter);

  resourcesList.innerHTML = "";

  if (!filteredResources.length) {
    resourcesList.innerHTML = `
      <article class="resource-card resource-empty-state">
        <h3>Engar færslur passa við valdar síur</h3>
        <p>Prófaðu að velja "Allir" eða "Allt efni" til að sjá allt safnið.</p>
      </article>
    `;
    return;
  }

  filteredResources.forEach((res) => {
    const card = document.createElement("article");
    card.className = "resource-card";

    const tagsHtml = Array.isArray(res.tags) && res.tags.length
      ? `<div class="resource-tags">${res.tags
          .map((tag) => `<span class="resource-tag">${tag}</span>`)
          .join("")}</div>`
      : "";

    const links = res.link ? [{ label: "Opna heimild", link: res.link }] : [];

    const linksHtml = links.length
      ? `<div class="resource-links">${links
          .map(
            (item) =>
              `<a href="${item.link}" target="_blank" rel="noopener">${item.label}</a>`
          )
          .join("")}</div>`
      : "";

    const dialoguePointsHtml = Array.isArray(res.dialoguePoints) && res.dialoguePoints.length
      ? `<div class="resource-dialogue">
          <h4>Nota í samtali við skóla/yfirvöld</h4>
          <ul>
            ${res.dialoguePoints.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </div>`
      : "";

    card.innerHTML = `
      <span class="resource-type ${res.type}">${res.typeLabel}</span>
      <h3>${res.title}</h3>
      <p>${res.summary}</p>
      <p class="resource-meta"><strong>Heimild:</strong> ${res.source} (${res.sourceType}) · <strong>Dagsetning:</strong> ${formatResourceDate(res.publishedAt)} · <strong>Trauststig:</strong> ${res.trustLevel}</p>
      ${tagsHtml}
      ${dialoguePointsHtml}
      ${linksHtml}
    `;
    resourcesList.appendChild(card);
  });
}

function renderOrganizationsOverview() {
  if (!orgOverviewList) return;

  orgOverviewList.innerHTML = "";

  organizationOverviewItems.forEach((org) => {
    const card = document.createElement("article");
    card.className = "org-overview-card";
    card.innerHTML = `
      <h4>${org.name}</h4>
      <p>${org.focus}</p>
      <a href="${org.link}" target="_blank" rel="noopener">Opna síðu</a>
    `;
    orgOverviewList.appendChild(card);
  });
}

if (resourceFilterButtons.length) {
  resourceFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentResourceFilter = button.dataset.resourceFilter || "all";

      resourceFilterButtons.forEach((btn) => {
        if (!btn.dataset.resourceFilter) return;
        btn.classList.remove("active");
      });

      button.classList.add("active");
      renderResources();
    });
  });
}

renderOrganizationsOverview();
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

function populateSchoolOptions(municipality) {
  schoolSelect.innerHTML = '<option value="">— Veldu skóla —</option>';

  if (municipality && skolarData[municipality]) {
    skolarData[municipality].sort((a, b) => a.localeCompare(b, "is")).forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      schoolSelect.appendChild(opt);
    });
    schoolSelect.disabled = false;
  } else {
    schoolSelect.disabled = true;
  }
}

function renderMunicipalityDropdown() {
  if (!sveitarfelagSelect) return;

  const currentValue = sveitarfelagSelect.value;
  sveitarfelagSelect.innerHTML = '<option value="">— Veldu sveitarfélag —</option>';

  const sortedMunicipalities = Object.keys(skolarData).sort((a, b) =>
    a.localeCompare(b, "is")
  );

  sortedMunicipalities.forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    sveitarfelagSelect.appendChild(opt);
  });

  if (currentValue && skolarData[currentValue]) {
    sveitarfelagSelect.value = currentValue;
    populateSchoolOptions(currentValue);
  } else {
    populateSchoolOptions("");
  }
}

if (sveitarfelagSelect) {
  renderMunicipalityDropdown();

  sveitarfelagSelect.addEventListener("change", () => {
    const municipality = sveitarfelagSelect.value;
    populateSchoolOptions(municipality);
  });
}

// ============================================
// OTP VERIFICATION FLOW
// ============================================
let pendingPledge = null;

function showOtpUI(maskedEmail) {
  const container = document.querySelector(".pledge-form-container");
  pledgeForm.style.display = "none";

  let otpSection = document.getElementById("otp-section");
  if (!otpSection) {
    otpSection = document.createElement("div");
    otpSection.id = "otp-section";
    otpSection.className = "otp-section";
    otpSection.innerHTML = `
      <div class="otp-header">
        <h3>Staðfestu netfangið þitt</h3>
        <p>Við sendum 6 stafa kóða á <strong id="otp-email-display"></strong>.<br>Sláðu hann inn hér til að ljúka við undirskriftina.</p>
      </div>
      <div class="otp-form-row">
        <input type="text" id="otp-input" maxlength="6" placeholder="123456" autocomplete="one-time-code" inputmode="numeric" />
        <button type="button" id="otp-submit" class="btn btn-primary">Staðfesta</button>
      </div>
      <button type="button" id="otp-back" class="btn-link">← Til baka</button>
    `;
    container.appendChild(otpSection);

    document.getElementById("otp-submit").addEventListener("click", handleOtpSubmit);
    document.getElementById("otp-back").addEventListener("click", () => {
      otpSection.style.display = "none";
      pledgeForm.style.display = "";
      pendingPledge = null;
    });
    document.getElementById("otp-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleOtpSubmit();
    });
  }

  document.getElementById("otp-email-display").textContent = maskedEmail;
  otpSection.style.display = "";
  document.getElementById("otp-input").value = "";
  document.getElementById("otp-input").focus();
}

async function handleOtpSubmit() {
  const otp = document.getElementById("otp-input").value.trim();
  if (!otp || otp.length !== 6) {
    showToast("Sláðu inn 6 stafa kóðann");
    return;
  }

  const submitBtn = document.getElementById("otp-submit");
  submitBtn.disabled = true;
  submitBtn.textContent = "...";

  try {
    const response = await fetch(`${apiBaseUrl}/api/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: pendingPledge.email, otp })
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      const savedPledge = { ...pendingPledge, timestamp: new Date().toISOString() };
      const data = getPledgeData();
      data.push(savedPledge);
      savePledgeData(data);

      showToast(`Takk, ${pendingPledge.name}! Þú hefur skrifað undir fyrir ${pendingPledge.school}, ${pendingPledge.grade}. bekk 🛡️`);

      document.getElementById("otp-section").style.display = "none";
      pledgeForm.style.display = "";
      pledgeForm.reset();
      schoolSelect.disabled = true;
      pendingPledge = null;

      updateTotals();
      renderSchoolDirectory();
    } else {
      showToast(result.error || "Villa við staðfestingu");
    }
  } catch {
    showToast("Villa við staðfestingu. Reyndu aftur.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Staðfesta";
  }
}

// ============================================
// PLEDGE FORM SUBMIT
// ============================================
const pledgeForm = document.getElementById("pledge-form");
if (pledgeForm) {
  pledgeForm.addEventListener("submit", async (e) => {
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

    // Check if already pledged locally
    const existing = getPledgeData().find(
      (p) => p.email === email.toLowerCase() && p.school === school && p.grade === grade
    );
    if (existing) {
      showToast("Þú hefur þegar skrifað undir fyrir þennan bekk!");
      return;
    }

    const submitBtn = pledgeForm.querySelector("button[type=submit]");
    submitBtn.disabled = true;

    try {
      const response = await fetch(`${apiBaseUrl}/api/otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, sveitarfelag, school, grade, childName: childName || null })
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        pendingPledge = { name, email: email.toLowerCase(), sveitarfelag, school, grade, childName: childName || null };
        showOtpUI(result.maskedEmail);
      } else {
        showToast(result.error || "Villa við sendingu. Reyndu aftur.");
      }
    } catch {
      showToast("Ekki náðist samband við þjón. Reyndu aftur.");
    } finally {
      submitBtn.disabled = false;
    }
  });
}

// ============================================
// UPDATE TOTALS
// ============================================
function updateTotals(serverStats) {
  const totalPledgesEl = document.getElementById("total-pledges");
  const totalSchoolsEl = document.getElementById("total-schools");

  if (serverStats) {
    if (totalPledgesEl) totalPledgesEl.textContent = serverStats.totalPledges;
    if (totalSchoolsEl) totalSchoolsEl.textContent = serverStats.totalSchools;
  } else {
    if (totalPledgesEl) totalPledgesEl.textContent = getTotalPledges();
    if (totalSchoolsEl) totalSchoolsEl.textContent = getSchoolsWithPledges();
  }
}

updateTotals();

async function fetchAndUpdateStats() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/pledges/stats`);
    if (!response.ok) return;
    const stats = await response.json();
    updateTotals(stats);
  } catch {
    // local fallback
  }
}

fetchAndUpdateStats();
hydratePledgesFromServer();

// ============================================
// SCHOOL DIRECTORY
// ============================================
let currentFilter = "all";
let currentSearch = "";

function getAllSchoolsFlat() {
  const list = [];
  for (const [municipality, schools] of Object.entries(skolarData)) {
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

  const defaultButtonHtml =
    '<button class="filter-btn active" data-filter="all">Öll sveitarfélög</button>';
  filterBar.innerHTML = defaultButtonHtml;

  const municipalities = Object.keys(skolarData).sort((a, b) =>
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

  if (!filterBar.dataset.boundClick) {
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
    filterBar.dataset.boundClick = "true";
  }
}

renderFilterButtons();

async function hydrateSchoolsFromServer() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/schools/tree`);
    if (!response.ok) return;

    const serverSchools = await response.json();
    if (!serverSchools || typeof serverSchools !== "object") return;

    const normalized = {};
    Object.entries(serverSchools).forEach(([municipality, schools]) => {
      if (!Array.isArray(schools)) return;

      const cleanMunicipality = String(municipality || "").trim();
      if (!cleanMunicipality) return;

      const cleanSchools = schools
        .map((school) => String(school || "").trim())
        .filter(Boolean);

      if (!cleanSchools.length) return;
      normalized[cleanMunicipality] = cleanSchools;
    });

    if (!Object.keys(normalized).length) return;

    skolarData = normalized;
    currentFilter = "all";

    renderMunicipalityDropdown();
    renderFilterButtons();
    renderSchoolDirectory();
  } catch {
    // keep local school data fallback
  }
}

hydrateSchoolsFromServer();

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
