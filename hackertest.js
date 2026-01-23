const axios = require("axios");

async function getMovieTitles(substr) {
  try {
    const res = await axios.get(
      `https://jsonmock.hackerrank.com/api/moviesdata/search/?Title=${substr}`,
    );

    const movieList = res.data.data;
    const pageNumber = res.data.total_pages;

    if (pageNumber > 1) {
      for (let i = 1; i <= pageNumber; i++) {
        const res = await axios.get(
          `https://jsonmock.hackerrank.com/api/moviesdata/search/?Title=${substr}&page=${i}`,
        );
        const movieSubList = res.data.data;
        movieSubList.map((movie) => movieList.push(movie));
      }
    }

    const titleList = [];
    movieList.map((movie) => titleList.push(movie.Title));
    titleList.sort((a, b) => {
      return a.localeCompare(b);
    });

    console.log(titleList);

    return titleList;
  } catch (err) {
    console.log(err);
  }
}

getMovieTitles("Harry Potter");
