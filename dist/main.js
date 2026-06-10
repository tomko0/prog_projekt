import { PRONAJEM_NASTROJE } from "./data.js";
import { VokalniStopa } from "./VokalniStopa.js";
import { InstrumentalniStopa } from "./InstrumentalniStopa.js";
import { Session } from "./Session.js";
const session = new Session();
function inicializujSelect() {
    const nastrojSelect = document.getElementById("typ-nastroje");
    Object.keys(PRONAJEM_NASTROJE).forEach(nastroj => {
        const option = document.createElement("option");
        option.value = nastroj;
        option.textContent = `${nastroj} (${PRONAJEM_NASTROJE[nastroj]} Kč)`;
        nastrojSelect.appendChild(option);
    });
}
function prepniTyp() {
    const typ = document.getElementById("typ-stopy").value;
    document.getElementById("pole-vokal").style.display = typ === "vokal" ? "block" : "none";
    document.getElementById("pole-instr").style.display = typ === "instrumental" ? "block" : "none";
}
function pridejStopu() {
    const nazev = document.getElementById("nazev").value.trim();
    const interpret = document.getElementById("interpret").value.trim();
    const minuty = Number(document.getElementById("minuty").value);
    const sekundy = Number(document.getElementById("sekundy").value);
    const zakladniCena = Number(document.getElementById("zakladni-cena").value);
    const pocetKopii = Number(document.getElementById("pocet-kopii").value);
    const typ = document.getElementById("typ-stopy").value;
    const delkaSekund = minuty * 60 + sekundy;
    if (nazev === "") {
        alert("Chyba: Název skladby nesmí být prázdný.");
        return;
    }
    if (interpret === "") {
        alert("Chyba: Jméno interpreta nesmí být prázdné.");
        return;
    }
    if (delkaSekund <= 0) {
        alert("Chyba: Délka skladby musí být větší než 0.");
        return;
    }
    if (zakladniCena <= 0) {
        alert("Chyba: Cena licence musí být větší než 0.");
        return;
    }
    try {
        if (typ === "vokal") {
            const vrstvy = Number(document.getElementById("pocet-vrstev").value);
            const stopa = new VokalniStopa(Date.now(), nazev, interpret, delkaSekund, zakladniCena, pocetKopii, vrstvy);
            session.pridejStopu(stopa);
        }
        else {
            const nastroj = document.getElementById("typ-nastroje").value;
            const pronajem = document.getElementById("pronajem").checked;
            const stopa = new InstrumentalniStopa(Date.now(), nazev, interpret, delkaSekund, zakladniCena, pocetKopii, nastroj, pronajem);
            session.pridejStopu(stopa);
        }
        prekresliTabulku();
        vymazFormular();
    }
    catch (e) {
        alert("Chyba: " + e.message);
    }
}
function vymazFormular() {
    document.getElementById("nazev").value = "";
    document.getElementById("interpret").value = "";
    document.getElementById("minuty").value = "3";
    document.getElementById("sekundy").value = "30";
    document.getElementById("zakladni-cena").value = "1000";
    document.getElementById("pocet-kopii").value = "1";
    document.getElementById("pocet-vrstev").value = "1";
    document.getElementById("pronajem").checked = false;
}
function prekresliTabulku() {
    const tbody = document.getElementById("tabulka-body");
    tbody.innerHTML = "";
    if (session.pocetStop === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="tabulka-prazdna">Zatím nebyla přidána žádná stopa.</td></tr>`;
        aktualizujSouhrn();
        return;
    }
    session.stopy.forEach(stopa => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${stopa.nazev}</td>
      <td>${stopa.interpret}</td>
      <td>${stopa.typStopy()}</td>
      <td>${stopa.formatujDelku()}</td>
      <td>${stopa.pocetKopii}</td>
      <td>${stopa.vypoctiCenu().toLocaleString("cs-CZ")} Kč</td>
      <td><button onclick="odeber(${stopa.id})">✕</button></td>
    `;
        tbody.appendChild(tr);
    });
    aktualizujSouhrn();
}
function aktualizujSouhrn() {
    document.getElementById("cena-bez-dph").textContent =
        session.celkovaCenaBezDPH().toLocaleString("cs-CZ") + " Kč";
    document.getElementById("cena-s-dph").textContent =
        Math.round(session.celkovaCenaSDPH()).toLocaleString("cs-CZ") + " Kč";
}
window.odeber = (id) => {
    session.odeberStopu(id);
    prekresliTabulku();
};
document.addEventListener("DOMContentLoaded", () => {
    inicializujSelect();
    prepniTyp();
    document.getElementById("btn-pridat").addEventListener("click", pridejStopu);
    document.getElementById("typ-stopy").addEventListener("change", prepniTyp);
});
//# sourceMappingURL=main.js.map