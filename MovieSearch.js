const searchButton = document.getElementById("searchButton");
let el = document.getElementsByClassName("card");
const $main = document.querySelector(".main");
const title = document.getElementsByClassName("card-title");
let search = document.getElementById("titleSearch");

searchButton.addEventListener("click", Search);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzgzNDAyNWNiNjllYTEyMzg3YjNkMzg2MTQzMDQ4ZSIsInN1YiI6IjY2MjhlMmFlYTEzNTMzMDE0YjE3YmNjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iubsICiLgOGurfBmypEu2BdwfmVGymL4RFKB54Srx58",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    let makeData = data.results.map((index) => {
      return {
        id: index.id,
        title: index.title,
        overview: index.overview,
        poster_path: index.poster_path,
        vote_average: Math.ceil(index.vote_average * 10) / 10,
      };
    });
    makeCard(makeData);
  })
  .catch((err) => console.error(err));

let makeCard = (resData) => {
  resData.forEach((index) => {
    let temp_html = `
    <div class="card" id=${index.id} onclick="alert('영화 ID: ' + ${index.id})";>
        <img src="https://image.tmdb.org/t/p/w500/${index.poster_path}" class="cardImg" alt="...">
        <div class="card-img-overlay">
            <h5 class="card-title">${index.title}</h5>
            <p class="card-text">${index.overview}</p>
            <p class="card-average"><small>평점 : ${index.vote_average}</small></p>
        </div>
    </div>`;
    $main.insertAdjacentHTML("beforeend", temp_html);
  });
};

const enterKey = () => {
  if (window.event.keyCode == 13) {
    Search();
  }
};

function Search() {
  const userInput = search.value.toUpperCase();
  for (let i = 0; i <= el.length; i++) {
    let titleArr = title[i].innerHTML.toUpperCase();
    if (titleArr.indexOf(userInput) != -1) {
      console.log("일치");
      el[i].style.display = "flex";
    } else {
      console.log("불일치");
      el[i].style.display = "none";
    }
  }
}
// y = f(x)
// input output

// map > output > 새로운 배열 반환
// find > output
// filter > output
// reduce > output
// forEach > output >

// 어떤 일
// 어떤 값을 넣나
// 어떤 값이 나오나
