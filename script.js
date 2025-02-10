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
        .replace(/Ñ/g, "N") // Convertir Ñ a N
        .replace(/ñ/g, "n") // Convertir ñ a n
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

const countdownDate = new Date('Jun 28, 2025 15:00:00').getTime();

let interval = setInterval(() => {
    const now = new Date().getTime();
    let distance = countdownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Agregar ceros adelante si es menor a 10
    $days.textContent = days.toString().padStart(2, "0");
    $hours.textContent = hours.toString().padStart(2, "0");
    $minutes.textContent = minutes.toString().padStart(2, "0");
    $seconds.textContent = seconds.toString().padStart(2, "0");

    if (distance < 0) {
        clearInterval(interval);
        $days.textContent = "00";
        $hours.textContent = "00";
        $minutes.textContent = "00";
        $seconds.textContent = "00";
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

