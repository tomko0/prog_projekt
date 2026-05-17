import { HudebniStopa } from "./HudebniStopa.js";

// Potomek č. 1 – vokální stopa.
// Přidává příplatek za studiového zvukaře (per vrstva overdubů).

export class VokalniStopa extends HudebniStopa {
  private _pocetVrstev!: number;

  // Statická konstanta – patří třídě, ne instanci
  private static readonly CENA_ZVUKARE_NA_VRSTVU: number = 500; // Kč

  constructor(
    id: number,
    nazev: string,
    interpret: string,
    delkaSekund: number,
    zakladniCenaLicence: number,
    pocetKopii: number,
    pocetVrstev: number
  ) {
    // super() zavolá konstruktor rodičovské třídy
    super(id, nazev, interpret, delkaSekund, zakladniCenaLicence, pocetKopii);
    this.pocetVrstev = pocetVrstev;
  }

  get pocetVrstev(): number { return this._pocetVrstev; }

  set pocetVrstev(hodnota: number) {
    if (!Number.isInteger(hodnota) || hodnota < 1 || hodnota > 10) {
      throw new Error("Počet hlasových vrstev musí být 1 až 10.");
    }
    this._pocetVrstev = hodnota;
  }

  // Implementace abstraktní metody z rodiče
  vypoctiCenu(): number {
    const licenceCelkem = this._zakladniCenaLicence * this.pocetKopii;
    const priplatekZvukar = this._pocetVrstev * VokalniStopa.CENA_ZVUKARE_NA_VRSTVU;
    return licenceCelkem + priplatekZvukar;
  }

  typStopy(): string {
    return "Vokální";
  }
}