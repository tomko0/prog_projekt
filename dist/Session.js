import { DPH } from "./data.js";
export class Session {
    constructor() {
        this._stopy = [];
    }
    pridejStopu(stopa) {
        this._stopy.push(stopa);
    }
    odeberStopu(id) {
        this._stopy = this._stopy.filter(s => s.id !== id);
    }
    celkovaCenaBezDPH() {
        return this._stopy.reduce((soucet, stopa) => soucet + stopa.vypoctiCenu(), 0);
    }
    celkovaCenaSDPH() {
        return this.celkovaCenaBezDPH() * DPH;
    }
    get stopy() {
        return [...this._stopy]; // vrátíme kopii, ne originál
    }
    get pocetStop() {
        return this._stopy.length;
    }
}
//# sourceMappingURL=Session.js.map