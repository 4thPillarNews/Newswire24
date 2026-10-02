const p1 = "defe9ad9806c0ed";
const API_KEY = p1 + "89920885adc761c4f";

let currentLang = 'en';
let currentCategory = 'general';

async function fetchNews(category = 'general', lang = 'en') {
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        newsContainer.innerHTML = '<p class="loading">Loading news...</p>';
    }

    try {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            if (newsContainer) newsContainer.innerHTML = '<p>No news articles found for this selection.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        if (newsContainer) newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        const defaultImage = 'https://via.placeholder.com/300x180?text=Newswire24';
        const readMoreText = currentLang === 'hi' ? 'Pura Padhein' : 'Read More';

        newsCard.innerHTML = `
            <img src="${article.image || defaultImage}" alt="News Image" onerror="this.src='${defaultImage}'">
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <a href="${article.url}" target="_blank">${readMoreText} &rarr;</a>
            </div>
        `;

        newsContainer.appendChild(newsCard);
    });
}

// Category selection
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        currentCategory = e.target.getAttribute('data-category');
        fetchNews(currentCategory, currentLang);
    });
});

// Hindi / English Toggle Button
const langToggleBtn = document.getElementById('lang-toggle-btn');
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        if (currentLang === 'en') {
            currentLang = 'hi';
            langToggleBtn.innerText = '🌐 Switch to English';
        } else {
            currentLang = 'en';
            langToggleBtn.innerText = '🌐 Switch to Hindi';
        }
        fetchNews(currentCategory, currentLang);
    });
}

// Initial fetch
fetchNews(currentCategory, currentLang);
