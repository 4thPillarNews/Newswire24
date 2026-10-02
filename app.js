const API_KEY = process.env.GNEWS_API_KEY;

async function fetchNews(category = 'general') {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '<p class="loading">Fetching news...</p>';

    try {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = '<p>No news articles found.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        newsCard.innerHTML = `
            <img src="${article.image || 'https://via.placeholder.com/300x180'}" alt="News Image">
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read More</a>
            </div>
        `;

        newsContainer.appendChild(newsCard);
    });
}

document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        fetchNews(category);
    });
});

// Initial fetch
fetchNews();
