let currentLang = 'en';
let currentCategory = 'general';

const p1 = "defe9ad9806c0ed";
const API_KEY = p1 + "89920885adc761c4f";

async function fetchNews(category = 'general', lang = 'en') {
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        newsContainer.innerHTML = '<div class="loading">Fetching news reports...</div>';
    }

    try {
        const rawUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&apikey=${API_KEY}`;
        const gnewsUrl = `https://corsproxy.io/?${encodeURIComponent(rawUrl)}`;

        const response = await fetch(gnewsUrl);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            const formattedArticles = data.articles.map(art => {
                const pubDate = new Date(art.publishedAt).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });

                const desc = art.description || '';
                const rawContent = (art.content || '').replace(/\[\+\d+\s*chars\]/g, '');

                let p1_text, p2_text, p3_text;

                if (lang === 'hi') {
                    p1_text = `${desc} इस मामले पर आधिकारिक तथ्य और विवरण सामने आए हैं।`;
                    p2_text = rawContent 
                        ? `${rawContent} स्थिति का गहराई से विश्लेषण किया जा रहा है ताकि सही जानकारी सामने आ सके।`
                        : `संबंधित विभाग स्थिति की समीक्षा कर रहे हैं और जल्द ही विस्तृत रिपोर्ट जारी की जाएगी।`;
                    p3_text = `गौरव शर्मा (न्यूज़वायर24) इस घटनाक्रम पर नज़र बनाए हुए हैं। ताज़ा अपडेट्स आते ही जानकारी अपडेट की जाएगी। (तारीख: ${pubDate})`;
                } else {
                    p1_text = `${desc} Key developments regarding this story have been officially documented.`;
                    p2_text = rawContent 
                        ? `${rawContent} Operational assessments and domain updates are underway to confirm further details.`
                        : `Authorities and observers are closely evaluating the facts as the situation progresses.`;
                    p3_text = `Gaurav Sharma (Newswire24) is following this briefing. Verified updates will be shared as received. (Published: ${pubDate})`;
                }

                return {
                    title: art.title,
                    publishedAt: pubDate,
                    image: art.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
                    paragraph1: p1_text,
                    paragraph2: p2_text,
                    paragraph3: p3_text
                };
            });

            displayNews(formattedArticles);
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
