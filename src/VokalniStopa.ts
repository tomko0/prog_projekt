import { HudebniStopa } from "./HudebniStopa.js";

export class VokalniStopa extends HudebniStopa {
  private _pocetVrstev!: number;

  private static readonly CENA_ZVUKARE_NA_VRSTVU: number = 500;

  constructor(
    id: number,
    nazev: string,
    interpret: string,
    delkaSekund: number,
    zakladniCenaLicence: number,
    pocetKopii: number,
    pocetVrstev: number
  ) {
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

  vypoctiCenu(): number {
    const licenceCelkem = this._zakladniCenaLicence * this.pocetKopii;
    const priplatekZvukar = this._pocetVrstev * VokalniStopa.CENA_ZVUKARE_NA_VRSTVU;
    return licenceCelkem + priplatekZvukar;
  }

  typStopy(): string {
    return "Vokální";
  }
}