const BYLINE_DEFAULT = "Gaurav Sharma";
const ITEMS_PER_PAGE = 10;
const MAX_FIFO_LIMIT = 400;

let allArticles = [];
let filteredArticles = [];
let currentPage = 1;
let currentCategory = 'All';

const CATEGORY_IMAGES = {
    National: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80",
    International: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    Sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    Entertainment: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    Education: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    Business: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
};

function generateInitialVerifiedNews() {
    const categories = ["National", "International", "Sports", "Entertainment", "Education", "Business"];
    let data = [];

    const stored = localStorage.getItem('newswire24_news');
    if (stored) {
        return JSON.parse(stored);
    }

    for (let i = 1; i <= 40; i++) {
        const cat = categories[i % categories.length];
        data.push({
            id: i,
            title: `${cat} Bulletin ${i}: Major Official Policy & Developments Confirmed Today`,
            category: cat,
            author: BYLINE_DEFAULT,
            imageUrl: CATEGORY_IMAGES[cat],
            summary: `Verified report covering key administrative updates and strategic public developments recorded across the ${cat.toLowerCase()} sector today. Official sources have confirmed these actions under regulatory oversight.`,
            content: `Paragraph 1: Official government and industry representatives today confirmed crucial policy implementations in the ${cat.toLowerCase()} division. This development comes after extensive cross-verification across administrative parameters aimed at increasing transparency and public infrastructure efficacy.\n\nParagraph 2: Key stakeholders highlighted that these structured adjustments will directly address historical bottlenecks. Multi-source validation confirms that implementations are scheduled to commence in phases over the upcoming quarter, ensuring minimal operational disruption.`,
            publishedAt: new Date(Date.now() - i * 3600000).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
            })
        });
    }

    saveToStorage(data);
    return data;
}

function saveToStorage(newsData) {
    if (newsData.length > MAX_FIFO_LIMIT) {
        newsData = newsData.slice(0, MAX_FIFO_LIMIT);
    }
    localStorage.setItem('newswire24_news', JSON.stringify(newsData));
}

function init() {
    allArticles = generateInitialVerifiedNews();
    filteredArticles = [...allArticles];
    setupThemeToggle();
    renderFeed();
}

function renderFeed() {
    const container = document.getElementById('newsContainer');
    const badge = document.getElementById('articleCountBadge');
    container.innerHTML = '';

    badge.innerText = `Total: ${filteredArticles.length} News`;

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = filteredArticles.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    if (paginatedItems.length === 0) {
        container.innerHTML = `<p class="col-span-2 text-center text-gray-500 py-10">No verified articles found in this category.</p>`;
        document.getElementById('paginationControls').innerHTML = '';
        return;
    }

    paginatedItems.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-44 object-cover" onerror="this.src='${CATEGORY_IMAGES.National}'">
                <div class="p-4">
                    <span class="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest">${item.category}</span>
                    <h3 class="text-base font-bold mt-1 line-clamp-2 hover:text-red-600 cursor-pointer text-gray-900 dark:text-white" onclick="openModal(${item.id})">${item.title}</h3>
                    <p class="text-[11px] text-gray-500 dark:text-gray-400 my-2">By ${item.author} • ${item.publishedAt}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">${item.summary}</p>
                </div>
            </div>
            <div class="p-4 pt-0">
                <button onclick="openModal(${item.id})" class="text-xs font-bold text-red-600 dark:text-red-400 hover:underline">Read Full Verified Article →</button>
            </div>
        `;
        container.appendChild(card);
    });

    renderPagination();
}

function renderPagination() {
    const controls = document.getElementById('paginationControls');
    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    controls.innerHTML = '';

    if (totalPages <= 1) return;

    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = "px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-xs font-bold rounded-md";
        prevBtn.innerText = "Previous";
        prevBtn.onclick = () => { currentPage--; renderFeed(); window.scrollTo(0, 0); };
        controls.appendChild(prevBtn);
    }

    const pageText = document.createElement('span');
    pageText.className = "text-xs font-bold px-2 text-gray-600 dark:text-gray-400";
    pageText.innerText = `Page ${currentPage} of ${totalPages}`;
    controls.appendChild(pageText);

    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = "px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-md";
        nextBtn.innerText = "Next";
        nextBtn.onclick = () => { currentPage++; renderFeed(); window.scrollTo(0, 0); };
        controls.appendChild(nextBtn);
    }
}

function filterCategory(cat) {
    currentCategory = cat;
    currentPage = 1;
    document.getElementById('currentCategoryTitle').innerText = cat === 'All' ? 'Latest Breaking News' : `${cat} News`;
    
    if (cat === 'All') {
        filteredArticles = [...allArticles];
    } else {
        filteredArticles = allArticles.filter(a => a.category.toLowerCase() === cat.toLowerCase());
    }
    renderFeed();
}

function openModal(id) {
    const article = allArticles.find(a => a.id === id);
    if (!article) return;

    const modal = document.getElementById('articleModal');
    const content = document.getElementById('modalContent');

    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(article.title);

    content.innerHTML = `
        <span class="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">${article.category}</span>
        <h2 class="text-xl font-black my-2 text-gray-900 dark:text-white leading-snug">${article.title}</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">By <strong class="text-gray-800 dark:text-gray-200">${article.author}</strong> • ${article.publishedAt}</p>
        
        <img src="${article.imageUrl}" alt="${article.title}" class="w-full h-60 object-cover rounded-xl mb-4">
        
        <div class="w-full h-20 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs text-gray-400 font-bold rounded-lg my-4">
            Google AdSense Placeholder (In-Article)
        </div>

        <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-200 space-y-3 leading-relaxed whitespace-pre-line">
            ${article.content}
        </div>

        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 items-center">
            <span class="text-xs font-bold text-gray-500">Share:</span>
            <a href="https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}" target="_blank" class="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded">WhatsApp</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded">Facebook</a>
            <a href="https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}" target="_blank" class="px-2.5 py-1 bg-black text-white text-xs font-bold rounded">X</a>
            <button onclick="navigator.clipboard.writeText(window.location.href); alert('Link copied!');" class="px-2.5 py-1 bg-gray-600 text-white text-xs font-bold rounded">Copy Link</button>
        </div>
    `;

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('articleModal').classList.add('hidden');
}

function setupThemeToggle() {
    const btn = document.getElementById('themeToggle');
    btn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        btn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
}

window.onload = init;

