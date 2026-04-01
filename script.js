function toggleTask(element) {
    element.classList.toggle('completed');
    // Add a haptic-style click feel
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1.01)';
    }, 100);
}
