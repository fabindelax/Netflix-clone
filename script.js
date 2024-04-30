window.onload = () => {
    const form = document.querySelector('.form');
    form.addEventListener('submit', searchMovies);

    // Carregar filmes ao carregar a página
    loadMovies();
};

function loadMovies() {
    fetch("filmes.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            showMovies(data);
        })
        .catch((error) => {
            console.error("Unable to fetch data:", error);
            alert('Erro ao buscar filmes.');
        });
}

function searchMovies(event) {
    event.preventDefault();

    const searchTerm = document.querySelector('.form__input').value.trim().toLowerCase();

    fetch("filmes.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const filteredMovies = data.filter(movie =>
                movie.titulo.toLowerCase().includes(searchTerm)
            );
            showMovies(filteredMovies);
        })
        .catch((error) => {
            console.error("Unable to fetch data:", error);
            alert('Erro ao buscar filmes.');
        });
}

function showMovies(movies) {
    let moviesList = document.getElementById("movies");
    let newContent = '';

    movies.forEach((movie) => {
        newContent += `<li class="app-movies-all__card">`;
        newContent += `<figure class="app-movies-all__figure">`;
        newContent += `<img class="app-movies-all__thumb" src="${movie.poster}"/>`;
        newContent += `</figure>`;
        newContent += `<legend class="app-movies-all__legend">`;
        newContent += `<span class="app-movies-all__year">${movie.ano}</span>`;
        newContent += `<h2 class="app-movies-all__title">${movie.titulo}</h2>`;
        newContent += `<button class="favorite-button">Favoritar</button>`; // Botão de favoritar
        newContent += `</legend>`;
        newContent += `</li>`;
    });

    moviesList.innerHTML = newContent;

    // Adicionar evento de clique para os botões de favoritar
    const favoriteButtons = document.querySelectorAll('.favorite-button');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', toggleFavorite);
    });
}

function toggleFavorite(event) {
    event.preventDefault();
    const button = event.target;
    const isFavorited = button.classList.contains('favorited');

    if (isFavorited) {
        button.classList.remove('favorited');
        button.textContent = 'Favoritar';
    } else {
        button.classList.add('favorited');
        button.textContent = 'Desfavoritar';
    }
}
