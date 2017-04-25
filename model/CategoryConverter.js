class CategoryConverter {

    getCategoryForURL(url) {
        urlArray = url.split('/');
        urlHost = urlArray[2];

        // Check if the host belongs to entertainment or other categories.
        return urlHost;
    }
}