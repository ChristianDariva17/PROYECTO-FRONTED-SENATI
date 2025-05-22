document.addEventListener('DOMContentLoaded', function() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const botonContainer = document.querySelector('.btn-iniciar-sesion').parentElement;
    
    if (nombreUsuario) {
        botonContainer.innerHTML = `
            <div class="dropdown">
                <button class="btn-usuario dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle"></i> Hola, ${nombreUsuario}
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" href="#" id="miPerfil"><i class="bi bi-person"></i> Mi Perfil</a></li>
                    <li><a class="dropdown-item" href="#" id="misReservas"><i class="bi bi-calendar"></i> Mis Reservas</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="cerrarSesion"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</a></li>
                </ul>
            </div>
        `;
        
        setTimeout(() => {
            const cerrarSesionBtn = document.getElementById('cerrarSesion');
            if (cerrarSesionBtn) {
                cerrarSesionBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); 
                    
                    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
                        localStorage.removeItem('nombreUsuario');
                        
                        alert('Sesión cerrada correctamente');
                        
                        window.location.reload();
                    }
                });
            }
            
            const miPerfilBtn = document.getElementById('miPerfil');
            if (miPerfilBtn) {
                miPerfilBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    alert('Función de perfil en desarrollo');
                });
            }
            
            const misReservasBtn = document.getElementById('misReservas');
            if (misReservasBtn) {
                misReservasBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    alert('Función de reservas en desarrollo');
                });
            }
        }, 100); 
    }
    
    const justLoggedIn = localStorage.getItem('justLoggedIn');
    if (justLoggedIn === 'true' && nombreUsuario) {
        const bienvenidaModal = document.getElementById('bienvenidaModal');
        const bienvenidaMensaje = document.getElementById('bienvenidaMensaje');
        
        if (bienvenidaModal && bienvenidaMensaje) {
            bienvenidaMensaje.innerHTML = `¡Hola ${nombreUsuario}! Bienvenido de vuelta a MIKHUY.`;
            
            const modal = new bootstrap.Modal(bienvenidaModal);
            modal.show();
            
            localStorage.removeItem('justLoggedIn');
        }
    }
});