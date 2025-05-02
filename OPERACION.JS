// Estrellas interactivas
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = star.getAttribute('data-value');
    updateStars(selectedRating);
  });
});

function updateStars(rating) {
  stars.forEach(star => {
    const value = star.getAttribute('data-value');
    star.classList.toggle('filled', value <= rating);
  });
}

// Vista previa de imágenes
const imageInput = document.getElementById('imageUpload');
const previewContainer = document.getElementById('imagePreview');

imageInput.addEventListener('change', () => {
  previewContainer.innerHTML = ''; // limpiar anterior
  const files = imageInput.files;

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});



//COMENTARIOS DE LOS USUARIOS



const reviews = [
    {
      id: 1,
      user: "Juan",
      text: "Muy buen producto.",
      rating: 5,
      date: new Date("2024-12-01"),
      likes: 12,
      dislikes: 1,
      comments: ["Totalmente de acuerdo."]
    },
    {
      id: 2,
      user: "Lucía",
      text: "No me gustó mucho.",
      rating: 2,
      date: new Date("2025-01-15"),
      likes: 2,
      dislikes: 6,
      comments: []
    },
    {
      id: 3,
      user: "Carlos",
      text: "Está bien por el precio.",
      rating: 4,
      date: new Date("2025-03-10"),
      likes: 7,
      dislikes: 0,
      comments: ["Sí, buen punto."]
    }
  ];

  function renderReviews(data) {
    const container = document.getElementById("reviewList");
    container.innerHTML = "";

    data.forEach(review => {
      const div = document.createElement("div");
      div.className = "review";
      div.innerHTML = `
        <strong>${review.user}</strong> - <span class="stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
        <div>${review.text}</div>
        <small>${review.date.toLocaleDateString()}</small>
        <div class="actions">
          <button onclick="vote(${review.id}, true)">👍 ${review.likes}</button>
          <button onclick="vote(${review.id}, false)">👎 ${review.dislikes}</button>
        </div>
        <div class="comments">
          <label>Comentar:</label>
          <input type="text" placeholder="Escribe un comentario..." onkeydown="addComment(event, ${review.id})" />
          <div class="comment-list" id="comments-${review.id}">
            ${review.comments.map(c => `<p>💬 ${c}</p>`).join("")}
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  }

  function vote(id, isLike) {
    const review = reviews.find(r => r.id === id);
    if (isLike) {
      review.likes++;
    } else {
      review.dislikes++;
    }
    renderReviews(reviews);
  }

  function addComment(event, id) {
    if (event.key === "Enter" && event.target.value.trim()) {
      const review = reviews.find(r => r.id === id);
      review.comments.push(event.target.value.trim());
      event.target.value = "";
      renderReviews(reviews);
    }
  }

  function sortReviews(type) {
    if (type === "date") {
      reviews.sort((a, b) => b.date - a.date);
    } else if (type === "ratingHigh") {
      reviews.sort((a, b) => b.rating - a.rating);
    } else if (type === "ratingLow") {
      reviews.sort((a, b) => a.rating - b.rating);
    } else if (type === "useful") {
      reviews.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
    }
    renderReviews(reviews);
  }

  document.getElementById("sort").addEventListener("change", e => {
    sortReviews(e.target.value);
  });

  // Inicializar
  sortReviews("date");



  //PROMEDIO VISUAL


  const ratings = [5, 4, 3, 5, 4.5, 2, 4]; // puedes usar decimales

  function calculateAverage(arr) {
    const sum = arr.reduce((a, b) => a + b, 0);
    return (sum / arr.length).toFixed(1); // promedio con un decimal
  }

  function renderStars(avg) {
    const container = document.getElementById("avgRatingStars");
    container.innerHTML = "";
    let fullStars = Math.floor(avg);
    let hasHalf = avg % 1 >= 0.25 && avg % 1 < 0.75;
    let remaining = 5 - fullStars - (hasHalf ? 1 : 0);

    // Agregar estrellas llenas
    for (let i = 0; i < fullStars; i++) {
      const star = document.createElement("span");
      star.classList.add("filled");
      star.textContent = "★";
      container.appendChild(star);
    }

    // Agregar media estrella
    if (hasHalf) {
      const halfStar = document.createElement("span");
      halfStar.classList.add("half");
      halfStar.textContent = "☆";
      container.appendChild(halfStar);
    }

    // Agregar estrellas vacías
    for (let i = 0; i < remaining; i++) {
      const emptyStar = document.createElement("span");
      emptyStar.textContent = "☆";
      container.appendChild(emptyStar);
    }

    // Mostrar número promedio
    document.getElementById("avgRatingValue").textContent = `Promedio: ${avg} / 5`;
  }

  const avg = calculateAverage(ratings);
  renderStars(avg);