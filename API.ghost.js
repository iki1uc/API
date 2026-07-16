// ------------------------------------------------------
// API GHOST SCAN ENGINE
// ------------------------------------------------------

window.GHOST = {
    files: {},
    csv: {},
    tech: {},
    nc2: {},
    room: {},
    ready: false,

    async scanFolder(folder) {
        const list = await fetch(folder + "/index.json").then(r => r.json());
        this.files[folder] = list;
        return list;
    },

    async loadCSV(path) {
        const response = await fetch(path);
        const text = await response.text();
        const lines = text.trim().split("\n");
        const headers = lines.shift().split(",");

        return lines.map(line => {
            const values = line.split(",");
            const obj = {};
            headers.forEach((h, i) => obj[h.trim()] = values[i].trim());
            return obj;
        });
    },

    async loadAllCSV() {
        this.csv.achse = await this.loadCSV("B/achse-bedeutung-15.csv");
        this.csv.hardware = await this.loadCSV("H/hardware-form-nc-operator-5 (1).csv");
        this.csv.geo = await this.loadCSV("T/station-geometrie-11 (8).csv");
        console.log("GHOST: CSV geladen");
    },

    async loadTech() {
        this.tech["6E→6D"] = await import("./T/6E → 6D.tech");
        console.log("GHOST: Tech geladen");
    },

    async loadNC2() {
        this.nc2.sync = await import("./T/NC²□.sync");
        this.nc2.align = await import("./T/NC²□octa³.align");
        console.log("GHOST: NC² Module geladen");
    },

    async loadRooms() {
        this.room.B = await fetch("B/B,room").then(r => r.text());
        this.room.H = await fetch("H/h,room").then(r => r.text());
        this.room.T = await fetch("T/T.room").then(r => r.text());
        console.log("GHOST: room‑Files geladen");
    },

    async start() {
        await this.loadAllCSV();
        await this.loadTech();
        await this.loadNC2();
        await this.loadRooms();

        this.ready = true;
        console.log("GHOST: Scan abgeschlossen");
        window.dispatchEvent(new Event("ghostReady"));
    }
};

GHOST.start();
