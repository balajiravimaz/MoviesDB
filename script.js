const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const cont = document.querySelector(".container");
const load = document.getElementById("load");
const search = document.getElementById("search");
const inp = document.querySelector(".inp");


getMovies(APIURL);


async function getMovies(item) {
    const url = await fetch(item);
    const data = await url.json();
    createMovie(data.results);
    console.log(data.results);
}


function createMovie(res) {
    cont.innerHTML = "";
    cont.classList.add("active");
    res.forEach(data => {
        const card = document.createElement("div");
        card.className = "card";

        const over = document.createElement("div");
        over.className = "over";

        card.innerHTML = `
        <div class="img">
        <img src="${IMGPATH}${data.poster_path}" alt="" class="card-img" alt="${data.title}">
        </div>
        <div class="txt">
        <h6>${data.title}</h6>
        <span style="color:${showRating(data.vote_average)}"><b>${data.vote_average}</b></span>
        </div>
        <div class="over">
        <h6>Overview</h6>
        <p>${data.overview}</p>
        </div>
        `;
        cont.appendChild(card);
        load.style.display = "none";
        cont.classList.remove("active");
    })
}

function showRating(rating) {
    if (rating > 7) {
        return "green";
    } else if (rating > 5) {
        return "orange";
    } else {
        return "red";
    }
}

inp.addEventListener("input", (e) => {
    load.style.display = "block";    
    liveSearch(e.target.value);
}, 500)

const liveSearch = updateSearch(txt => {
    cont.classList.add("active");
    if (txt !== "") {
        getMovies(SEARCHAPI + txt);
        inp.value = "";        
    }
})

function updateSearch(cb, delay = 1000) {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            cb(...args);
        }, delay)
    }
}

