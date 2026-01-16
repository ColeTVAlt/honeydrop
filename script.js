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
    
    // Privacy: URL Encoding to bypass simple string filters
    const encoded = btoa(url); 
    console.log("Fetching encoded stream: ", encoded);

    // Using a fast, public CORS bridge for static proxying
    const proxy = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

    wrap.style.display = 'flex';
    frame.src = proxy;
}

function closeProxy() {
    document.getElementById('proxy-wrap').style.display = 'none';
    document.getElementById('proxy-frame').src = '';
}
