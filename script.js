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
    fetchdata('news'),
    news.style.backgroundColor="rgba(77, 228, 255)",
    events.style.backgroundColor="white",
        jobs.style.backgroundColor="white"
})

// Api fteching : -

const API_KEY = "9d2ea32c3e9841e29830436fc8f0de7d";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() =>fetchdata('news'), news.style.backgroundColor="rgba(77, 228, 255)")

const fetchdata = async (query) => {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}