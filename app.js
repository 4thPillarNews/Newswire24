const BYLINE_DEFAULT = "Gaurav Sharma";
const ITEMS_PER_PAGE = 10;

let allArticles = [];
let filteredArticles = [];
let currentPage = 1;
let currentCategory = 'All';
let currentLang = 'en';

const CATEGORY_NEWS_DATA = {
    National: [
        {
            id: 101,
            title: {
                en: "Union Cabinet Approves Major Highway Expansion Project Across States",
                hi: "केंद्रीय मंत्रिमंडल ने राज्यों में प्रमुख राजमार्ग विस्तार परियोजना को दी मंजूरी"
            },
            image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Government announces multi-lane expressways to boost trade and streamline transport connectivity across corridors.",
                hi: "सरकार ने व्यापार को बढ़ावा देने और गलियारों में परिवहन कनेक्टिविटी को बेहतर बनाने के लिए नए एक्सप्रेसवे की घोषणा की।"
            },
            content: {
                en: "The Union Cabinet has granted administrative approval for a national highway expansion project aimed at enhancing overall logistics efficiency across industrial corridors.\n\nThe comprehensive strategic framework focuses on expanding high-density traffic routes, upgrading tolling infrastructure with automated digital systems, and strengthening connectivity between major manufacturing hubs.\n\nKey officials confirmed that phase-one development will begin within the upcoming quarter. The initiative is projected to significantly lower freight transit times, boost regional commerce, and generate thousands of direct employment opportunities.",
                hi: "केंद्रीय मंत्रिमंडल ने औद्योगिक गलियारों में रसद दक्षता को बढ़ाने के उद्देश्य से राष्ट्रीय राजमार्ग विस्तार परियोजना को प्रशासनिक स्वीकृति प्रदान की है।\n\nरणनीतिक ढांचे का ध्यान भीड़भाड़ वाले मार्गों के चौड़ीकरण, डिजिटल टोलिंग प्रणालियों के आधुनिकीकरण और प्रमुख विनिर्माण केंद्रों के बीच कनेक्टिविटी मजबूत करने पर केंद्रित है।\n\nअधिकारियों ने पुष्टि की कि प्रथम चरण का विकास आगामी तिमाही के भीतर शुरू होगा। इस पहल से माल ढुलाई के समय में उल्लेखनीय कमी आने, क्षेत्रीय व्यापार को बढ़ावा मिलने और हजारों रोजगार पैदा होने की उम्मीद है।"
            }
        },
        {
            id: 102,
            title: {
                en: "Digital Governance Portal Launched to Streamline Public Documentation",
                hi: "सार्वजनिक दस्तावेजों को सुव्यवस्थित करने के लिए नया डिजिटल गवर्नेंस पोर्टल लॉन्च"
            },
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Unified online portal provides citizens seamless access to civic services and welfare application processing.",
                hi: "एकीकृत ऑनलाइन पोर्टल नागरिकों को नागरिक सेवाओं और कल्याणकारी आवेदनों की प्रोसेसिंग तक सहज पहुंच प्रदान करता है।"
            },
            content: {
                en: "In a continuous effort to advance digital governance, government authorities today launched a comprehensive unified online public service system.\n\nThe digital portal consolidates multiple civic verification functions into a single interface, allowing citizens to apply for certificates and manage municipal utilities without visiting regional offices.\n\nOfficials stated that regional help desks and digital literacy campaigns will be established to assist citizens in rural areas, ensuring inclusive adoption across all demographics.",
                hi: "डिजिटल गवर्नेंस को बढ़ावा देने के प्रयास में, सरकार ने आज एक एकीकृत ऑनलाइन सार्वजनिक सेवा प्रणाली शुरू की है।\n\nयह डिजिटल पोर्टल कई नागरिक सत्यापन कार्यों को एक ही प्लेटफॉर्म पर समेकित करता है, जिससे नागरिक प्रमाणपत्रों के लिए आवेदन कर सकते हैं और नागरिक सुविधाओं का प्रबंधन बिना क्षेत्रीय कार्यालयों के चक्कर काटे कर सकते हैं।\n\nअधिकारियों ने कहा कि ग्रामीण क्षेत्रों में नागरिकों की सहायता के लिए सहायता केंद्र स्थापित किए जाएंगे ताकि सभी वर्गों तक इसका लाभ पहुंच सके।"
            }
        }
    ],
    International: [
        {
            id: 201,
            title: {
                en: "Global Climate Summit Reaches Consensus on Renewable Energy Investments",
                hi: "वैश्विक जलवायु शिखर सम्मेलन में अक्षय ऊर्जा निवेश पर बनी आम सहमति"
            },
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Delegates from over 80 nations commit to doubling solar and wind capacity over the next decade.",
                hi: "80 से अधिक देशों के प्रतिनिधि अगले दशक में सौर और पवन ऊर्जा क्षमता को दोगुना करने के लिए प्रतिबद्ध हैं।"
            },
            content: {
                en: "International climate summit representatives concluded high-level multilateral discussions today by establishing a binding framework for clean energy financing.\n\nDelegations from participating countries agreed to accelerate the global transition toward renewable power generation, committing to double solar and wind generation capacity within the coming decade.\n\nThe accord outlines specific financial mechanisms to assist developing nations in acquiring advanced clean energy infrastructure and modernizing power grids.",
                hi: "अंतर्राष्ट्रीय जलवायु शिखर सम्मेलन के प्रतिनिधियों ने स्वच्छ ऊर्जा वित्तपोषण के लिए एक बाध्यकारी ढांचे की स्थापना करके उच्च स्तरीय बहुपक्षीय चर्चाओं का समापन किया।\n\nभाग लेने वाले देशों के प्रतिनिधिमंडल आने वाले दशक में सौर और पवन उत्पादन क्षमता को दोगुना करने के लिए प्रतिबद्ध हुए हैं।\n\nयह समझौता विकासशील देशों को उन्नत स्वच्छ ऊर्जा बुनियादी ढांचा प्राप्त करने और बिजली ग्रिड के आधुनिकीकरण में सहायता करने के लिए विशिष्ट वित्तीय तंत्र की रूपरेखा तैयार करता है।"
            }
        }
    ],
    Sports: [
        {
            id: 301,
            title: {
                en: "National Athletics Championship: Record Performances On Opening Day",
                hi: "राष्ट्रीय एथलेटिक्स चैंपियनशिप: उद्घाटन दिवस पर बने नए राष्ट्रीय रिकॉर्ड"
            },
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Sprint and track athletes set new national timing benchmarks during qualification rounds.",
                hi: "स्प्रिंट और ट्रैक एथलीटों ने क्वालीफिकेशन दौर के दौरान नए राष्ट्रीय टाइमिंग रिकॉर्ड बनाए।"
            },
            content: {
                en: "The annual National Athletics Championship opened today with extraordinary athletic achievements across multiple track and field categories.\n\nTop-tier sprinters established impressive new national timing records during the preliminary qualification rounds, drawing enthusiastic applause from stadium spectators.\n\nThe tournament will continue over the weekend, featuring finals in middle-distance running, long jump, and relay events. Victors will qualify directly for international games.",
                hi: "वार्षिक राष्ट्रीय एथलेटिक्स चैंपियनशिप की शुरुआत आज कई ट्रैक और फील्ड श्रेणियों में असाधारण प्रदर्शन के साथ हुई।\n\nशुरुआती क्वालीफिकेशन दौर के दौरान शीर्ष धावकों ने नए राष्ट्रीय टाइमिंग रिकॉर्ड बनाए, जिन्हें दर्शकों की भरपूर सराहना मिली।\n\nटूर्नामेंट सप्ताहांत के दौरान जारी रहेगा, जिसमें मिडिल-डिस्टेंस रनिंग, लॉन्ग जंप और रिले इवेंट्स के फाइनल शामिल होंगे।"
            }
        }
    ],
    Entertainment: [
        {
            id: 401,
            title: {
                en: "International Film Festival Celebrates Breakthrough Independent Cinema",
                hi: "अंतर्राष्ट्रीय फिल्म महोत्सव में स्वतंत्र सिनेमा और नवोदित प्रतिभाओं का उत्सव"
            },
            image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Critically acclaimed world cinema previews receive standing ovations from audience and directors.",
                hi: "समीक्षकों द्वारा सराही गई विश्व सिनेमा की झांकियों को दर्शकों और निर्देशकों से भरपूर सराहना मिली।"
            },
            content: {
                en: "The annual international film festival opened today with a grand red carpet showcase featuring renowned directors, actors, and independent creators.\n\nPremieres included a diverse array of feature films, documentary projects, and experimental shorts focusing on contemporary cultural themes.\n\nThe week-long festival will feature masterclasses led by acclaimed cinema professionals, technical workshops on digital restoration, and award presentations recognizing standout contributions.",
                hi: "वार्षिक अंतर्राष्ट्रीय फिल्म महोत्सव की शुरुआत आज एक भव्य रेड कार्पेट शोकेस के साथ हुई, जिसमें दुनिया भर के प्रसिद्ध निर्देशक और स्वतंत्र फिल्म निर्माता एकत्र हुए।\n\nइस महोत्सव में समकालीन सांस्कृतिक विषयों पर केंद्रित फीचर फिल्मों और वृत्तचित्र परियोजनाओं का प्रीमियर शामिल था।\n\nसप्ताह भर चलने वाले इस महोत्सव में मास्टरक्लास, तकनीकी कार्यशालाएं और कहानी कहने के क्षेत्र में उत्कृष्ट योगदान को मान्यता देने वाले पुरस्कार समारोह शामिल होंगे।"
            }
        }
    ],
    Education: [
        {
            id: 501,
            title: {
                en: "National Curriculum Updated With Practical AI & Computing Modules",
                hi: "पाठ्यक्रम में संशोधन: एआई और कंप्यूटर शिक्षा पर विशेष ध्यान"
            },
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Educational boards introduce hands-on coding and reasoning modules for secondary students.",
                hi: "शिक्षा बोर्डों ने माध्यमिक छात्रों के लिए कोडिंग और व्यावहारिक तर्क मॉड्यूल पेश किए हैं।"
            },
            content: {
                en: "Educational authorities today released an updated curriculum framework designed to enhance practical problem-solving skills and technical literacy among secondary school students.\n\nThe revised guidelines integrate foundational modules in artificial intelligence, computational logic, and hands-on laboratory experimentation into standard learning tracks.\n\nAcademic advisors emphasized that the updated framework shifts pedagogical focus away from passive memorization toward interactive, inquiry-based learning.",
                hi: "शिक्षा अधिकारियों ने आज माध्यमिक छात्रों के बीच व्यावहारिक समस्या-समाधान कौशल और तकनीकी साक्षरता को बढ़ाने के लिए एक नया पाठ्यक्रम ढांचा जारी किया।\n\nसंशोधित दिशानिर्देश मानक शिक्षण ट्रैक में आर्टिफिशियल इंटेलिजेंस और प्रयोगात्मक प्रयोगशाला मॉड्यूल को एकीकृत करते हैं।\n\nशैक्षणिक सलाहकारों ने जोर देकर कहा कि नया ढांचा केवल रटने की प्रणाली से हटकर इंटरैक्टिव शिक्षण की ओर ध्यान केंद्रित करता है।"
            }
        }
    ],
    Business: [
        {
            id: 601,
            title: {
                en: "Stock Markets Touch Record Highs Driven By Strong Corporate Earnings",
                hi: "मजबूत कॉरपोरेट आय वृद्धि के चलते शेयर बाजार रिकॉर्ड स्तर पर पहुंचे"
            },
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
            summary: {
                en: "Investor confidence surges following positive quarterly financial reports across key sectors.",
                hi: "प्रमुख क्षेत्रों में सकारात्मक तिमाही रिपोर्टों के बाद निवेशकों का विश्वास बढ़ा है।"
            },
            content: {
                en: "Benchmark equity indices surged to new record highs during today's trading session, driven by sustained institutional buying across banking, technology, and manufacturing sectors.\n\nStrong quarterly earning statements and steady macroeconomic indicators contributed to upbeat market sentiment.\n\nFinancial analysts highlighted that robust domestic demand and controlled inflation figures have strengthened investor trust in broader market resilience.",
                hi: "बैंकिंग, प्रौद्योगिकी और विनिर्माण क्षेत्रों में निरंतर संस्थागत खरीदारी के कारण आज के कारोबारी सत्र के दौरान सूचकांक नए रिकॉर्ड स्तर पर पहुंचे।\n\nमजबूत तिमाही परिणाम और स्थिर मैक्रोइकोनॉमिक संकेतकों ने बाजार की धारणा को मजबूत करने में योगदान दिया।\n\nवित्तीय विश्लेषकों ने कहा कि मजबूत घरेलू मांग और नियंत्रित मुद्रास्फीति के आंकड़ों ने बाजार के प्रति निवेशकों के भरोसे को मजबूत किया है।"
            }
        }
    ]
};

function generateNewsData() {
    let list = [];
    Object.keys(CATEGORY_NEWS_DATA).forEach(cat => {
        CATEGORY_NEWS_DATA[cat].forEach(item => {
            list.push({
                ...item,
                category: cat,
                author: BYLINE_DEFAULT,
                publishedAt: new Date().toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                })
            });
        });
    });
    return list;
}

function init() {
    allArticles = generateNewsData();
    filteredArticles = [...allArticles];
    setupButtons();
    renderFeed();
}

function renderFeed() {
    const container = document.getElementById('newsContainer');
    const badge = document.getElementById('articleCountBadge');
    if (!container) return;

    container.innerHTML = '';
    if (badge) badge.innerText = `${currentLang === 'hi' ? 'कुल खबरें' : 'Total'}: ${filteredArticles.length}`;

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const items = filteredArticles.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    if (items.length === 0) {
        container.innerHTML = `<p class="col-span-2 text-center text-gray-500 py-10">${currentLang === 'hi' ? 'कोई खबर नहीं मिली।' : 'No articles found.'}</p>`;
        document.getElementById('paginationControls').innerHTML = '';
        return;
    }

    items.forEach(item => {
        const titleText = item.title[currentLang] || item.title['en'];
        const summaryText = item.summary[currentLang] || item.summary['en'];

        const card = document.createElement('div');
        card.className = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <img src="${item.image}" alt="${titleText}" class="w-full h-48 object-cover">
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
    if (!controls) return;
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
    const catTitle = document.getElementById('currentCategoryTitle');
    if (catTitle) {
        catTitle.innerText = cat === 'All' ? (currentLang === 'hi' ? 'ताजा बड़ी खबरें' : 'Latest Breaking News') : `${cat} News`;
    }

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
        
        <img src="${article.image}" alt="${titleText}" class="w-full h-60 object-cover rounded-xl mb-4">
        
        <div class="w-full h-20 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs text-gray-400 font-bold rounded-lg my-4">
            Google AdSense Placeholder
        </div>

        <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-200 space-y-4 leading-relaxed whitespace-pre-line">
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

function showLegalPage(type) {
    const modal = document.getElementById('articleModal');
    const content = document.getElementById('modalContent');

    let title = "";
    let body = "";

    if (type === 'about') {
        title = "About Us";
        body = "Welcome to Newswire24. We are committed to bringing you fast, verified, and trusted daily news coverage across National, International, Sports, Entertainment, Education, and Business sectors. Maintained by Gaurav Sharma.";
    } else if (type === 'privacy') {
        title = "Privacy Policy";
        body = "At Newswire24, we respect your privacy. We do not sell or misuse user personal data. Third-party vendors, including Google AdSense, may use cookies to serve ads based on prior visits.";
    } else if (type === 'terms') {
        title = "Terms & Conditions";
        body = "All content provided on Newswire24 is for informational purposes only. Reproduction of any materials without written authorization is prohibited.";
    } else if (type === 'disclaimer') {
        title = "Disclaimer";
        body = "Newswire24 strives to publish factual news. However, we assume no responsibility or liability for omissions or errors in the content presented.";
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
            themeBtn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        };
    }

    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.onclick = () => {
            currentLang = currentLang === 'en' ? 'hi' : 'en';
            langBtn.innerText = currentLang === 'en' ? "🇮🇳 हिंदी" : "🇬🇧 English";
            filterCategory(currentCategory);
        };
    }
}

window.onload = init;
