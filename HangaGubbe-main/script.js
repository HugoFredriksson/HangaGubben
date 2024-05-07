// JavaScript

// Globala variabler

// Array med ett antal ord, där man sedan väljer ett slumpmässigt.
let wordList = [];

// Det ord som valts slumpmässigt och som användaren ska gissa på.
let selectedWord;

// Array med referenser till de span-taggar som utgör rutor för bokstäverna i ordet.
let letterBoxes = [];

// Referens till img-elementet med bilden för galgen och gubben.
let hangmanImg;

//Nummer för aktuell bild (0-6), för den bildfil som visas (så man sedan kan veta vilket som blir nästa bild).
let hangmanImgNr = 0;

//Referens till div-elementet för meddelanden.
let msgElem;

let letterButtons;
let startGameBtn;
let manHanged;
let letter;

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {

	// Skapar onclick funktion till alla bokstavsknapparna.
	letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
	for (let i = 0; i < letterButtons.length; i++) {
		letterButtons[i].addEventListener("click", event => {
			letter = letterButtons[i].value; //FEL MEN BLIR UNDEFINED IFALL JAG ANVÄNDER this.value
			guessLetter();
			letterButtons[i].disabled = true;
		})


		letterButtons[i].style.display = "none";
	}


	// Skapar onclick funktion till startaspel knappen
	startGameBtn = document.getElementById("startGameBtn");
	startGameBtn.addEventListener("click", event => {
		startGame();
	})

	hangmanImg = document.getElementById("hangman");
	msgElem = document.getElementById("message");


	wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANTÖRA", "JULTOMTE",
		"SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA",
		"KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD"];
	changeButtonActivation(true);
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad


// Initiera ett nytt spel. Välj ord, visa bokstavsrutorm
// visa första bilden (tom bild) och sätt bildnummer till 0.
function startGame() {
	// Anropar randomWord funktionen för att slumpa ett ord som användaren ska gissa på.
	randomWord();
	msgElem.innerHTML = "";

	if (letterBoxes.length > 0) {
		let letterBoxElement = document.getElementById("letterBoxes");

		while (letterBoxElement.firstChild) {
			console.log("Trying to remove child");
			letterBoxElement.removeChild(letterBoxElement.lastChild);
		}
	}
	//Tar bort textrutor från tidigare spel.

	showLetterBoxes();
	// Anropar showLetterBoxes så att användaren kan gissa på bokstäver.
	hangmanImgNr = 0;
	hangmanImg.src = "pics/h" + hangmanImgNr + ".png";

	changeButtonActivation(false);
} // End startGame


function randomWord() {
	// Sparar ett slumpmässigt tal som blir indexet för ett ord i wordList
	let wordIndex = Math.floor(Math.random() * wordList.length);
	// Sparar det slumpmässiga ordet som användaren ska gissa på
	let oldWord = "";


	selectedWord = wordList[wordIndex];

	while (oldWord === selectedWord) {
		console.log("Det nya ordet var samma som det gamla! Slumpar nytt...");
		let wordIndex = Math.floor(Math.random() * wordList.length);
		selectedWord = wordList[wordIndex];
	}
	//Ser till att samma ord inte slumpas flera gånger i rad.

	oldWord = selectedWord;
	console.log(selectedWord);
}

function showLetterBoxes() {
	console.log("showLetterBoxes")
	console.log("selectedWord in shoeLetterBoxes: " + selectedWord);
	let newCode = "";
	let i;

	for (const charNr in selectedWord) {
		newCode += "<span>&nbsp;</span>";
		let selectedWordChar = selectedWord[charNr];
		// Skriver ut alla bokstäver av det slumpade ordet.
		console.log("char " + charNr + ": " + selectedWordChar);
	}
	console.log(newCode);

	letterBoxes = document.getElementsByTagName("span");
	console.log(letterBoxes);
	//Lägger till tomma textrutor för det slumpade ordet
	document.getElementById("letterBoxes").insertAdjacentHTML("beforeEnd", newCode);


	// Gör Bokstavsknapparna synliga
	for (i = 0; i < letterButtons.length; i++) {
		letterButtons[i].style.display = "";
	}
}


function guessLetter() {

	console.log("guess letter!");
	let correctLettersCount = 0;
	let letterFound = false;

	console.log(letter);
	let i = 0;

	for (const charAt in selectedWord) {
		if (selectedWord[charAt] === letter) {
			console.log("bokstaven finns!");

			letterBoxes[i].innerHTML = letter;

			letterFound = true;

		}

		if (letterBoxes[i].innerHTML != "&nbsp;") {
			correctLettersCount++;
			console.log("antal korrekt gissningar: " + correctLettersCount);
		}
		i++;
	}

	if (letterFound === false) {
		console.log("bokstaven finns inte!")
		hangmanImgNr++;
		hangmanImg.src = "pics/h" + hangmanImgNr + ".png";

		if (hangmanImgNr === 6) {
			endGame(true);
		}

	} else if (correctLettersCount === selectedWord.length) {
		endGame(false);
	}
	//Uppdaterar bilden på hänggubben om spelaren gissade fel, 
	//annars om spelaren gissade rätt kollas antalet rätta bokstäver med antal bokstäver i det slumpade ordet.
}

function endGame(manHanged) {
	if (manHanged) {
		msgElem.innerHTML = "Tyvärr du lyckades inte gissa ordet! Ordet var: " + selectedWord;
	} else {
		msgElem.innerHTML = "Grattis du gissade rätt!";
	}
	changeButtonActivation(true);
}
//Avslutar spelet. Om manhanged är true förlorade spelaren och tvärt om.

function changeButtonActivation(status) {
	if (status) {
		startGameBtn.disabled = false;
		for (i = 0; letterButtons.length > i; i++) {
			letterButtons[i].disabled = true;
		}
	} else {
		startGameBtn.disabled = true;
		for (i = 0; letterButtons.length > i; i++) {
			letterButtons[i].disabled = false;
		}
	}
}
//Ändrar knapparnas klickbarhet.