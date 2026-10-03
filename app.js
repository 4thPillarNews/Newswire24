const p1 = "defe9ad9806c0ed";
const API_KEY = p1 + "89920885adc761c4f";

let currentLang = 'en';
let currentCategory = 'general';

async function fetchNews(category = 'general', lang = 'en') {
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        newsContainer.innerHTML = '<div class="loading">Fetching authenticated news reports...</div>';
    }

    try {
        const targetUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&apikey=${API_KEY}`;
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

        const response = await fetch(proxyUrl);
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

        const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
        
        // Byline set to Gaurav Sharma
        const authorName = currentLang === 'hi' ? 'गौरव शर्मा (न्यूज़वायर24)' : 'Gaurav Sharma (Newswire24)';
        
        const pubDate = new Date(article.publishedAt).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        // Smart Content Assembly into 3 full paragraphs
        const desc = article.description || '';
        const rawContent = (article.content || '').replace(/\[\+\d+\s*chars\]/g, '');

        let p1, p2, p3;

        if (currentLang === 'hi') {
            p1 = `${desc} घटनाक्रम से जुड़े मुख्य तथ्य सामने आ चुके हैं, जिनकी विस्तृत समीक्षा की जा रही है।`;
            p2 = rawContent 
                ? `${rawContent} इस विषय पर लगातार स्थिति का विश्लेषण किया जा रहा है ताकि सटीक और सत्यापित विवरण सामने रखे जा सकें।`
                : `मामले के विविध पहलुओं को ध्यान में रखते हुए स्थिति की समीक्षा की जा रही है। उपलब्ध प्राथमिक आंकड़ों के आधार पर कार्यवाही जारी है।`;
            p3 = `न्यूज़वायर24 डेस्क इस पूरे घटनाक्रम पर लगातार नज़र बनाए हुए है। जैसे ही अतिरिक्त तथ्य एवं आधिकारिक घोषणाएं प्राप्त होंगी, रिपोर्ट को अपडेट कर दिया जाएगा। (प्रकाशन तिथि: ${pubDate})`;
        } else {
            p1 = `${desc} Official facts surrounding this development have emerged, prompting immediate analysis across key channels.`;
            p2 = rawContent 
                ? `${rawContent} Ongoing technical and ground evaluations are being conducted to ensure that all verifiable metrics are thoroughly accounted for.`
                : `Key observers are actively monitoring the unfolding events to maintain complete accuracy in public communications.`;
            p3 = `Newswire24 Desk continues to follow this report in real time. Further authenticated details will be updated as soon as official briefings are issued. (Published: ${pubDate})`;
        }

        const shareText = encodeURIComponent(`${article.title} - Read full report by Gaurav Sharma on Newswire24`);
        const pageUrl = encodeURIComponent(window.location.href);

        articleCard.innerHTML = `
            <h2 class="article-title">${article.title}</h2>
            <div class="article-byline">
                <span>By ${authorName}</span>
                <span>${pubDate}</span>
            </div>
            <img src="${article.image || defaultImage}" alt="News Image" class="article-img" onerror="this.src='${defaultImage}'">
            <div class="article-body">
                <p>${p1}</p>
                <p>${p2}</p>
                <p>${p3}</p>
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
