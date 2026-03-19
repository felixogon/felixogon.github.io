function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-btn');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        if(btn) btn.innerHTML = "Switch to Light";
    } else {
        localStorage.setItem('theme', 'light');
        if(btn) btn.innerHTML = "Switch to Dark";
    }
}
