document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initNavbar();
    initScrollAnimations();
    initBackToTop();
    initContactForm();
});

// ===== DATA LOADING =====
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderMission(data.presentation.mission);
        renderPourquoi(data.presentation);
        renderPacks(data.packs);
        renderSimulations(data.simulations);
        renderRealisations(data.realisations);
        renderTemoignages(data.temoignages);
        renderModalites(data.modalites);
    } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
    }
}

// ===== RENDER FUNCTIONS =====
function renderMission(mission) {
    document.getElementById('mission-intro').textContent = mission.intro;
    document.getElementById('mission-role').textContent = mission.role;
    document.getElementById('mission-positionnement').textContent = mission.positionnement;
    document.getElementById('mission-deontologie').textContent = mission.deontologie;
}

function renderPourquoi(presentation) {
    document.getElementById('pourquoi-intro').textContent = presentation.pourquoi.intro;
    document.getElementById('pourquoi-solution').textContent = presentation.pourquoi.solution;

    const tbody = document.getElementById('comparatif-body');
    tbody.innerHTML = presentation.comparatif.map(row => `
        <tr>
            <td>${row.critere}</td>
            <td class="col-sans">${row.sans}</td>
            <td>${row.avec}</td>
        </tr>
    `).join('');
}

function renderPacks(packs) {
    const grid = document.getElementById('packs-grid');
    grid.innerHTML = packs.map(pack => {
        const featuredClass = pack.featured ? ' featured' : '';
        const livrables = pack.livrables.map(l => `
            <div class="pack-livrable">${l}</div>
        `).join('');

        let notes = '';
        if (pack.prerequis) {
            notes += `<div class="pack-prerequis">${pack.prerequis}</div>`;
        }
        if (pack.note) {
            notes += `<div class="pack-note">${pack.note}</div>`;
        }

        return `
            <div class="pack-card${featuredClass} fade-in">
                <div class="pack-nom">${pack.nom}</div>
                <div class="pack-titre">${pack.titre}</div>
                <div class="pack-objectif">${pack.objectif}</div>
                <div class="pack-contenu">${pack.contenu}</div>
                <div class="pack-livrables-title">Livrables</div>
                <div class="pack-livrables">${livrables}</div>
                <div class="pack-tarif">${pack.tarif}</div>
                ${notes}
            </div>
        `;
    }).join('');

    // Re-observe new fade-in elements
    observeNewElements();
}

function renderSimulations(simulations) {
    const grid = document.getElementById('simulations-grid');
    grid.innerHTML = simulations.map(sim => `
        <div class="simulation-card fade-in">
            <div class="simulation-projet">${sim.projet}</div>
            <div class="simulation-row">
                <span class="simulation-label">Honoraires Opara</span>
                <span class="simulation-value">${sim.honoraires}</span>
            </div>
            <div class="simulation-row">
                <span class="simulation-label">Économies estimées</span>
                <span class="simulation-value economies">${sim.economies}</span>
            </div>
            <div class="simulation-row">
                <span class="simulation-label">Détail</span>
                <span class="simulation-value">${sim.detail}</span>
            </div>
        </div>
    `).join('');

    observeNewElements();
}

function renderRealisations(realisations) {
    const grid = document.getElementById('realisations-grid');
    grid.innerHTML = realisations.map(real => `
        <div class="realisation-card fade-in">
            <div class="realisation-image">
                <span>Photo à venir</span>
            </div>
            <div class="realisation-info">
                <div class="realisation-titre">${real.titre}</div>
                <div class="realisation-type">${real.type}</div>
                <div class="realisation-lieu">${real.lieu}</div>
            </div>
        </div>
    `).join('');

    observeNewElements();
}

function renderTemoignages(temoignages) {
    const grid = document.getElementById('temoignages-grid');
    grid.innerHTML = temoignages.map(tem => `
        <div class="temoignage-card fade-in">
            <p class="temoignage-texte">« ${tem.texte} »</p>
            <p class="temoignage-auteur">— ${tem.auteur}</p>
        </div>
    `).join('');

    observeNewElements();
}

function renderModalites(modalites) {
    document.getElementById('footer-portee').textContent = modalites.portee;
    document.getElementById('footer-deontologie').textContent = modalites.deontologie;
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll state
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ===== SCROLL ANIMATIONS =====
let observer;

function initScrollAnimations() {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function observeNewElements() {
    if (!observer) return;
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        observer.observe(el);
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 600);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Build mailto link as fallback
        const subject = encodeURIComponent('Demande de contact — Opara');
        const body = encodeURIComponent(
            `Nom : ${data.nom}\nEmail : ${data.email}\nTéléphone : ${data.telephone || 'Non renseigné'}\n\nMessage :\n${data.message}`
        );
        window.location.href = `mailto:opara.corsica@gmail.com?subject=${subject}&body=${body}`;

        form.reset();
    });
}
