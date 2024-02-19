"use strict"; // Fix typo
const apiKey = 'b1f580713d1004cbb79848d18d97b7f2';
const SearchMovie = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey;

const apiUrl = "https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=" + apiKey;
const btn = document.querySelector(".search-btn")
const input = document.querySelector(".inputField")
const main = document.querySelector(".container");
const form = document.querySelector(".form")

async function films(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        const results = data.results;
main.innerHTML = ''
        const movieData = results.map(movie => ({
            imag: movie.poster_path,
            title: movie.title || movie.name,
            overview: movie.overview,
            releasedate: movie.release_date,
            popularity: movie.popularity,
        }));

        movieData.forEach(movie => {

            const movieEl = document.createElement("div");
            movieEl.className = "movie-card";

            movieEl.innerHTML = `
                <div class="movie-card">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.imag}">
                    <div class="dis1">
                        <h3 class="movie-title">${movie.title}</h3>
                        <p class="movie-release-date">${movie.releasedate}</p>
                    </div>
                    <div class="dis2">
                        <p class="movie-popularity">${movie.popularity}</p>
                       
                    </div>
                    <p class="movie-overview">${movie.overview}</p>
                </div>
            `;

            main.appendChild(movieEl);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

films(apiUrl);



btn.addEventListener("click", function(e) {
    e.preventDefault();
    const searchItem = input.value;
    if (searchItem && searchItem !== "") {
        films(`${SearchMovie}&query=${searchItem}`); // Use template literal for URL concatenation
        input.value = "";
    }
}); 
