import { HudebniStopa } from "./HudebniStopa.js";
import { DPH } from "./data.js";

export class Session {
  private _stopy: HudebniStopa[] = [];

  pridejStopu(stopa: HudebniStopa): void {
    this._stopy.push(stopa);
  }

  odeberStopu(id: number): void {
    this._stopy = this._stopy.filter(s => s.id !== id);
  }

  celkovaCenaBezDPH(): number {
    return this._stopy.reduce((soucet, stopa) => soucet + stopa.vypoctiCenu(), 0);
  }

  celkovaCenaSDPH(): number {
    return this.celkovaCenaBezDPH() * DPH;
  }

  get stopy(): HudebniStopa[] {
    return [...this._stopy]; // vrátíme kopii, ne originál
  }

  get pocetStop(): number {
    return this._stopy.length;
  }
}
