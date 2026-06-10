import { HudebniStopa } from "./HudebniStopa.js";
export class VokalniStopa extends HudebniStopa {
    constructor(id, nazev, interpret, delkaSekund, zakladniCenaLicence, pocetKopii, pocetVrstev) {
        super(id, nazev, interpret, delkaSekund, zakladniCenaLicence, pocetKopii);
        this.pocetVrstev = pocetVrstev;
    }
    get pocetVrstev() { return this._pocetVrstev; }
    set pocetVrstev(hodnota) {
        if (!Number.isInteger(hodnota) || hodnota < 1 || hodnota > 10) {
            throw new Error("Počet hlasových vrstev musí být 1 až 10.");
        }
        this._pocetVrstev = hodnota;
    }
    vypoctiCenu() {
        const licenceCelkem = this._zakladniCenaLicence * this.pocetKopii;
        const priplatekZvukar = this._pocetVrstev * VokalniStopa.CENA_ZVUKARE_NA_VRSTVU;
        return licenceCelkem + priplatekZvukar;
    }
    typStopy() {
        return "Vokální";
    }
}
VokalniStopa.CENA_ZVUKARE_NA_VRSTVU = 500;
//# sourceMappingURL=VokalniStopa.js.map