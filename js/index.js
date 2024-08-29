document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById("toggle-btn");
    const sidebar = document.querySelector('.izquierda');
    const sections = document.querySelectorAll('.section');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('closed');
        console.log("selecciono")
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});