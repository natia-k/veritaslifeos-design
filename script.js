// 1. Time-based Greeting (Sunsama vibe)
const greeting = document.getElementById('greeting');
const hour = new Date().getHours();

if (hour < 12) greeting.innerText = "Good Morning.";
else if (hour < 18) greeting.innerText = "Good Afternoon.";
else greeting.innerText = "Good Evening.";

// 2. Task Toggle Logic (Things 3 Style)
function toggleTask(element) {
    element.classList.toggle('completed');
    
    // Add "Spring" tactile feedback
    element.style.transform = "scale(0.96) translateX(6px)";
    setTimeout(() => {
        element.style.transform = element.classList.contains('completed') ? "scale(1)" : "translateX(6px)";
    }, 150);
}

// 3. Theme Management
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;

// Check for saved theme
const savedTheme = localStorage.getItem('veritas-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', nextTheme);
    localStorage.setItem('veritas-theme', nextTheme);
});

// 4. Keyboard Shortcut: Cmd + K (Anytype/Linear vibe)
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        alert("Command Palette: Search everything in Veritas LifeOS...");
    }
});
