import { HudebniStopa } from "./HudebniStopa.js";
import { PRONAJEM_NASTROJE } from "./data.js";
export class InstrumentalniStopa extends HudebniStopa {
    constructor(id, nazev, interpret, delkaSekund, zakladniCenaLicence, pocetKopii, typNastroje, pronajem) {
        super(id, nazev, interpret, delkaSekund, zakladniCenaLicence, pocetKopii);
        this._typNastroje = typNastroje;
        this._pronajem = pronajem;
    }
    get typNastroje() { return this._typNastroje; }
    get pronajem() { return this._pronajem; }
    vypoctiCenu() {
        var _a;
        const licenceCelkem = this._zakladniCenaLicence * this.pocetKopii;
        // Pokud si uživatel nepronajímá nástroj, příplatek je 0
        const priplatekPronajem = this._pronajem
            ? ((_a = PRONAJEM_NASTROJE[this._typNastroje]) !== null && _a !== void 0 ? _a : 400)
            : 0;
        return licenceCelkem + priplatekPronajem;
    }
    typStopy() {
        return "Instrumentální";
    }
}
//# sourceMappingURL=InstrumentalniStopa.js.map