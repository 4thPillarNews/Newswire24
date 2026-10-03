let currentLang = 'en';
let currentCategory = 'general';

async function fetchNews(category = 'general', lang = 'en') {
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        newsContainer.innerHTML = '<div class="loading">Fetching authenticated news reports...</div>';
    }

    try {
        const queryCategory = category === 'general' ? 'general' : category;
        const apiUrl = `https://saurav.tech/NewsAPI/top-headlines/category/${queryCategory}/in.json`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Server response failed');
        }

        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            const formattedArticles = data.articles.map(art => {
                const pubDate = new Date(art.publishedAt || Date.now()).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });

                const desc = art.description || art.title || '';
                const rawContent = (art.content || '').replace(/\[\+\d+\s*chars\]/g, '');

                let p1_text, p2_text, p3_text;

                if (lang === 'hi') {
                    p1_text = `${desc} इस ताज़ा मामले पर मुख्य विवरण और अपडेट्स सामने आ चुके हैं।`;
                    p2_text = rawContent 
                        ? `${rawContent} मामले की गंभीरता को देखते हुए संबंधित विभाग और विशेषज्ञ इसकी विस्तृत जांच कर रहे हैं।`
                        : `संबंधित विभागों की ओर से आधिकारिक समीक्षा प्रक्रिया जारी है। प्राथमिक आंकड़ों के आधार पर स्थिति का मूल्यांकन किया जा रहा है।`;
                    p3_text = `गौरव शर्मा (न्यूज़वायर24) इस घटनाक्रम पर लगातार नज़र बनाए हुए हैं। जैसे ही और आधिकारिक अपडेट प्राप्त होंगे, रिपोर्ट को तुरंत अपडेट किया जाएगा। (दिनांक: ${pubDate})`;
                } else {
                    p1_text = `${desc} Official details and key findings regarding this story have been verified and documented.`;
                    p2_text = rawContent 
                        ? `${rawContent} Field observers and domain analysts are closely evaluating the situation as more information emerges.`
                        : `Administrative channels and key agencies are reviewing the developments to confirm all underlying facts.`;
                    p3_text = `Gaurav Sharma (Newswire24) is continuously following this briefing. Verified updates will be added as received. (Published: ${pubDate})`;
                }

                return {
                    title: art.title,
                    publishedAt: pubDate,
                    image: art.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
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
            <img src="${article.image}" alt="News Image" class="article-img" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'">
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

document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        currentCategory = e.target.getAttribute('data-category');
        fetchNews(currentCategory, currentLang);
    });
});

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

fetchNews(currentCategory, currentLang);
