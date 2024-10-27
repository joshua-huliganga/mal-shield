chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.url) {
        const link = document.getElementById('myLink');
        if (link) {
            link.href = request.url; // Update the link with the received URL
        }
    }
});