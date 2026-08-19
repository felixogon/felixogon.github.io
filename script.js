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

const unicornCursor = document.createElement('span');
unicornCursor.className = 'unicorn-cursor';
unicornCursor.textContent = '\u{1F984}';
document.body.appendChild(unicornCursor);

document.addEventListener('mousemove', (event) => {
    unicornCursor.style.left = `${event.clientX}px`;
    unicornCursor.style.top = `${event.clientY}px`;
});
