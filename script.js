let inizia = 0; //non permette di cambiare la difficoltà durante il gioco
let finePartita = 0; //non permette di continuare a cliccare se la partita è finita
let tentativi = 0;
const numeroMine = 16;
function difficoltaGioco(scelta) {
    if (inizia == 0) {
        settaDifficolta(scelta);
        const contenitore = document.getElementById('contenitore');
        contenitore.innerHTML = '';
        let contatore = 1;

        //Genera il bootstrap dell'intero tabellone di gioco
        contenitore.innerHTML += `<h2 id="esito-partita"></h2`;
        for (let i = 1; i <= scelta; i++) {
            contenitore.innerHTML += `<div class="row g-0" id="row${i}">`;
            const row = document.getElementById('row' + i);
            for (let j = 1; j <= scelta; j++) {
                let elemento = `<div class="quadrato">` + contatore++ + '</div>';
                row.innerHTML += elemento;
            }
        }
        inizia = 1;
        //Aggiunge l'evento click a tutte le caselle
        let numCaselle = document.getElementsByClassName('quadrato');
        for (let i = 0; i <= numCaselle.length - 1; i++) {
            numCaselle[i].addEventListener("click", function () {
                if (finePartita == 0) {
                    if (!this.classList.contains('casella-selezionata')) {
                        tentativi++;
                        if (tentativi == contatore - 1 - numeroMine)
                            haiVinto();
                        this.className += ' casella-selezionata';
                    }
                    if (this.classList.contains('casella-selezionata') && this.classList.contains('bomba'))
                        haiPerso(numCaselle, tentativi);
                }
            });
        }

        //Piazza le MINE
        piazzaMine(numCaselle);
    }
    return;
}

function haiVinto() {
    document.getElementById('esito-partita').innerHTML = 'INCREDIBILE, HAI VINTO !!';
    finePartita = 1;
}

function haiPerso(mostraCaselle, tentativi) {
    for (let i = 0; i <= mostraCaselle.length - 1; i++) {
        if (mostraCaselle[i].classList.contains('bomba'))
            mostraCaselle[i].className += ' casella-selezionata';
    }
    document.getElementById('esito-partita').innerHTML = 'hai perso con ' + tentativi + ' tentativi!';
    finePartita = 1;
    setTimeout(function () {
        document.getElementById('main').innerHTML = `
    <video autoplay="" muted="" loop="" id="myVideo">
        <source src="mp4/bomba.mp4" type="video/mp4">
    </video>`;
    }, 3000);
}

//Evidenza la difficoltà scelta
function settaDifficolta(scelta) {
    switch (scelta) {
        case 12:
            document.getElementById('difficile').className += 'scelto';
            break;
        case 10:
            document.getElementById('media').className += 'scelto';
            break;
        case 8:
            document.getElementById('facile').className += 'scelto';
            break;
    }
}

function piazzaMine(numCaselle) {
    let index = 0;
    let giaPiazzate = []; //array che tiene conto delle caselle-bomba inserite
    let errore = 0; //Entrambi evitano di mettere le bombe su caselle dove sono già presenti
    console.log('numCaselle.length : ', numCaselle.length);
    while (index < numeroMine) {
        errore = 0;
        let casuale = Math.floor(Math.random() * (numCaselle.length - 1) + 1);
        for (let i = 0; i < giaPiazzate.length; i++)
            if (casuale == giaPiazzate[i]) {
                console.log('TROVATA BOMBA GIA PIAZZATA', casuale);
                errore = 1;
            }
        if (errore == 0) {
            console.log('piazzo bomba su : ', casuale);
            giaPiazzate.push(casuale);
            numCaselle[casuale].className += " bomba";
            index++;
        }
    }
}