document.addEventListener('DOMContentLoaded', function() {
  const nombre = localStorage.getItem('nombreUsuario');
  if (nombre) {
    document.getElementById('bienvenidaMensaje').textContent = `Bienvenido, ${nombre}!`;
    const bienvenidaModal = new bootstrap.Modal(document.getElementById('bienvenidaModal'));
    bienvenidaModal.show();
    localStorage.removeItem('nombreUsuario');
  }
});