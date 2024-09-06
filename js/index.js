document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById("toggle-btn");
    const sidebar = document.querySelector('.izquierda');
    const sections = document.querySelectorAll('.section');
    const body = document.body;
    const theme = document.getElementById("button-theme");
    const savedTheme = localStorage.getItem('theme');
    const btnIdioma = document.getElementById('button-idioma');
    let idioma = "ES"
    let idiomajson = {}; // Inicialización del objeto idiomajson

    // Deshabilitar el botón hasta que se cargue el JSON
    btnIdioma.disabled = true;

    
    //_________Carouse de imageness___________________________________________
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    // Clonar el primer elemento y añadirlo al final
    carousel.appendChild(items[0].cloneNode(true));

    function nextImage() {
        currentIndex++;
        updateCarousel(true);
    }

    function updateCarousel(isAutomatic = false) {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        if (currentIndex >= items.length) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = 0;
                carousel.style.transform = `translateX(0)`;
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.8s ease';
                }, 50);
            }, isAutomatic ? 800 : 0);
        }
    }

    // Cambiar imagen cada 3 segundos
    setInterval(nextImage, 3000);



    // Cargar el archivo JSON
    fetch('../idioma.json')
        .then(response => response.json())
        .then(data => {
            idiomajson = data;  // Asignar datos cargados a la variable idiomajson
            console.log('Datos JSON cargados:', idiomajson);

            // Habilitar el botón después de que los datos se hayan cargado
            btnIdioma.disabled = false;
        })
        .catch(error => {
            console.error('Error al leer el archivo JSON:', error);
        });

    // Manejar el tema guardado
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Manejar el cambio de tema
    theme.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.toggle('dark-theme');

        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark-theme');
        } else {
            localStorage.removeItem('theme');
        }
    });

    // Manejar el botón de cambio de idioma
    btnIdioma.addEventListener('click', (e) => {
        e.preventDefault();

        idioma = (idioma === "ES") ? "EN" : "ES";  // Cambiar idioma
        const idiomaLabel = document.getElementById("idioma-p");
        if ((idioma === "ES")) {
            idiomaLabel.textContent = "" + "EN"
        } else {
            idiomaLabel.textContent = "" + "ES"
        }

        // Verificar si el JSON ha sido cargado y la propiedad existe
        if (idiomajson) {
            document.getElementById("h1-about-me").textContent = idiomajson.sombremi[idioma];
            document.getElementById("proyecto-anime-titulo").textContent = idiomajson.paginaAnime[idioma]
            document.getElementById("menu-inicio").textContent = idiomajson.menuInicio[idioma]
            document.getElementById("menu-sobremi").textContent = idiomajson.menuSobremi[idioma]
            document.getElementById("menu-habilidades").textContent = idiomajson.menuHabilidades[idioma]
            document.getElementById("menu-proyectos").textContent = idiomajson.menuProyectos[idioma]
            document.getElementById("menu-contacto").textContent = idiomajson.menuContacto[idioma]
            document.getElementById("habilidades-lenguajes").textContent = idiomajson.habilidadesLenguajes[idioma]
            document.getElementById("habilidades-framework").textContent = idiomajson.habilidadesFramework[idioma]
            document.getElementById("habilidades-web").textContent = idiomajson.habilidadesWeb[idioma]
            document.getElementById("habilidades-basededatos").textContent = idiomajson.habilidadesBasededatos[idioma]
            document.getElementById("habilidades-plataformas").textContent = idiomajson.habilidadesPlataformas[idioma]
            document.getElementById("simulador-blockchain").textContent = idiomajson.simuladorBlockchain[idioma]

        } else {
            console.warn('JSON no cargado o propiedad "sombremi" no encontrada.');
        }
    });

    // Manejar el botón de toggle de la barra lateral
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('closed');
        console.log("selecciono");
    });

    // Observador de intersección para secciones
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
});
