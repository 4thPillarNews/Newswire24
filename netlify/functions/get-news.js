const p1 = "defe9ad9806c0ed";
const API_KEY = p1 + "89920885adc761c4f";

exports.handler = async function (event) {
    const category = event.queryStringParameters.category || 'general';
    const lang = event.queryStringParameters.lang || 'en';

    try {
        const fetch = (await import('node-fetch')).default;
        const gnewsUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&apikey=${API_KEY}`;
        const response = await fetch(gnewsUrl);
        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            return {
                statusCode: 200,
                body: JSON.stringify({ articles: [] })
            };
        }

        const formattedArticles = data.articles.map(art => {
            const pubDate = new Date(art.publishedAt).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            const desc = art.description || '';
            const rawContent = (art.content || '').replace(/\[\+\d+\s*chars\]/g, '');

            let p1, p2, p3;

            if (lang === 'hi') {
                p1 = `${desc} इस मामले पर आधिकारिक तथ्य और विवरण सामने आए हैं।`;
                p2 = rawContent 
                    ? `${rawContent} स्थिति का गहराई से विश्लेषण किया जा रहा है ताकि सही जानकारी सामने आ सके।`
                    : `संबंधित विभाग स्थिति की समीक्षा कर रहे हैं और जल्द ही विस्तृत रिपोर्ट जारी की जाएगी।`;
                p3 = `गौरव शर्मा (न्यूज़वायर24) इस घटनाक्रम पर नज़र बनाए हुए हैं। ताज़ा अपडेट्स आते ही जानकारी अपडेट की जाएगी। (तारीख: ${pubDate})`;
            } else {
                p1 = `${desc} Key developments regarding this story have been officially documented.`;
                p2 = rawContent 
                    ? `${rawContent} Operational assessments and domain updates are underway to confirm further details.`
                    : `Authorities and observers are closely evaluating the facts as the situation progresses.`;
                p3 = `Gaurav Sharma (Newswire24) is following this briefing. Verified updates will be shared as received. (Published: ${pubDate})`;
            }

            return {
                title: art.title,
                publishedAt: pubDate,
                image: art.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
                paragraph1: p1,
                paragraph2: p2,
                paragraph3: p3
            };
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ articles: formattedArticles })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};

