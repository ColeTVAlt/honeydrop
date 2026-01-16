function handleSearch(e) {
    if (e.key === 'Enter') {
        let val = document.getElementById('search-input').value;
        if (!val.includes('.')) {
            launch(`https://www.google.com/search?q=${val}`);
        } else {
            if (!val.startsWith('http')) val = 'https://' + val;
            launch(val);
        }
    }
}

function launch(url) {
    const wrap = document.getElementById('proxy-wrap');
    const frame = document.getElementById('proxy-frame');
    
    // Formatting the URL
    let targetUrl = url;
    if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;

    wrap.style.display = 'flex';
    
    /* Instead of AllOrigins (which just gets raw HTML), 
       we use a 'Corsproxy' or a custom 'Worker' prefix.
       This prefix handles the cookies and scripts so the site isn't blank.
    */
    const proxyPrefix = "https://worker-proud-sun-6094.rizzai-proxy.workers.dev/?url="; 
    
    frame.src = proxyPrefix + encodeURIComponent(targetUrl);
}

function closeProxy() {
    document.getElementById('proxy-wrap').style.display = 'none';
    document.getElementById('proxy-frame').src = '';
}
