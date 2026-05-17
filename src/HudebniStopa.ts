export abstract class HudebniStopa {
  // protected = přístupné v této třídě i v potomcích, ale ne zvenčí
  protected _id: number;
  protected _nazev: string;
  protected _interpret: string;
  protected _delkaSekund: number;
  protected _zakladniCenaLicence: number;
  private _pocetKopii!: number; // private = pouze tato třída

  constructor(
    id: number,
    nazev: string,
    interpret: string,
    delkaSekund: number,
    zakladniCenaLicence: number,
    pocetKopii: number
  ) {
    this._id = id;
    this._nazev = nazev;
    this._interpret = interpret;
    this._delkaSekund = delkaSekund;
    this._zakladniCenaLicence = zakladniCenaLicence;
    this.pocetKopii = pocetKopii; // validace
  }

  get id(): number { return this._id; }
  get nazev(): string { return this._nazev; }
  get interpret(): string { return this._interpret; }
  get delkaSekund(): number { return this._delkaSekund; }
  get pocetKopii(): number { return this._pocetKopii; }

  // Setter s validací 
  set pocetKopii(hodnota: number) {
    if (!Number.isInteger(hodnota) || hodnota < 1) {
      throw new Error("Počet kopií musí být alespoň 1.");
    }
    this._pocetKopii = hodnota;
  }

  // Pomocná metoda – formátuje sekundy na MM:SS
  formatujDelku(): string {
    const min = Math.floor(this._delkaSekund / 60);
    const sek = this._delkaSekund % 60;
    return `${min}:${sek < 10 ? "0" + sek : sek}`;
  }

  // Abstraktní metody – každý potomek si je musí implementovat sám.
  abstract vypoctiCenu(): number;
  abstract typStopy(): string;
}