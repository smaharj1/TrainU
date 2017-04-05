window.onload = notify;

var allItems = [];
var categories = ['entertainment', 'education', 'social']
var categoryHits = [50,300,20]

function notify() {
    chrome.notifications.create("Plugin has been loaded", {
        type: 'basic',
        iconUrl: 'icon.png',
        title: "This is the title",
        message: 'Your plugin has been loaded.'
    }, analyzeHistory);
}

function analyzeHistory() {
    chrome.history.search({
        text: ""
    }, computeHistory);
}

function computeHistory(historyArr) {
    
}