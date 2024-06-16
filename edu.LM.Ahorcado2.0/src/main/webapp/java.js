let palabra;
let adivinar = []
let letra;
let letrasArray = []
let contador = 0
let fechaInicioLetra;
let fechaInicioPartida;
let fechaFinPartida = new Date()
let fechaFinPorLetra;
let tiempoEntreLetras
let partida = true
let arrayDatos = []
let min;
let partidaEmpezada = false


const localStorage1 = window.localStorage;

const dataStored1 = localStorage1.getItem("palabra");
if (dataStored1) {
	palabra = JSON.parse(dataStored1)
	console.log("memoria palabra")
	console.log(palabra)
}
if (document.getElementById("contador1")) {
	document.getElementById("contador1").innerHTML = typeof (palabra)
}





const localStorage2 = window.localStorage;

const dataStored2 = localStorage2.getItem("datos");
if (dataStored2) {
	arrayDatos = JSON.parse(dataStored2)
	console.log("memoria datos")
	console.log(arrayDatos)
}
if (document.getElementById("contador2")) {
	document.getElementById("contador2").innerHTML = typeof (arrayDatos)
}





mostrarPorPantalla()






function pedirPalabra() {


	contador = 0

	letrasArray = []
	if (partidaEmpezada == false) {
		do {
			palabra = prompt("Introduzca la palabra secreta").toLowerCase();
			localStorage.setItem("palabra", JSON.stringify(palabra))
			partidaEmpezada = true
		} while (Number(palabra))



		palabra = palabra.split("");

		for (let i = 0; i < palabra.length; i++) {

			adivinar.push("*")
		}

		arrayDatos.push([adivinar.join(""), contador, 0])
		mostrarPorPantalla()
	}
}

function pedirLetra() {

	if (letrasArray.length == 0) {
		fechaInicioPartida = new Date()
	}


	fechaInicioLetra = new Date()


	if (contador < 5 || min < 5) {

		do {

			letra = prompt("Introduzca una letra").toLowerCase();

		} while (letra.length > 1 || letrasArray.some((i) => letra == i) || contador == 5);
		letrasArray.push(letra)
	}



	else {

		fechaFinPartida = new Date()
		partida = false
		partidaEmpezada = false
		localStorage2.clear()
		localStorage1.clear()

		alert("Has perdido")

	}

	comprobar(letra)
	operacionesFecha()
	mostrarPorPantalla()


}


function comprobar(letra) {

	let letraEncontrada = false


	for (let i in palabra) {

		if (palabra[i] == letra) {


			letraEncontrada = true
			fechaFinPorLetra = new Date()

			adivinar[i] = letra

		}

	}

	if (letraEncontrada == false) {

		alert("Has fallado")
		fechaFinPorLetra = new Date()


		contador++
	}


	if (arrayDatos.length > 4) {

		arrayDatos.splice(0, 1)
	}

	arrayDatos.push([adivinar.slice().join(""), contador, tiempoEntreLetras])
	localStorage.setItem("datos", JSON.stringify(arrayDatos))

	if (!adivinar.some((i) => i == "*")) {

		fechaFinPartida = new Date()
		partidaEmpezada = false
		

		document.getElementById("mostrarPalabra").innerHTML = ("HAS GANADO, LA PALABRA ERA: " + palabra)
		partida = false


		if (contador <= 1) {

			alert("Magnifico")
		}
		else if (contador <= 3 && contador > 1) {

			alert("Bien")
		}
		else if (contador <= 5 && contador > 3) {

			alert("Bien")
		}
		
		localStorage2.clear()
		localStorage1.clear()

	}
	mostrarPorPantalla()
}




function operacionesFecha() {

	let diferenciaLetras = fechaFinPorLetra.getTime() - fechaInicioLetra.getTime()







	let segundos = diferenciaLetras / 1000

	tiempoEntreLetras = Math.floor(segundos) + "," + diferenciaLetras

	mostrarPorPantalla()


}



function mostrarPorPantalla() {

	let escribir = document.getElementById("mostrarTabla");

	escribir.innerHTML = ""

	for (let i in arrayDatos) {

		escribir.innerHTML += ("<tr><td>" + arrayDatos[i][0] + "</td><td>" + arrayDatos[i][1] + "</td><td>" + arrayDatos[i][2] + "</td></tr>")

	}
	document.getElementById("intentos").innerHTML = ("Intentos: " + contador)

}


function mostrarTiempo() {

	let diferencia = fechaFinPartida.getTime() - fechaInicioPartida.getTime()

	min = Math.floor(diferencia / 60000);
	let seg = Math.floor((diferencia % 60000) / 1000);


	/** 
const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
 */

	console.log(min)
	console.log(min)


	document.getElementById("tiempo").innerHTML = ("minutos: " + min + " segundos: " + seg)



}




















