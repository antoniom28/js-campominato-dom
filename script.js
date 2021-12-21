let inizia = 0; //non permette di cambiare la difficoltà durante il gioco
let finePartita = 0; //non permette di continuare a cliccare se la partita è finita
const numeroMine = 16;

function difficoltaGioco(scelta) {
    if (inizia == 1)
        return;
    settaDifficolta(scelta);
    const contenitore = document.getElementById('contenitore');
    contenitore.innerHTML = '';
    let contatore = 1;

    //Genera il bootstrap dell'intero tabellone di gioco
    contenitore.innerHTML += `<h2 id="esito-partita"><button id="cheat">VINCI FACILE</button></h2`;
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
    let tentativi = 0;
    let extraLife = 0;
    let numCaselle = document.getElementsByClassName('quadrato');
    document.getElementById('cheat').addEventListener("click", function () {
        for (let i = 0; i <= numCaselle.length - 1; i++) {
            if (numCaselle[i].classList.contains('bomba'))
                numCaselle[i].className += ' mostra-bomba';
        }
    });
    for (let i = 0; i <= numCaselle.length - 1; i++) {
        numCaselle[i].addEventListener("click", function () {
            if (finePartita == 1)
                return;
            if (!this.classList.contains('casella-selezionata')) {
                tentativi++;
                console.log('tentativi1',tentativi,numCaselle.length - numeroMine);
                this.className += ' casella-selezionata';
            }
            if (this.classList.contains('casella-selezionata') && this.classList.contains('extraLife'))
                extraLife = 1;
            else if (this.classList.contains('casella-selezionata') && this.classList.contains('bomba'))
                if (extraLife == 0)
                    haiPerso(numCaselle, tentativi);
                else{
                    extraLife = 0;
                    tentativi--;
                    console.log('tentativi2',tentativi,numCaselle.length - numeroMine);
                }
            if (tentativi == numCaselle.length - numeroMine)
                haiVinto(numCaselle);

        });
    }

    //Piazza le MINE
    piazzaMine(numCaselle);

    return;
}

function haiVinto(numCaselle) {
    document.getElementById('esito-partita').innerHTML = 'INCREDIBILE, HAI VINTO !!';
    mostraBombe(numCaselle);
    finePartita = 1;
}

function haiPerso(numCaselle, tentativi) {
    mostraBombe(numCaselle);
    document.getElementById('esito-partita').innerHTML = 'hai perso con ' + (tentativi - 1) + ' tentativi!';
    finePartita = 1;
    setTimeout(function () {
        document.getElementById('main').innerHTML = `
    <video autoplay="" muted="" loop="" id="myVideo">
        <source src="mp4/bomba.mp4" type="video/mp4">
    </video>`;
    }, 3000);
}

function mostraBombe(numCaselle) {
    for (let i = 0; i <= numCaselle.length - 1; i++) {
        if (numCaselle[i].classList.contains('bomba'))
            numCaselle[i].className += ' casella-selezionata';
    }
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
    while (index < numeroMine) {
        errore = 0;
        let casuale = Math.floor(Math.random() * (numCaselle.length - 1) + 1);
        for (let i = 0; i < giaPiazzate.length; i++)
            if (casuale == giaPiazzate[i]) {
                console.log('TROVATA BOMBA GIA PIAZZATA', casuale);
                errore = 1;
            }
        if (errore == 0) {
            console.log('piazzo bomba su : ', casuale + 1);
            giaPiazzate.push(casuale);
            numCaselle[casuale].className += " bomba";
            index++;
        }
    }

    while (1) {
        console.log(' while ');
        let casuale = Math.floor(Math.random() * (numCaselle.length - 1) + 1);
        errore = 0;
        for (let i = 0; i < giaPiazzate.length; i++)
            if (casuale == giaPiazzate[i])
                errore = 1;
        if (errore == 0) {
            console.log('piazzo extra su : ', casuale + 1);
            numCaselle[casuale].className += " extraLife";
            break;
        }
    }

}