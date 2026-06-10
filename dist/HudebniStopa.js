export class HudebniStopa {
    constructor(id, nazev, interpret, delkaSekund, zakladniCenaLicence, pocetKopii) {
        this._id = id;
        this._nazev = nazev;
        this._interpret = interpret;
        this._delkaSekund = delkaSekund;
        this._zakladniCenaLicence = zakladniCenaLicence;
        this.pocetKopii = pocetKopii;
    }
    get id() { return this._id; }
    get nazev() { return this._nazev; }
    get interpret() { return this._interpret; }
    get delkaSekund() { return this._delkaSekund; }
    get pocetKopii() { return this._pocetKopii; }
    set pocetKopii(hodnota) {
        if (!Number.isInteger(hodnota) || hodnota < 1) {
            throw new Error("Počet kopií musí být alespoň 1.");
        }
        this._pocetKopii = hodnota;
    }
    formatujDelku() {
        const min = Math.floor(this._delkaSekund / 60);
        const sek = this._delkaSekund % 60;
        return `${min}:${sek < 10 ? "0" + sek : sek}`;
    }
}
//# sourceMappingURL=HudebniStopa.js.map