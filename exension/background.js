// background.js
console.log('Service worker started');

async function checkUrl2(urlValue) {
    console.log('Checking URL:', urlValue);
    try {
        const response = await fetch('http://127.0.0.1:5000/predictURL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlValue })
        });

        const result = await response.json();
        console.log('Prediction:', result["prediction"]);

        return result["prediction"] === "malicious";
    } catch (error) {
        console.error('Error:', error);
        return false; // default to "safe" if there's an error
    }
}

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    const isPhishing = await checkUrl2(details.url);
    console.log("URL is phishing:", isPhishing);
    if (isPhishing) {
        chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("error.html") });
     
    }
}, { url: [{ schemes: ["http", "https"] }] });
