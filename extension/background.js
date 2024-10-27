chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    // Call Flask API to check if the URL is a phishing link
    const isPhishing = await checkPhishingUrl(details.url);
    
    if (isPhishing) {
        // Redirect to a custom warning page if URL is a phishing link
        chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("warning.html") });
    }
}, { url: [{ schemes: ["http", "https"] }] });