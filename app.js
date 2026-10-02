const BYLINE_DEFAULT = "Gaurav Sharma";
const ITEMS_PER_PAGE = 10;
const MAX_FIFO_LIMIT = 400;

let allArticles = [];
let filteredArticles = [];
let currentPage = 1;
let currentCategory = 'All';
let currentLang = 'en';

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
                en: "The Union Cabinet has granted administrative approval for a national highway expansion project aimed at enhancing overall logistics efficiency across industrial corridors. The comprehensive strategic framework focuses on expanding high-density traffic routes, upgrading tolling infrastructure with automated digital systems, and strengthening connectivity between major manufacturing hubs.\n\nKey officials confirmed that phase-one development will begin within the upcoming quarter. The initiative is projected to significantly lower freight transit times, boost regional commerce, and generate thousands of direct and indirect employment opportunities across various sectors.\n\nFurthermore, state transport authorities will collaborate with urban planning boards to ensure seamless integration with local public transit networks. Modern safety standards and eco-friendly construction practices will be enforced throughout the development phase.",
                hi: "केंद्रीय मंत्रिमंडल ने औद्योगिक गलियारों में रसद दक्षता को बढ़ाने के उद्देश्य से राष्ट्रीय राजमार्ग विस्तार परियोजना को प्रशासनिक स्वीकृति प्रदान की है। रणनीतिक ढांचे का ध्यान भीड़भाड़ वाले मार्गों के चौड़ीकरण, ऑटोमेटेड डिजिटल प्रणालियों के साथ टोल बुनियादी ढांचे के आधुनिकीकरण और प्रमुख विनिर्माण केंद्रों के बीच कनेक्टिविटी मजबूत करने पर केंद्रित है।\n\nअधिकारियों ने पुष्टि की कि प्रथम चरण का विकास आगामी तिमाही के भीतर शुरू होगा। इस पहल से माल ढुलाई के समय में उल्लेखनीय कमी आने, क्षेत्रीय व्यापार को बढ़ावा मिलने और कई क्षेत्रों में हजारों प्रत्यक्ष व अप्रत्यक्ष रोजगार के अवसर पैदा होने की उम्मीद है।\n\nइसके अलावा, राज्य परिवहन प्राधिकरण स्थानीय सार्वजनिक पारगमन नेटवर्क के साथ सहज एकीकरण सुनिश्चित करने के लिए शहरी नियोजन बोर्डों के साथ मिलकर काम करेंगे।"
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
                en: "In a continuous effort to advance digital governance, government authorities today launched a comprehensive unified online public service system. The digital portal consolidates multiple civic verification functions into a single interface, allowing citizens to apply for certificates, review welfare eligibility, and manage municipal utilities without visiting regional offices.\n\nThe system utilizes end-to-end encryption to safeguard user data while reducing administrative turnaround times for routine applications. Automated status tracking and instant notification services have also been integrated to provide real-time updates to applicants.\n\nOfficials stated that regional help desks and digital literacy campaigns will be established to assist citizens in rural areas, ensuring inclusive adoption of the updated portal across all demographics.",
                hi: "डिजिटल गवर्नेंस को बढ़ावा देने के प्रयास में, सरकार ने आज एक एकीकृत ऑनलाइन सार्वजनिक सेवा प्रणाली शुरू की है। यह डिजिटल पोर्टल कई नागरिक सत्यापन कार्यों को एक ही प्लेटफॉर्म पर समेकित करता है, जिससे नागरिक प्रमाणपत्रों के लिए आवेदन कर सकते हैं और नागरिक सुविधाओं का प्रबंधन बिना क्षेत्रीय कार्यालयों के चक्कर काटे कर सकते हैं।\n\nप्रणाली उपयोगकर्ता डेटा की सुरक्षा के लिए एंड-टू-एंड एन्क्रिप्शन का उपयोग करती है जबकि नियमित आवेदनों के लिए प्रशासनिक समय को कम करती है। आवेदकों को रियल-टाइम अपडेट प्रदान करने के लिए स्वचालित स्थिति ट्रैकिंग और सूचना सेवाएं भी एकीकृत की गई हैं।\n\nअधिकारियों ने कहा कि ग्रामीण क्षेत्रों में नागरिकों की सहायता के लिए क्षेत्रीय हेल्प डेस्क स्थापित किए जाएंगे ताकि सभी वर्गों तक इसका लाभ पहुंच सके।"
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
                en: "International climate summit representatives concluded high-level multilateral discussions today by establishing a binding framework for clean energy financing. Delegations from participating countries agreed to accelerate the global transition toward renewable power generation, committing to double solar and wind generation capacity within the coming decade.\n\nThe accord outlines specific financial mechanisms to assist developing nations in acquiring advanced clean energy infrastructure and modernizing power grids. Strategic international funds will be directed toward technology transfers and research collaborations focused on high-efficiency energy storage systems.\n\nGlobal policy analysts commended the multilateral agreement, noting that clear targets and transparent monitoring standards will play a vital role in curbing overall emissions while supporting stable global economic development.",
                hi: "अंतर्राष्ट्रीय जलवायु शिखर सम्मेलन के प्रतिनिधियों ने स्वच्छ ऊर्जा वित्तपोषण के लिए एक बाध्यकारी ढांचे की स्थापना करके उच्च स्तरीय बहुपक्षीय चर्चाओं का समापन किया। भाग लेने वाले देशों के प्रतिनिधिमंडल आने वाले दशक में सौर और पवन उत्पादन क्षमता को दोगुना करने के लिए प्रतिबद्ध हुए हैं।\n\nयह समझौता विकासशील देशों को उन्नत स्वच्छ ऊर्जा बुनियादी ढांचा प्राप्त करने और बिजली ग्रिड के आधुनिकीकरण में सहायता करने के लिए विशिष्ट वित्तीय तंत्र की रूपरेखा तैयार करता है। प्रौद्योगिकी हस्तांतरण और अनुसंधान सहयोग की दिशा में अंतरराष्ट्रीय कोष निर्देशित किए जाएंगे।\n\nवैश्विक नीति विश्लेषकों ने बहुपक्षीय समझौते की सराहना की और कहा कि स्पष्ट लक्ष्य और पारदर्शी निगरानी मानक उत्सर्जन को रोकने में महत्वपूर्ण भूमिका निभाएंगे।"
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
                en: "The annual National Athletics Championship opened today with extraordinary athletic achievements across multiple track and field categories. Top-tier sprinters established impressive new national timing records during the preliminary qualification rounds, drawing enthusiastic applause from stadium spectators.\n\nCoaching staff and sports analysts attributed the improved athletic standards to enhanced conditioning programs, modernized training facilities, and increased international exposure for young talent over the past year.\n\nThe tournament will continue over the weekend, featuring finals in middle-distance running, long jump, and relay events. Victors in this championship will qualify directly for the upcoming international athletic games roster.",
                hi: "वार्षिक राष्ट्रीय एथलेटिक्स चैंपियनशिप की शुरुआत आज कई ट्रैक और फील्ड श्रेणियों में असाधारण प्रदर्शन के साथ हुई। शुरुआती क्वालीफिकेशन दौर के दौरान शीर्ष धावकों ने नए राष्ट्रीय टाइमिंग रिकॉर्ड बनाए।\n\nकोचिंग स्टाफ और खेल विश्लेषकों ने पिछले एक साल में बेहतर कंडीशनिंग कार्यक्रमों, आधुनिक प्रशिक्षण सुविधाओं और युवा प्रतिभाओं के अंतरराष्ट्रीय अनुभव को इन शानदार परिणामों का श्रेय दिया।\n\nटूर्नामेंट सप्ताहांत के दौरान जारी रहेगा, जिसमें मिडिल-डिस्टेंस रनिंग, लॉन्ग जंप और रिले इवेंट्स के फाइनल शामिल होंगे। विजेता आगामी अंतरराष्ट्रीय खेलों के लिए सीधे क्वालीफाई करेंगे।"
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
                en: "Critically acclaimed world cinema previews receive standing ovations from audience and critics.",
                hi: "समीक्षकों द्वारा सराही गई विश्व सिनेमा की झांकियों को दर्शकों और आलोचकों से भरपूर सराहना मिली।"
            },
            content: {
                en: "The annual international film festival opened today with a grand red carpet showcase featuring renowned directors, actors, and independent filmmakers from around the globe. Premieres included a diverse array of feature films, documentary projects, and experimental shorts focusing on contemporary cultural themes.\n\nAudience members and film critics praised the opening night selections, highlighting the exceptional narrative depth and cinematography on display. Panel discussions held alongside screenings provided emerging creators with valuable networking opportunities and industry insights.\n\nThe week-long festival will feature masterclasses led by acclaimed cinema professionals, technical workshops on digital restoration, and award presentations recognizing standout contributions in storytelling and direction.",
                hi: "वार्षिक अंतर्राष्ट्रीय फिल्म महोत्सव की शुरुआत आज एक भव्य रेड कार्पेट शोकेस के साथ हुई, जिसमें दुनिया भर के प्रसिद्ध निर्देशक, अभिनेता और स्वतंत्र फिल्म निर्माता एकत्र हुए।\n\nदर्शकों और फिल्म आलोचकों ने उद्घाटन रात के चयनों की सराहना की, जिसमें कहानी की गहराई और सिनेमैटोग्राफी को उजागर किया गया। प्रदर्शनियों के साथ आयोजित पैनल चर्चाओं ने उभरते रचनाकारों को उद्योग के अनुभव और नेटवर्किंग के अवसर प्रदान किए।\n\nसप्ताह भर चलने वाले इस महोत्सव में मास्टरक्लास, डिजिटल रिस्टोरेशन पर तकनीकी कार्यशालाएं और कहानी कहने के क्षेत्र में उत्कृष्ट योगदान को मान्यता देने वाले पुरस्कार समारोह शामिल होंगे।"
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
                en: "Educational boards introduce hands-on coding and practical reasoning modules for secondary students.",
                hi: "शिक्षा बोर्डों ने माध्यमिक छात्रों के लिए कोडिंग और व्यावहारिक तर्क मॉड्यूल पेश किए हैं।"
            },
            content: {
                en: "Educational authorities today released an updated curriculum framework designed to enhance practical problem-solving skills and technical literacy among secondary school students. The revised guidelines integrate foundational modules in artificial intelligence, computational logic, and hands-on laboratory experimentation into standard learning tracks.\n\nAcademic advisors emphasized that the updated framework shifts pedagogical focus away from passive memorization toward interactive, inquiry-based learning. Teacher training workshops are currently underway across districts to ensure smooth classroom implementation.\n\nParent-teacher associations and educational researchers have welcomed the modernization effort, stating that early exposure to analytical reasoning prepares students effectively for higher education and modern workforce requirements.",
                hi: "शिक्षा अधिकारियों ने आज माध्यमिक छात्रों के बीच व्यावहारिक समस्या-समाधान कौशल और तकनीकी साक्षरता को बढ़ाने के लिए एक अपडेटेड पाठ्यक्रम ढांचा जारी किया। संशोधित दिशानिर्देश मानक शिक्षण ट्रैक में आर्टिफिशियल इंटेलिजेंस और प्रयोगात्मक प्रयोगशाला मॉड्यूल को एकीकृत करते हैं।\n\nशैक्षणिक सलाहकारों ने जोर देकर कहा कि अपडेटेड ढांचा केवल रटने की प्रणाली से हटकर इंटरैक्टिव शिक्षण की ओर ध्यान केंद्रित करता है। सुचारू कार्यान्वयन सुनिश्चित करने के लिए जिला स्तर पर शिक्षक प्रशिक्षण कार्यशालाएं चल रही हैं।\n\nअभिभावक-शिक्षक संघों ने इस आधुनिकीकरण का स्वागत किया है और कहा है कि विश्लेषणात्मक सोच की शुरुआती समझ छात्रों को उच्च शिक्षा के लिए तैयार करती है।"
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
                en: "Benchmark equity indices surged to new record highs during today's trading session, driven by sustained institutional buying across banking, technology, and manufacturing sectors. Strong quarterly earning statements and steady macroeconomic indicators contributed to upbeat market sentiment.\n\nFinancial analysts highlighted that robust domestic demand and controlled inflation figures have strengthened investor trust in broader market resilience. Foreign institutional investors maintained net positive buying activity for the third consecutive week.\n\nMarket experts advise retail investors to remain focused on fundamentally strong companies while maintaining balanced portfolio diversification amid evolving global trade dynamic variables.",
                hi: "बैंकिंग, प्रौद्योगिकी और विनिर्माण क्षेत्रों में निरंतर संस्थागत खरीदारी के कारण आज के कारोबारी सत्र के दौरान बेंचमार्क सूचकांक नए रिकॉर्ड स्तर पर पहुंचे। मजबूत तिमाही परिणाम और स्थिर मैक्रोइकोनॉमिक संकेतकों ने बाजार की धारणा को मजबूत करने में योगदान दिया।\n\nवित्तीय विश्लेषकों ने कहा कि मजबूत घरेलू मांग और नियंत्रित मुद्रास्फीति के आंकड़ों ने बाजार के प्रति निवेशकों के भरोसे को मजबूत किया है। विदेशी संस्थागत निवेशकों ने लगातार तीसरे सप्ताह सकारात्मक खरीदारी गतिविधि बनाए रखी।\n\nबाजार विशेषज्ञों का मानना है कि बुनियादी रूप से मजबूत कंपनियों पर ध्यान केंद्रित करना और संतुलित पोर्टफोलियो बनाए रखना फायदेमंद रहेगा।"
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

function setupThemeToggle() {
    const btn = document.getElementById('themeToggle');
    btn.onclick = () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        btn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    };
}

function setupLanguageToggle() {
    let langBtn = document.getElementById('langToggle');
    if (!langBtn) {
        const headerRight = document.getElementById('themeToggle').parentElement;
        langBtn = document.createElement('button');
        langBtn.id = 'langToggle';
        langBtn.className = "px-3 py-1.5 ml-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:opacity-90 transition";
        headerRight.appendChild(langBtn);
    }
    
    langBtn.innerText = currentLang === 'en' ? "🇮🇳 हिंदी" : "🇬🇧 English";
    
    langBtn.onclick = () => {
        currentLang = currentLang === 'en' ? 'hi' : 'en';
        langBtn.innerText = currentLang === 'en' ? "🇮🇳 हिंदी" : "🇬🇧 English";
        renderFeed();
    };
}

window.onload = init;
