function abrirModal() {
    document.getElementById("modal").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

async function verificarInvitado() {
    let nombre = document.getElementById("nombre").value;

    if (!nombre) {
        alert("Por favor, ingresá tu nombre completo.");
        return;
    }

    // 🔥 1️⃣ Formatear el nombre
    nombre = nombre
        .trim()
        .toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
        .replace(/\.+$/, ""); // Eliminar punto final

    try {
        const response = await fetch(`https://script.google.com/macros/s/AKfycbxikXweWD9B7NGdXnWBYjYPjiTDjrAYMhZ2tdGd4BVhDvkx-Lsbfm03SJi88aHfJglBVQ/exec?nombre=${encodeURIComponent(nombre)}`);
        const data = await response.json();
        console.log(data);

        if (data.existe) {
            document.getElementById("resultado").innerHTML = `Hola, ${data.nombre}. Tenés reservados ${data.campos} espacio(s).`;
            document.getElementById("listaAcompanantes").innerText = data.cupos || "No hay acompañantes registrados.";
            document.getElementById("confirmacionAsistencia").style.display = "block";
            //document.getElementById("camposConfirmados").setAttribute("max", data.campos);

            // ✅ Guardar en localStorage que la persona verificó su invitación
            localStorage.setItem("invitadoVerificado", "true");
        } else {
            document.getElementById("resultado").innerHTML = "No encontramos tu nombre en la lista.";
            //document.getElementById("confirmacionAsistencia").style.display = "none";
        }
    } catch (error) {
        alert("Error al verificar los datos. Por favor, intenta de nuevo más tarde.");
    }
}


//Funcionalidad contador
const $days = document.getElementById('days'),
$hours = document.getElementById('hours'),
$minutes = document.getElementById('minutes'),
$seconds = document.getElementById('seconds');

//Fecha futuro
const countdownDate = new Date('Jun 28, 2025 15:00:00').getTime();
let interval = setInterval(function(){
    //Obtener fecha actual y milisegundos
    const now = new Date().getTime();
  
    //Obtener distancias entre fechas
    let distance = countdownDate - now;
  
    //Calculos a dias/horas/minutos/segundos
    let days = Math.floor(distance / (1000*60*60*24));
    let hours = Math.floor(distance % (1000*60*60*24) / (1000*60*60));
    let minutes = Math.floor(distance % (1000*60*60) / (1000*60));
    let seconds = Math.floor(distance % (1000*60) / (1000));
  
    //Escribir resultados
    $days.innerHTML = days;
    $hours.innerHTML = hours;
    $minutes.innerHTML = minutes;
    $seconds.innerHTML = ('0' + seconds).slice(-2);
  
    //Cuando llegue a 0 
    if(distance < 0){
        clearInterval(interval);
        $days.innerHTML = ('00');
        $hours.innerHTML = ('00');
        $minutes.innerHTML = ('00');
        $seconds.innerHTML = ('00');
    }
}, 1000);

//Carrusel
let indiceActual = 0;

function moverCarrusel(direccion) {
    const contenedor = document.querySelector(".carrusel-contenedor");
    const items = document.querySelectorAll(".carrusel-item");

    indiceActual += direccion;

    if (indiceActual >= items.length) {
        indiceActual = 0;
    } else if (indiceActual < 0) {
        indiceActual = items.length - 1;
    }

    const desplazamiento = -indiceActual * 100; 
    contenedor.style.transform = `translateX(${desplazamiento}%)`;
}

