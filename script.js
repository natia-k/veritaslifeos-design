// 1. Time-based Greeting (Sunsama vibe)
const greeting = document.getElementById('greeting');
const hour = new Date().getHours();

if (hour < 12) greeting.innerText = "Good Morning.";
else if (hour < 18) greeting.innerText = "Good Afternoon.";
else greeting.innerText = "Good Evening.";

// 2. Task Toggle (Things 3 Pop)
function toggleTask(element) {
    element.classList.toggle('completed');
    
    // Add tactile feedback
    element.style.transform = "scale(0.97)";
    setTimeout(() => {
        element.style.transform = element.classList.contains('completed') ? "scale(1)" : "translateX(6px)";
    }, 100);
}

// 3. Theme Toggle
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
});

// 4. Command Palette Listener (Cmd + K)
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Trigger UI for command palette here
        console.log("Command Palette Triggered");
    }
});
