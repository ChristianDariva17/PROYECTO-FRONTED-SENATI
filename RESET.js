document.addEventListener('DOMContentLoaded', function() {
    console.log('Script reset.js cargado');
    
    const resetForm = document.getElementById('resetForm');
    const messageContainer = document.getElementById('messageContainer');
    const resetBtn = document.getElementById('resetBtn');
    const API_URL = "http://localhost:3000/api";
    
    console.log('Elementos encontrados:', {
        resetForm: !!resetForm,
        messageContainer: !!messageContainer,
        resetBtn: !!resetBtn
    });
    
    // Obtener el token de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    console.log('🔑 Token obtenido:', token);
    
    // Verificar si hay un token válido
    if (!token) {
        console.log('No hay token válido');
        showMessage('Token inválido o faltante. Por favor, solicita un nuevo enlace de restablecimiento.', 'error');
        resetForm.style.display = 'none';
        return;
    }
    
    // Función para mostrar mensajes
    function showMessage(message, type) {
        console.log(`Mostrando mensaje: ${message} (tipo: ${type})`);
        if (messageContainer) {
            messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
            console.log('Mensaje agregado al DOM');
        } else {
            console.log('messageContainer no encontrado');
        }
    }
    
    // Función para validar contraseñas
    function validatePasswords() {
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        console.log('Validando contraseñas:', {
            newPasswordLength: newPassword.length,
            passwordsMatch: newPassword === confirmPassword
        });
        
        if (newPassword.length < 6) {
            showMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
            return false;
        }
        
        if (newPassword !== confirmPassword) {
            showMessage('Las contraseñas no coinciden.', 'error');
            return false;
        }
        
        return true;
    }
    
    if (resetForm) {
        resetForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Formulario enviado');
            
            messageContainer.innerHTML = '';
            
            if (!validatePasswords()) {
                console.log('❌ Validación de contraseñas falló');
                return;
            }
            
            const newPassword = document.getElementById('newPassword').value;
            console.log('Nueva contraseña lista para enviar');
            
            resetBtn.disabled = true;
            resetBtn.textContent = 'Procesando...';
            
            try {
                console.log('Enviando petición a:', `${API_URL}/reset-password`);
                
                const response = await fetch(`${API_URL}/reset-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                        newPassword: newPassword
                    })
                });
                
                console.log('Respuesta recibida:', {
                    status: response.status,
                    ok: response.ok
                });
                
                if (response.ok) {
                    console.log('Respuesta exitosa');
                    showMessage('¡Contraseña restablecida exitosamente! Redirigiendo...', 'success');
                    resetForm.reset();
                    
                    // Redirigir al login después de 3 segundos
                    console.log('niciando redirección en 3 segundos...');
                    setTimeout(() => {
                        console.log('Redirigiendo a LOGIN.html');
                        window.location.href = 'LOGIN.html';
                    }, 3000);
                    
                } else {
                    console.log('Error en la respuesta');
                    const errorText = await response.text();
                    console.log('Texto del error:', errorText);
                    showMessage(`Error: ${errorText}`, 'error');
                }
                
            } catch (error) {
                console.error('Error de conexión:', error);
                showMessage('Error de conexión. Por favor, intenta de nuevo.', 'error');
            } finally {
                // Rehabilitar el botón
                resetBtn.disabled = false;
                resetBtn.textContent = 'Restablecer Contraseña';
                console.log('🔄 Botón rehabilitado');
            }
        });
    } else {
        console.log('Formulario no encontrado');
    }
    
    // Validación en tiempo real
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = this.value;
            
            if (confirmPassword && newPassword !== confirmPassword) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e1e1e1';
            }
        });
    }
});