document.addEventListener('DOMContentLoaded', function(){
  //Obtener las referencias del DOM
  const contaniner = document.querySelector('.login-wrapper');
  const registerBtn = document.querySelector('.register-btn');

  const registerForm = document.querySelector('#registerForm');

  //API de registro
  const API_URL="http://localhost:3000/api"

  //Manejar el formulario de registro

  registerForm.addEventListener('submit', async(e)=>{
    e.preventDefault()

    //Obtener datos de los formularios
    const nombre =  registerForm.querySelector('input[name="text-nombre"]').value;
    const correo =  registerForm.querySelector('input[name="email"]').value;
    const nombre_usuario =  registerForm.querySelector('input[name="text-usuario"]').value;
    const contraseña =  registerForm.querySelector('input[type="password"]').value;

    try{
      //Enviar la solicitud al servidor
      const response = await fetch (`${API_URL}/registro`,{
        method :'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            correo,
            nombre_usuario,
            contraseña
        })
      });
      if(response.ok){
        alert("Usuario registrado correctamente");
        //limpiar el formulario
        registerForm.reset();
      }else{
        alert("Error al registrar usuario");
        registerForm.reset();
      }
    }
    catch(error){
      console.log("Error al registrar usuario",error);
    }
  })
})