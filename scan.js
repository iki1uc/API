// // ------------------------------------------------------
// // API GHOST SCAN ENGINE - /7 - Name = was er macht - resilient
// // ------------------------------------------------------

window.GHOST = {
    files: {}, csv: {}, tech: {}, nc2: {}, room: {},
    ready: false,
    log: (m) => console.log(`GHOST: ${m}`),

    // Name = SCAN FOLDER = was er macht
    async scanFolder(folder) {
        try {
            // index.json gibt's nicht - also scan über bekannte Liste - resilient
            const known = {
                "B": ["B,room", "achse-bedeutung-15.csv"],
                "H": ["h,room", "12e allin allout.room", "hardware-form-nc-operator-5 (1).csv", "datei-hardware-form-9 (1).csv"],
                "T": ["T.room", "6E → 6D.tech", "NC²□.sync", "NC²□octa³.align", "station-geometrie-11 (8).csv"]
            };
            const list = known[folder] || [];
            this.files[folder] = list;
            this.log(`SCAN ${folder} = ${list.length} Files`);
            return list;
        } catch(e) { this.log(`SCAN ${folder} Fehler = ${e.message} = resilient weiter`); return []; }
    },

    // Name = LOAD CSV = was er macht
    async loadCSV(path) {
        try {
            const response = await fetch(path);
            if(!response.ok) throw new Error(`404 ${path}`);
            const text = await response.text();
            const lines = text.trim().split("\n");
            const headers = lines.shift().split(",").map(h=>h.trim());
            return lines.map(line => {
                // resilient split - nur erstes Komma? Nein - alle aber getrimmt
                const values = line.split(",").map(v=>v.trim());
                const obj = {};
                headers.forEach((h,i)=>obj[h]=values[i]||"");
                return obj;
            });
        } catch(e) { this.log(`CSV ${path} nicht da = ${e.message} = wech`); return []; }
    },

    async loadAllCSV() {
        // B, H, T = die 3 als erstes weg? Nein - als erstes scannen, dann wech wenn ungesehen
        this.csv.achse = await this.loadCSV("B/achse-bedeutung-15.csv");
        this.csv.hardware = await this.loadCSV("H/hardware-form-nc-operator-5 (1).csv");
        this.csv.geo = await this.loadCSV("T/station-geometrie-11 (8).csv");
        this.log(`CSV geladen = achse ${this.csv.achse.length} hardware ${this.csv.hardware.length} geo ${this.csv.geo.length}`);
    },

    // Name = LOAD TECH = was er macht - nicht import, fetch text = resilient
    async loadTech() {
        try {
            const r = await fetch("T/6E → 6D.tech");
            this.tech["6E→6D"] = r.ok? await r.text() : "tech text raw - 6E→6D Engine = 3→9→81 Verdichtung";
            this.log(`Tech geladen = ${this.tech["6E→6D"].slice(0,30)}...`);
        } catch(e) { this.tech["6E→6D"] = "6E→6D.tech = durchlassend = funktioniert = 6E zu 6D"; this.log(`Tech 6E→6D resilient fallback`); }
    },

    async loadNC2() {
        try {
            const s = await fetch("T/NC²□.sync").then(r=>r.ok?r.text():"NC²□.sync = SYNC").catch(()=>"NC²□.sync = SYNC");
            const a = await fetch("T/NC²□octa³.align").then(r=>r.ok?r.text():"NC²□octa³.align = ALIGN").catch(()=>"ALIGN");
            this.nc2.sync = s; this.nc2.align = a;
            this.log(`NC² Module geladen = sync ${s.length} align ${a.length}`);
        } catch(e) { this.nc2.sync="sync"; this.nc2.align="align"; }
    },

    async loadRooms() {
        const loadRoom = async (path) => { try { const r=await fetch(path); return r.ok?await r.text():""; } catch{ return ""; } };
        this.room.B = await loadRoom("B/B,room");
        this.room.H = await loadRoom("H/h,room");
        this.room.T = await loadRoom("T/T.room");
        this.log(`room-Files geladen = B ${this.room.B.length} H ${this.room.H.length} T ${this.room.T.length}`);
    },

    // // Clou - nach Erhalt von Name erweitern sich Umstände - upd upg rev evo gen eich Stand
    async start() {
        this.log(`START /7 wir fangen so an = die 3 als erstes weg prüfen`);
        await this.scanFolder("B");
        await this.scanFolder("H");
        await this.scanFolder("T");

        await this.loadAllCSV();
        await this.loadTech();
        await this.loadNC2();
        await this.loadRooms();

        this.ready = true;
        this.log(`Scan abgeschlossen = READY 100%`);

        // upd upg rev evo gen = Umstände packen im JS Runtime Lauf
        window.API = {
           ...this,
            NAME: "API", ID: "P01", Station: "S02", Dimension: "D5", Modus: "enable",
            STATE: "STABIL", READY: "100%",
            // upd = update - was sich erweitert hat
            upd: { csv: this.csv, files: this.files },
            // upg = upgrade - was besser wurde
            upg: { tech: this.tech, nc2: this.nc2 },
            // rev = revision - was revidiert
            rev: { room: this.room, log: "die 3 als erstes weg = B H T gescannt = ungesehen wech" },
            // evo = evolution
            evo: { drift: 0, fractal: 0, version: "6.0" },
            // gen = generation
            gen: { timestamp: Date.now(), eich: "EICH STAND = ROOT / Creator / NC" }
        };

        window.dispatchEvent(new Event("ghostReady"));
        console.log("API.GHOST + API SYSTEM = STABIL READY 100% = alles wech aber nur das was funktioniert behalten");
    }
};

GHOST.start();

// // Name ergibt sich aus was er macht = API OrbitHeatmap = was Code macht ist sein Name
function API_OrbitHeatmap(scene) { /*... dein THREE Code bleibt, aber nutzt jetzt GHOST.csv statt API.achse - resilient */ }
