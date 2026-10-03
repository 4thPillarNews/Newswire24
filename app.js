let currentLang = 'en';
let currentCategory = 'general';

async function fetchNews(category = 'general', lang = 'en') {
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        newsContainer.innerHTML = '<div class="loading">Fetching authenticated news reports...</div>';
    }

    try {
        const response = await fetch(`/.netlify/functions/get-news?category=${category}&lang=${lang}`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            if (newsContainer) newsContainer.innerHTML = '<p>No news articles found at this time.</p>';
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
        const articleCard = document.createElement('article');
        articleCard.className = 'article-card';

        const shareText = encodeURIComponent(`${article.title} - Read full report by Gaurav Sharma on Newswire24`);
        const pageUrl = encodeURIComponent(window.location.href);

        articleCard.innerHTML = `
            <h2 class="article-title">${article.title}</h2>
            <div class="article-byline">
                <span>By Gaurav Sharma (Newswire24)</span>
                <span>${article.publishedAt}</span>
            </div>
            <img src="${article.image}" alt="News Image" class="article-img" onerror="this.src='https://via.placeholder.com/800x450?text=Newswire24'">
            <div class="article-body">
                <p>${article.paragraph1}</p>
                <p>${article.paragraph2}</p>
                <p>${article.paragraph3}</p>
            </div>
            <div class="share-section">
                <span class="share-title">${currentLang === 'hi' ? 'शेयर करें:' : 'Share Article:'}</span>
                <a href="https://api.whatsapp.com/send?text=${shareText}%20${pageUrl}" target="_blank" class="share-btn share-wa">WhatsApp</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${pageUrl}" target="_blank" class="share-btn share-fb">Facebook</a>
                <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}" target="_blank" class="share-btn share-x">X (Twitter)</a>
                <button onclick="navigator.clipboard.writeText(window.location.href); alert('${currentLang === 'hi' ? 'लिंक कॉपी हो गया!' : 'Link Copied!}');" class="share-btn share-link">Copy Link</button>
            </div>
        `;

        newsContainer.appendChild(articleCard);
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
