// ------------------------------------------------------
// API SYSTEM CORE
// ------------------------------------------------------

window.API = {
    achse: [],
    hardware: [],
    geo: [],
    sync: null,
    align: null,
    tech: null,

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

    async loadAll() {
        this.achse = await this.loadCSV("B/achse-bedeutung-15.csv");
        this.hardware = await this.loadCSV("H/hardware-form-nc-operator-5 (1).csv");
        this.geo = await this.loadCSV("T/station-geometrie-11 (8).csv");

        this.sync = await import("./T/NC²□.sync");
        this.align = await import("./T/NC²□octa³.align");
        this.tech = await import("./T/6E → 6D.tech");

        console.log("API: Alle Module geladen");
    }
};

API.loadAll();
