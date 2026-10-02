const GNEWS_API_KEY = "defe9ad9806c0ed89920885adc761c4f";
let fetchedArticles = [];

async function loadNews(category = 'general') {
    const container = document.getElementById('newsContainer');
    const badge = document.getElementById('articleCountBadge');
    const titleHeader = document.getElementById('currentCategoryTitle');

    if (titleHeader) titleHeader.innerText = `${category.toUpperCase()} NEWS`;
    if (badge) badge.innerText = "Loading Live Data...";

    container.innerHTML = `
        <div class="col-span-2 text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p class="text-xs font-bold text-gray-500 mt-2">Fetching verified news stories...</p>
        </div>
    `;

    // Direct GNews Endpoint (Netlify use karne par '/.netlify/functions/fetch-news?category=' + category)
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=10&apikey=${GNEWS_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            fetchedArticles = data.articles;
            renderArticles(fetchedArticles, category);
        } else if (data.errors) {
            container.innerHTML = `<p class="col-span-2 text-center text-red-500 py-10">API Error: ${data.errors[0] || 'Quota limit reached or invalid key'}</p>`;
            if (badge) badge.innerText = "Status: API Limit/Error";
        } else {
            container.innerHTML = `<p class="col-span-2 text-center text-gray-500 py-10">No articles available right now.</p>`;
            if (badge) badge.innerText = "Status: Empty";
        }
    } catch (err) {
        console.error("GNews API Fetch Error:", err);
        container.innerHTML = `<p class="col-span-2 text-center text-red-500 py-10">Failed to load news. Check API Key or Network connection.</p>`;
        if (badge) badge.innerText = "Status: Error";
    }
}

function renderArticles(articles, category) {
    const container = document.getElementById('newsContainer');
    const badge = document.getElementById('articleCountBadge');
    container.innerHTML = '';

    if (badge) badge.innerText = `Total: ${articles.length} Items`;

    articles.forEach((item, index) => {
        const publishedDate = new Date(item.publishedAt).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });

        const card = document.createElement('div');
        card.className = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between";

        card.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'">
                <div class="p-4">
                    <span class="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">${item.source.name || category}</span>
                    <h3 class="text-base font-bold mt-1 line-clamp-2 hover:text-blue-600 cursor-pointer text-gray-900 dark:text-white" onclick="openModal(${index})">${item.title}</h3>
                    <p class="text-[11px] text-gray-500 dark:text-gray-400 my-2">By ${item.source.name || 'Gaurav Sharma'} • ${publishedDate}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">${item.description}</p>
                </div>
            </div>
            <div class="p-4 pt-0">
                <button onclick="openModal(${index})" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Read Full Coverage →</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function openModal(index) {
    const article = fetchedArticles[index];
    if (!article) return;

    const modal = document.getElementById('articleModal');
    const content = document.getElementById('modalContent');

    const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    content.innerHTML = `
        <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">${article.source.name}</span>
        <h2 class="text-xl font-black my-2 text-gray-900 dark:text-white leading-snug">${article.title}</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Source: <strong class="text-gray-800 dark:text-gray-200">${article.source.name}</strong> • ${publishedDate}</p>
        
        <img src="${article.image}" alt="${article.title}" class="w-full h-60 object-cover rounded-xl mb-4" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'">
        
        <div class="w-full h-20 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs text-gray-400 font-bold rounded-lg my-4">
            Google AdSense Placeholder
        </div>

        <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-200 space-y-4 leading-relaxed">
            <p>${article.content || article.description}</p>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">Read Original Article at Source ↗</a>
        </div>
    `;

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('articleModal').classList.add('hidden');
}

function showLegalPage(type) {
    const modal = document.getElementById('articleModal');
    const content = document.getElementById('modalContent');

    let title = "";
    let body = "";

    if (type === 'about') {
        title = "About Us";
        body = "Newswire24 provides real-time news updates directly fetched through verified press networks. Maintained by Gaurav Sharma.";
    } else if (type === 'privacy') {
        title = "Privacy Policy";
        body = "Newswire24 respects user privacy. We do not collect personal identifying data without consent. AdSense cookies may be served by third-party ad networks.";
    } else if (type === 'terms') {
        title = "Terms & Conditions";
        body = "Content aggregated on Newswire24 belongs to the respected news publications linked in the source field.";
    } else if (type === 'disclaimer') {
        title = "Disclaimer";
        body = "Newswire24 aggregates news via verified APIs. We do not claim ownership of external original journalism.";
    }

    content.innerHTML = `
        <h2 class="text-xl font-black my-2 text-gray-900 dark:text-white">${title}</h2>
        <hr class="my-3 border-gray-200 dark:border-gray-700">
        <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed">${body}</p>
    `;

    modal.classList.remove('hidden');
}

function setupButtons() {
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.onclick = () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            themeBtn.innerText = isDark ? "☀️️ Light Mode" : "🌙 Dark Mode";
        };
    }
}

window.onload = () => {
    setupButtons();
    loadNews('general');
};
