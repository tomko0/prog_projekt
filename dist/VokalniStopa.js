import { HudebniStopa } from "./HudebniStopa.js";
// Potomek č. 1 – vokální stopa.
// Přidává příplatek za studiového zvukaře (per vrstva overdubů).
export class VokalniStopa extends HudebniStopa {
    constructor(id, nazev, interpret, delkaSekund, zakladniCenaLicence, pocetKopii, pocetVrstev) {
        // super() zavolá konstruktor rodičovské třídy
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
    // Implementace abstraktní metody z rodiče
    vypoctiCenu() {
        const licenceCelkem = this._zakladniCenaLicence * this.pocetKopii;
        const priplatekZvukar = this._pocetVrstev * VokalniStopa.CENA_ZVUKARE_NA_VRSTVU;
        return licenceCelkem + priplatekZvukar;
    }
    typStopy() {
        return "Vokální";
    }
}
// Statická konstanta – patří třídě, ne instanci
VokalniStopa.CENA_ZVUKARE_NA_VRSTVU = 500; // Kč
//# sourceMappingURL=VokalniStopa.js.map