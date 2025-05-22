document.addEventListener('DOMContentLoaded', function(){
  //Obtener las referencias del DOM
  const contaniner = document.querySelector('.login-wrapper');
  const registerBtn = document.querySelector('.login-btn');

  const loginForm = document.querySelector('#loginForm');

  //API de login
  const API_URL="http://localhost:3000/api"

  //Manejar el formulario de registro

  loginForm.addEventListener('submit', async(e)=>{
    e.preventDefault()

    //Obtener datos de los formularios
    const correo =  loginForm.querySelector('input[type="email"]').value;
    const contraseña =  loginForm.querySelector('input[type="password"]').value;

    try{
      //Enviar la solicitud al servidor
      const response = await fetch (`${API_URL}/login`,{
        method :'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo,
            contraseña
        })
      });
      if(response.ok){
        // Suponiendo que el backend responde con el nombre del usuario:
        const data = await response.json();
        const nombreUsuario = data.nombre || "Usuario";
        localStorage.setItem('nombreUsuario', nombreUsuario);


        alert("Usuario ingresado correctamente");
        //limpiar el formulario
        loginForm.reset();
        //Redirigir a otra pagina
        window.location.replace("INICIO.HTML");

      }else{
        alert("Ingrese correctamente los datos");
        loginForm.reset();
      }
    }
    catch(error){
      console.log("Error al registrar usuario",error);
    }
  })
})

document.getElementById('abrirModalRecuperar').onclick = function(e) {
  e.preventDefault();
  document.getElementById('modalRecuperar').style.display = 'flex';
};
document.getElementById('cerrarModalRecuperar').onclick = function() {
  document.getElementById('modalRecuperar').style.display = 'none';
};
// Cierra el modal si se hace clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById('modalRecuperar');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};