// Suponiendo que tienes un arreglo de calificaciones
const calificaciones = [4, 5, 3, 4, 5, 4, 3, 5, 4, 4];

// Calcula el promedio de calificaciones
const promedio = calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;

// Actualiza el texto y las estrellas
const ratingText = document.querySelector('.rating-text');
const ratingStars = document.querySelector('.rating');

ratingText.textContent = `${promedio.toFixed(1)}/5`;
ratingStars.innerHTML = '';

for (let i = 0; i < 5; i++) {
  const star = document.createElement('i');
  star.classList.add('fas', 'fa-star');
  if (i < promedio) {
    star.style.color = '#ffd700';
  } else {
    star.style.color = '#ccc';
  }
  ratingStars.appendChild(star);
}

// Agrega un evento de cambio al filtro
const filtro = document.getElementById('categoria');
filtro.addEventListener('change', (e) => {
  // Obtén el valor seleccionado en el filtro
  const valor = e.target.value;

  // Filtra los resultados según el valor seleccionado
  if (valor === 'todos') {
    // Mostrar todos los resultados
    document.getElementById('resultados').innerHTML = '';
    // Agrega código para mostrar todos los resultados
  } else if (valor === 'restaurantes') {
    // Mostrar solo los restaurantes
    document.getElementById('resultados').innerHTML = '';
    // Agrega código para mostrar solo los restaurantes
  } else if (valor === 'cafeterias') {
    // Mostrar solo las cafeterías
    document.getElementById('resultados').innerHTML = '';
    // Agrega código para mostrar solo las cafeterías
  } else if (valor === 'bodegas') {
    // Mostrar solo las bodegas
    document.getElementById('resultados').innerHTML = '';
    // Agrega código para mostrar solo las bodegas
  }
});

// HORARARIO

document.addEventListener('DOMContentLoaded', function() {
  // Obtenemos el elemento HTML que contiene el texto
  const estadoElement = document.getElementById('estado');

  // Definimos el horario de apertura y cierre
  const horarioApertura = '08:00'; // 8:00 am
  const horarioCierre = '18:00'; // 6:00 pm

  // Función que actualiza el texto y el color según la hora actual
  function actualizarEstado() {
    const horaActual = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    if (horaActual >= horarioApertura && horaActual < horarioCierre) {
      estadoElement.textContent = 'Abierto ahora';
      estadoElement.style.color = 'green';
    } else {
      estadoElement.textContent = 'Cerrado ahora';
      estadoElement.style.color = 'red';
    }
  }

  // Actualizamos el estado cada minuto
  setInterval(actualizarEstado, 60000); // 60000 milisegundos = 1 minuto

  // Actualizamos el estado inicialmente
  actualizarEstado();
});