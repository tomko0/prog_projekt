import { katalog, PRONAJEM_NASTROJE } from "./data.js";
import { VokalniStopa } from "./VokalniStopa.js";
import { InstrumentalniStopa } from "./InstrumentalniStopa.js";
import { HudebniStopa } from "./HudebniStopa.js";
import { Session } from "./Session.js";

const stopy: HudebniStopa[] = [
  new VokalniStopa(
    katalog[0].id,
    katalog[0].nazev,
    katalog[0].interpret,
    katalog[0].delkaSekund,
    katalog[0].zakladniCenaLicence,
    2,
    3 
  ),
  new VokalniStopa(
    katalog[1].id,
    katalog[1].nazev,
    katalog[1].interpret,
    katalog[1].delkaSekund,
    katalog[1].zakladniCenaLicence,
    1,
    1
  ),

  new InstrumentalniStopa(
    katalog[2].id,
    katalog[2].nazev,
    katalog[2].interpret,
    katalog[2].delkaSekund,
    katalog[2].zakladniCenaLicence,
    2,
    "Bicí",
    true
  ),

  new InstrumentalniStopa(
    katalog[3].id,
    katalog[3].nazev,
    katalog[3].interpret,
    katalog[3].delkaSekund,
    katalog[3].zakladniCenaLicence,
    1,
    "Kytara",
    false
  ),
];

console.log("=== VÝPIS VŠECH STOP ===");
console.log("────────────────────────────────────────");

stopy.forEach((stopa, index) => {
  console.log(`Stopa č. ${index + 1}`);
  console.log(`  Název:     ${stopa.nazev}`);
  console.log(`  Interpret: ${stopa.interpret}`);
  console.log(`  Typ:       ${stopa.typStopy()}`);
  console.log(`  Délka:     ${stopa.formatujDelku()}`);
  console.log(`  Kopií:     ${stopa.pocetKopii}`);
  console.log(`  Cena:      ${stopa.vypoctiCenu()} Kč`);
  console.log("────────────────────────────────────────");
});

const session = new Session();
stopy.forEach(s => session.pridejStopu(s));

console.log("=== SOUHRN SESSION ===");
console.log(`  Počet stop:   ${session.pocetStop}`);
console.log(`  Bez DPH:      ${session.celkovaCenaBezDPH()} Kč`);
console.log(`  S DPH (21 %): ${Math.round(session.celkovaCenaSDPH())} Kč`);

console.log("=== TEST VALIDACE ===");
try {
  new VokalniStopa(99, "Test", "Test", 100, 500, 0, 1);
} catch (e: any) {
  console.log(`  Chyba správně zachycena: ${e.message}`);
}

try {
  new VokalniStopa(99, "Test", "Test", 100, 500, 1, 15);
} catch (e: any) {
  console.log(`  Chyba správně zachycena: ${e.message}`);
}