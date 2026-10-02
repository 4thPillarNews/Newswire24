const BYLINE_DEFAULT = "Gaurav Sharma";
const ITEMS_PER_PAGE = 10;
const MAX_FIFO_LIMIT = 400;

let allArticles = [];
let filteredArticles = [];
let currentPage = 1;
let currentCategory = 'All';
let currentLang = 'en'; // 'en' or 'hi'

const CATEGORY_NEWS_DATA = {
    National: [
        {
            title: {
                en: "Union Cabinet Approves Major Infrastructure & Highway Expansion Project",
                hi: "केंद्रीय मंत्रिमंडल ने प्रमुख बुनियादी ढांचे और राजमार्ग विस्तार परियोजना को दी मंजूरी"
            },
            image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Government announces new multi-lane expressways aimed at boosting interstate trade and reducing travel times across key industrial corridors.",
                hi: "सरकार ने अंतरराज्यीय व्यापार को बढ़ावा देने और प्रमुख औद्योगिक गलियारों में यात्रा के समय को कम करने के लिए नए एक्सप्रेसवे की घोषणा की।"
            },
            content: {
                en: "The Union Cabinet today granted administrative approval for a comprehensive national highway expansion initiative. The strategic framework focuses on enhancing freight mobility and integrating modern digital tolling systems across state borders.\n\nKey officials confirmed that phase-one construction will begin within the upcoming quarter, generating thousands of regional employment opportunities and modernizing transport logistics.",
                hi: "केंद्रीय मंत्रिमंडल ने आज एक व्यापक राष्ट्रीय राजमार्ग विस्तार पहल को प्रशासनिक मंजूरी दे दी। रणनीतिक ढांचा माल की आवाजाही को बढ़ाने और राज्य सीमाओं पर आधुनिक डिजिटल टोलिंग प्रणालियों को एकीकृत करने पर केंद्रित है।\n\nप्रमुख अधिकारियों ने पुष्टि की कि आगामी तिमाही के भीतर प्रथम चरण का निर्माण शुरू हो जाएगा, जिससे हजारों क्षेत्रीय रोजगार के अवसर पैदा होंगे।"
            }
        },
        {
            title: {
                en: "New Digital Governance Portal Launched to Streamline Public Services",
                hi: "सार्वजनिक सेवाओं को सुव्यवस्थित करने के लिए नया डिजिटल गवर्नेंस पोर्टल लॉन्च"
            },
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "A unified online portal goes live today, providing citizens seamless access to civic documentation and welfare schemes.",
                hi: "एक एकीकृत ऑनलाइन पोर्टल आज लाइव हो गया है, जो नागरिकों को नागरिक दस्तावेजों और कल्याणकारी योजनाओं तक सहज पहुंच प्रदान करता है।"
            },
            content: {
                en: "In a push towards end-to-end digital governance, central authorities officially unveiled a unified public service platform today. Citizens can now access verified identity documents, welfare applications, and land records through a secure single-window system.",
                hi: "डिजिटल प्रशासन की दिशा में एक कदम उठाते हुए केंद्रीय अधिकारियों ने आज एक एकीकृत सार्वजनिक सेवा मंच का अनावरण किया। नागरिक अब सुरक्षित सिंगल-विंडो सिस्टम के माध्यम से सत्यापित पहचान पत्र और कल्याणकारी आवेदनों तक पहुंच सकते हैं।"
            }
        }
    ],
    International: [
        {
            title: {
                en: "Global Climate Summit Reaches Consensus on Renewable Energy Targets",
                hi: "वैश्विक जलवायु शिखर सम्मेलन में अक्षय ऊर्जा लक्ष्यों पर बनी सहमति"
            },
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Delegates from over 80 nations commit to doubling solar and wind capacity over the next decade.",
                hi: "80 से अधिक देशों के प्रतिनिधि अगले दशक में सौर और पवन क्षमता को दोगुना करने के लिए प्रतिबद्ध हैं।"
            },
            content: {
                en: "International climate summit representatives concluded bilateral negotiations today by signing a landmark framework for clean energy financing. The agreement prioritizes cross-border technology transfers and subsidizes solar infrastructure.",
                hi: "अंतर्राष्ट्रीय जलवायु शिखर सम्मेलन के प्रतिनिधियों ने आज स्वच्छ ऊर्जा वित्तपोषण के लिए एक ऐतिहासिक समझौते पर हस्ताक्षर करके द्विपक्षीय बातचीत का समापन किया। यह समझौता सौर बुनियादी ढांचे को सब्सिडी देने को प्राथमिकता देता है।"
            }
        }
    ],
    Sports: [
        {
            title: {
                en: "National Athletics Championship: Record-Breaking Performances On Opening Day",
                hi: "राष्ट्रीय एथलेटिक्स चैंपियनशिप: उद्घाटन दिवस पर रिकॉर्ड तोड़ प्रदर्शन"
            },
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Sprint and track athletes set new national timing records during high-octane qualification rounds.",
                hi: "स्प्रिंट और ट्रैक एथलीटों ने हाई-ऑक्टेन क्वालीफिकेशन दौर के दौरान नए राष्ट्रीय टाइमिंग रिकॉर्ड बनाए।"
            },
            content: {
                en: "The annual National Athletics Championship kicked off today with stellar athletic achievements across track and field events. Elite sprinters shattered previous meet benchmarks in the 100m sprint finals.",
                hi: "वार्षिक राष्ट्रीय एथलेटिक्स चैंपियनशिप की शुरुआत आज ट्रैक और फील्ड स्पर्धाओं में शानदार उपलब्धियों के साथ हुई। 100 मीटर स्प्रिंट फाइनल में धावकों ने पिछले रिकॉर्ड तोड़ दिए।"
            }
        }
    ],
    Entertainment: [
        {
            title: {
                en: "International Film Festival Celebrates Breakthrough Cinema & Independent Creators",
                hi: "अंतर्राष्ट्रीय फिल्म महोत्सव में स्वतंत्र सिनेमा और रचनाकारों का उत्सव"
            },
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Critically acclaimed world cinema previews receive standing ovations from audience.",
                hi: "समीक्षकों द्वारा सराही गई विश्व सिनेमा की झांकियों को दर्शकों से भरपूर सराहना मिली।"
            },
            content: {
                en: "The annual international film festival opened with a star-studded red carpet gathering directors, actors, and indie filmmakers. Premieres featured diverse narrative storytelling.",
                hi: "वार्षिक अंतर्राष्ट्रीय फिल्म महोत्सव की शुरुआत रेड कार्पेट पर निर्देशकों, अभिनेताओं और इंडी फिल्म निर्माताओं के जमावड़े के साथ हुई।"
            }
        }
    ],
    Education: [
        {
            title: {
                en: "National Curriculum Framework Updated With Focus On AI & STEM Education",
                hi: "एआई और स्टेम शिक्षा पर ध्यान केंद्रित करने के साथ पाठ्यक्रम ढांचा अद्यतन"
            },
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Educational boards introduce hands-on coding and practical reasoning modules for students.",
                hi: "शिक्षा बोर्डों ने छात्रों के लिए कोडिंग और व्यावहारिक तर्क मॉड्यूल पेश किए हैं।"
            },
            content: {
                en: "School education authorities today released an updated curriculum guideline aimed at fostering problem-solving skills among secondary students. Foundational AI courses are now integrated.",
                hi: "स्कूली शिक्षा अधिकारियों ने आज माध्यमिक छात्रों के बीच समस्या-समाधान कौशल को बढ़ावा देने के उद्देश्य से एक अद्यतन पाठ्यक्रम दिशानिर्देश जारी किया।"
            }
        }
    ],
    Business: [
        {
            title: {
                en: "Stock Markets Touch Record Highs Driven By Strong Earnings Growth",
                hi: "मजबूत आय वृद्धि के चलते शेयर बाजार रिकॉर्ड स्तर पर पहुंचे"
            },
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Investor confidence surges following positive quarterly financial reports across banking sectors.",
                hi: "बैंकिंग क्षेत्रों में सकारात्मक तिमाही वित्तीय रिपोर्टों के बाद निवेशकों का विश्वास बढ़ा है।"
            },
            content: {
                en: "Equity benchmark indices rallied to fresh historic highs today, led by strong buying momentum in technology and banking stocks. Financial analysts attributed the rally to declining inflation.",
                hi: "प्रौद्योगिकी और बैंकिंग शेयरों में मजबूत खरीदारी के कारण इक्विटी बेंचमार्क सूचकांक आज नए ऐतिहासिक उच्चतम स्तर पर पहुंचे।"
            }
        }
    ]
};

function generateInitialVerifiedNews() {
    let data = [];
    const categories = Object.keys(CATEGORY_NEWS_DATA);

    let articleId = 1;
    for (let cycle = 0; cycle < 5; cycle++) {
        categories.forEach(cat => {
            const templates = CATEGORY_NEWS_DATA[cat];
            templates.forEach((tpl) => {
                data.push({
                    id: articleId,
                    title: tpl.title,
                    category: cat,
                    author: BYLINE_DEFAULT,
                    imageUrl: tpl.image,
                    summary: tpl.summary,
                    content: tpl.content,
                    publishedAt: new Date(Date.now() - articleId * 3600000 * 2).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    })
                });
                articleId++;
            });
        });
    }
    return data;
}

function init() {
    allArticles = generateInitialVerifiedNews();
    filteredArticles = [...allArticles];
    setupThemeToggle();
    setupLanguageToggle();
    renderFeed();
}

function renderFeed() {
    const container = document.getElementById('newsContainer');
    const badge = document.getElementById('articleCountBadge');
    container.innerHTML = '';

    badge.innerText = `${currentLang === 'hi' ? 'कुल खबरें' : 'Total'}: ${filteredArticles.length}`;

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = filteredArticles.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    if (paginatedItems.length === 0) {
        container.innerHTML = `<p class="col-span-2 text-center text-gray-500 py-10">${currentLang === 'hi' ? 'इस श्रेणी में कोई खबर नहीं मिली।' : 'No verified articles found.'}</p>`;
        document.getElementById('paginationControls').innerHTML = '';
        return;
    }

    paginatedItems.forEach(item => {
        const titleText = item.title[currentLang] || item.title['en'];
        const summaryText = item.summary[currentLang] || item.summary['en'];
        
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <img src="${item.imageUrl}" alt="${titleText}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <span class="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest">${item.category}</span>
                    <h3 class="text-base font-bold mt-1 line-clamp-2 hover:text-red-600 cursor-pointer text-gray-900 dark:text-white" onclick="openModal(${item.id})">${titleText}</h3>
                    <p class="text-[11px] text-gray-500 dark:text-gray-400 my-2">By ${item.author} • ${item.publishedAt}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">${summaryText}</p>
                </div>
            </div>
            <div class="p-4 pt-0">
                <button onclick="openModal(${item.id})" class="text-xs font-bold text-red-600 dark:text-red-400 hover:underline">${currentLang === 'hi' ? 'पूरी खबर पढ़ें →' : 'Read Full Article →'}</button>
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
        prevBtn.innerText = currentLang === 'hi' ? "पिछला" : "Previous";
        prevBtn.onclick = () => { currentPage--; renderFeed(); window.scrollTo(0, 0); };
        controls.appendChild(prevBtn);
    }

    const pageText = document.createElement('span');
    pageText.className = "text-xs font-bold px-2 text-gray-600 dark:text-gray-400";
    pageText.innerText = `${currentLang === 'hi' ? 'पेज' : 'Page'} ${currentPage} / ${totalPages}`;
    controls.appendChild(pageText);

    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = "px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-md";
        nextBtn.innerText = currentLang === 'hi' ? "अगला" : "Next";
        nextBtn.onclick = () => { currentPage++; renderFeed(); window.scrollTo(0, 0); };
        controls.appendChild(nextBtn);
    }
}

function filterCategory(cat) {
    currentCategory = cat;
    currentPage = 1;
    document.getElementById('currentCategoryTitle').innerText = cat === 'All' ? (currentLang === 'hi' ? 'ताजा बड़ी खबरें' : 'Latest Breaking News') : `${cat} News`;
    
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

    const titleText = article.title[currentLang] || article.title['en'];
    const contentText = article.content[currentLang] || article.content['en'];

    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(titleText);

    content.innerHTML = `
        <span class="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">${article.category}</span>
        <h2 class="text-xl font-black my-2 text-gray-900 dark:text-white leading-snug">${titleText}</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">By <strong class="text-gray-800 dark:text-gray-200">${article.author}</strong> • ${article.publishedAt}</p>
        
        <img src="${article.imageUrl}" alt="${titleText}" class="w-full h-60 object-cover rounded-xl mb-4">
        
        <div class="w-full h-20 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs text-gray-400 font-bold rounded-lg my-4">
            Google AdSense Placeholder (In-Article)
        </div>

        <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-200 space-y-3 leading-relaxed whitespace-pre-line">
            ${contentText}
        </div>

        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 items-center">
            <span class="text-xs font-bold text-gray-500">Share:</span>
            <a href="https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}" target="_blank" class="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded">WhatsApp</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded">Facebook</a>
            <a href="https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}" target="_blank" class="px-2.5 py-1 bg-black text-white text-xs font-bold rounded">X</a>
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

function setupLanguageToggle() {
    const headerRight = document.getElementById('themeToggle').parentElement;
    const langBtn = document.createElement('button');
    langBtn.id = 'langToggle';
    langBtn.className = "px-3 py-1.5 ml-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:opacity-90 transition";
    langBtn.innerText = "🇮🇳 हिंदी";
    
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'hi' : 'en';
        langBtn.innerText = currentLang === 'en' ? "🇮🇳 हिंदी" : "🇬🇧 English";
        init();
    });

    headerRight.appendChild(langBtn);
}

window.onload = init;
