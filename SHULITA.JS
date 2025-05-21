document.addEventListener('DOMContentLoaded', function () {
  const inputImagenes = document.getElementById('imagenesResena');
  const preview = document.getElementById('previewImagenes');

  if (inputImagenes) {
    inputImagenes.addEventListener('change', function () {
      preview.innerHTML = '';
      Array.from(this.files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '80px';
            img.style.height = '60px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '6px';
            img.style.border = '1px solid #ccc';
            img.style.boxShadow = '0 1px 6px rgba(0,0,0,0.07)';
            preview.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const btnGuardar = document.querySelector('.btn.btn-primary');
  const inputNombre = document.getElementById('nombreUsuario');
  const selectCalificacion = document.getElementById('calificacion');
  const inputTitulo = document.getElementById('tituloResena');
  const inputComentario = document.getElementById('comentarioResena');
  const inputImagenes = document.getElementById('imagenesResena');
  const opinionesContainer = document.querySelector('.opiniones-container');

  if (btnGuardar) {
    btnGuardar.addEventListener('click', function () {
      // Obtener valores
      const nombre = inputNombre.value.trim() || 'Anónimo';
      const calificacion = selectCalificacion.value;
      const estrellas = '★'.repeat(calificacion) + '☆'.repeat(5 - calificacion);
      const titulo = inputTitulo.value.trim();
      const comentario = inputComentario.value.trim();
      const fecha = new Date();
      const fechaFormateada = fecha.toLocaleDateString('es-PE', {
        day: '2-digit', month: 'long', year: 'numeric'
      });

      // Imágenes
      let imagenesHTML = '';
      if (inputImagenes.files.length > 0) {
        Array.from(inputImagenes.files).forEach(file => {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
              imagenesHTML += `<img src="${e.target.result}" alt="Foto opinión" style="width:90px;height:60px;object-fit:cover;border-radius:6px;border:1px solid #e0e0e0;margin-right:10px;margin-bottom:5px;">`;
              // Cuando todas las imágenes estén listas, agregar la opinión
              if (imagenesHTML.split('<img').length - 1 === inputImagenes.files.length) {
                agregarOpinion();
              }
            };
            reader.readAsDataURL(file);
          }
        });
      } else {
        agregarOpinion();
      }

      function agregarOpinion() {
        const opinionHTML = `
        <div class="opinion">
          <div class="opinion-header">
            <div class="opinion-usuario">
              <span class="usuario-nombre">${nombre}</span>
              <span class="opinion-estrellas">${estrellas}</span>
            </div>
            <div class="opinion-actions">
              <button class="btn-like" title="Me gusta">&#128077;</button>
              <button class="btn-dislike" title="No me gusta">&#128078;</button>
            </div>
          </div>
          <div class="opinion-titulo">
            <strong>${titulo ? titulo : '(Sin título)'}</strong>
          </div>
          <div class="opinion-comentario">
            ${comentario}
          </div>
          <div class="opinion-carrusel">
            ${imagenesHTML}
          </div>
          <div class="opinion-fecha">
            ${fechaFormateada}
          </div>
        </div>
        `;
        // Insertar la nueva opinión después de los filtros
        const filtros = opinionesContainer.querySelector('.opiniones-filtros');
        filtros.insertAdjacentHTML('afterend', opinionHTML);

        // Limpiar formulario y cerrar modal
        inputNombre.value = '';
        selectCalificacion.value = '5';
        inputTitulo.value = '';
        inputComentario.value = '';
        inputImagenes.value = '';
        document.getElementById('previewImagenes').innerHTML = '';
        // Cerrar modal Bootstrap
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalResena'));
        if (modal) modal.hide();
      }

      // Si no hay imágenes, agregar la opinión de inmediato
      if (inputImagenes.files.length === 0) {
        agregarOpinion();
      }
    });
  }
});