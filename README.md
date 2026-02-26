# Bíðum Betur — Workspace

Þetta workspace inniheldur statíska vefsíðu fyrir verkefnið **Bíðum Betur**.

## Skráaskipan

- `index.html` — uppbygging síðunnar
- `styles.css` — útlit og responsive stílar
- `script.js` — gagnavinnsla, virkni og tengd notendaupplifun

## Keyra verkefnið á staðbundinni vél

### Valkostur 1: Full uppsetning (mælt með)

Þessi leið keyrir vefinn með gagnagrunni fyrir skóla og skráningar.

1. Settu upp pakkana:

```powershell
npm install
```

2. Ræstu þjóninn:

```powershell
npm start
```

3. Opnaðu:

`http://localhost:3000`

### Valkostur 2: Opna beint (án gagnagrunns)

1. Opnaðu `index.html` í vafra.

### Valkostur 3: Local static server (án gagnagrunns)

Í PowerShell inni í workspace:

```powershell
python -m http.server 5500
```

Síðan opnarðu:

`http://localhost:5500`

## Athugasemd

Verkefnið keyrir nú með valfrjálsum Node + SQLite backend (`backend/server.js`) sem sér um:

- skóla og sveitarfélög
- undirskriftir/skráningar foreldra
- API undir `/api/*`

Front-end hefur áfram local fallback ef backend er ekki keyrður.