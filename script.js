// nav background
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})


const news = document.getElementById('news');
const events = document.getElementById('events');
const jobs = document.getElementById('jobs');


events.addEventListener("click",() => {
   fetchdata('events'),
    news.style.backgroundColor="white",
    jobs.style.backgroundColor="white",
    events.style.backgroundColor="rgba(77, 228, 255)"
})
jobs.addEventListener("click",() => {
    fetchdata('jobs'),
    news.style.backgroundColor="white",
events.style.backgroundColor="white",
    jobs.style.backgroundColor="rgba(77, 228, 255)"
})

news.addEventListener("click",() => {
    fetchdata('tech'),
    news.style.backgroundColor="rgba(77, 228, 255)",
    events.style.backgroundColor="white",
        jobs.style.backgroundColor="white"
})

// Api fteching : -

const API_KEY = "pub_24603370c3506c6bb96c2fb8cd356a70e242e";

const url = " https://newsdata.io/api/1/news?";

window.addEventListener("load",() =>fetchdata('tech'), news.style.backgroundColor="rgba(77, 228, 255)")

const fetchdata = async (query) => {
    const res = await fetch(`${url}apikey=${API_KEY}&q=${query}`);
    const data = await res.json();
    bindData(data.results);
}

function bindData(results) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    results.forEach((result) => {
        if (!result.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, result);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,results) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
   

    newsImg.src = results.image_url;
    newsTitle.innerHTML = results.title;


    const date = new Date(results.pubDate).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${results.source_id} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(results.link, "_blank");
    });
}