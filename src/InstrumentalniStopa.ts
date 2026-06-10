import { HudebniStopa } from "./HudebniStopa.js";
import { PRONAJEM_NASTROJE } from "./data.js";

export class InstrumentalniStopa extends HudebniStopa {
  private _typNastroje: string;
  private _pronajem: boolean;

  constructor(
    id: number,
    nazev: string,
    interpret: string,
    delkaSekund: number,
    zakladniCenaLicence: number,
    pocetKopii: number,
    typNastroje: string,
    pronajem: boolean
  ) {
    super(id, nazev, interpret, delkaSekund, zakladniCenaLicence, pocetKopii);
    this._typNastroje = typNastroje;
    this._pronajem = pronajem;
  }

  get typNastroje(): string { return this._typNastroje; }
  get pronajem(): boolean { return this._pronajem; }

  vypoctiCenu(): number {
    const licenceCelkem = this._zakladniCenaLicence * this.pocetKopii;
    const priplatekPronajem = this._pronajem
      ? (PRONAJEM_NASTROJE[this._typNastroje] ?? 400)
      : 0;
    return licenceCelkem + priplatekPronajem;
  }

  typStopy(): string {
    return "Instrumentální";
  }
}
