const apiKey = "2566aeaa";

async function fetchMovieDetails(apiKey, title) {
  const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayMovieDetails(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayMovieDetails(daata) {
  const movieDataDiv = document.getElementById("movie-data");
  const moviePosterImg = document.getElementById("movie-poster");

  if (daata.Response === "True") {
    movieDataDiv.innerHTML = `
            <h1>${daata.Title}</h1>
            <p><strong>Year:</strong> ${daata.Year}</p>
            <p><strong>Genre:</strong> ${daata.Genre}</p>
            <p><strong>Plot:</strong> ${daata.Plot}</p>
            <p><strong>Director:</strong> ${daata.Director}</p>
            <p><strong>Actors:</strong> ${daata.Actors}</p>
            <p><strong>IMDB Rating:</strong> ${daata.imdbRating}</p>
            <p><strong>Metascore Rating:</strong> ${daata.Metascore}</p>
        `;
    if (daata.Poster && daata.Poster !== "N/A") {
      moviePosterImg.src = daata.Poster;
      moviePosterImg.alt = `${daata.Title} Poster`;
    } else {
      moviePosterImg.alt = "Poster not available";
      moviePosterImg.src = "";
    }
  } else {
    movieDataDiv.innerHTML = "<p>Movie not found.</p>";
    moviePosterImg.alt = "";
    moviePosterImg.src = "";
  }
}

document.getElementById("search-button").addEventListener("click", () => {
  const movieId = document.getElementById("movie-id-input").value;
  if (movieId) {
    fetchMovieDetails(apiKey, movieId);
  } else {
    alert("Please enter a movie Title.");
  }
});
