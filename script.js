const API_KEY = "8b570f9c0a8449058b7dcbfdcef6ab3d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
    scrollToTop();
}


async function fetchNews(query) {
    showLoadingIndicator();
    try {
        // Refine the query to be more specific to India
        const res = await fetch(`${url}${query}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    } finally {
        hideLoadingIndicator();
    }
}


// async function fetchNews(query) {
//     showLoadingIndicator();
//     try {
//         const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//         const data = await res.json();
//         bindData(data.articles);
//     } catch (error) {
//         console.error("Error fetching news:", error);
//     } finally {
//         hideLoadingIndicator();
//     }
// }

function showLoadingIndicator() {
    document.getElementById("loading-indicator").classList.add("active");
    document.getElementById("animateloader").classList.add("active");

}

function hideLoadingIndicator() {
    document.getElementById("loading-indicator").classList.remove("active");
    document.getElementById("animateloader").classList.remove("active");

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


// function fillDataInCard(cardClone, article) {
//     const newsImg = cardClone.querySelector("#news-img");
//     const newsTitle = cardClone.querySelector("#news-title");
//     const newsSource = cardClone.querySelector("#news-source");
//     const newsDesc = cardClone.querySelector("#news-desc");

//     newsImg.src = article.urlToImage;
//     newsTitle.innerHTML = article.title;
//     newsDesc.innerHTML = article.description;

//     const date = new Date(article.publishedAt).toLocaleString("en-US", {
//         timeZone: "Asia/Kolkata",
//     });

//     newsSource.innerHTML = `${article.source.name} · ${date}`;

//     cardClone.firstElementChild.addEventListener("click", () => {
//         window.open(article.url, "_blank");
//     });
// }


function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",  // Changed from "Asia/Jakarta" to "Asia/Kolkata"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}



let curSelectedNav = null;
function OnNavClick(id) {
    
    fetchNews(id);
    scrollToTop(); // Scroll to top when navigation item is selected

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
   
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");

}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    scrollToTop();
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});