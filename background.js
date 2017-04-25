
window.onload = notify;

var map = {};

var categoryItems = [];
var categories = ['entertainment', 'education', 'social', 'research']
var categoryHits = [50,0,0]


var educationList = ["edu", "org", "gov"];
var socialList = ["facebook", "fb", "mig", "pinterest"];


function notify() {
    chrome.notifications.create("Plugin has been loaded", {
        type: 'basic',
        iconUrl: 'icon.png',
        title: "This is the title",
        message: 'Your plugin has been loaded.'
    }, analyzeHistory);
}

function hello(){
    return "Hey friend";
}

function analyzeHistory() {
    var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
    chrome.history.search({
        'text': ""
        //'startTime': oneWeekAgo
    }, computeHistory);
}

function computeHistory(historyArr) {
    var urls = "";
    for (var i in historyArr) {
        urls += historyArr[i].url + "-->" + historyArr[i].visitCount+"\n";
    }
    for (var i in historyArr) {
        var host = getCategoryForURL(historyArr[i].url, historyArr[i].visitCount);
        putInCategory(host, historyArr[i].visitCount);
    }
    //alert(urls)
    alert(categoryHits.toString());
}

function getCategoryForURL(url, count) {
        urlArray = url.split('/');
        urlHost = urlArray[2];
        // Check if the host belongs to entertainment or other categories.
        return urlHost;
}

function putInCategory(host, count) {
    var parsed = host.split('.');

    // Checks if the last extension of the host is definitely education related like
    // .gov or .edu
    if (educationList.indexOf(parsed[parsed.length-1]) > 0) {
        categoryHits[1] += count;
        return;
    }

    var name=[];
    
    if (parsed[0] != "www"){
        name.push(parsed[0])
    }
    name.push(parsed[1]);

    if (webIsSocialMedia(name, count)) {
        categories[0]++;
        return;
    }
}

function webIsSocialMedia(givenNames,count) {
    for (var i in givenNames) {
        var name = givenNames[i];
        
        
        for (var si in socialList) {
            if (socialList[si] == name) {
                categoryHits[2] += count;
                return true;
            }
        }
    }

    return false;
}