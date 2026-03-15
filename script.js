document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initNavbar();
    initScrollAnimations();
    initBackToTop();
    initContactForm();
});

// ===== EMBEDDED DATA (fallback for file:// protocol) =====
const EMBEDDED_DATA = {
  "presentation": {
    "mission": {
      "intro": "Opara est votre coordinateur technique et conseiller en travaux de rénovation. Fondée par trois associés aux compétences complémentaires, notre structure accompagne les clients à chaque étape de leur projet : de l'analyse initiale du bien jusqu'à la réception finale du chantier.",
      "role": "Notre rôle est de vous apporter un regard technique indépendant sur votre projet, de structurer vos besoins en un cahier des charges clair, de sélectionner et consulter des entreprises qualifiées, puis de coordonner les interventions pour garantir le respect de la qualité, des délais et du budget. Nous intervenons comme un véritable bras droit technique, sans nous substituer à un architecte ou à un maître d'œuvre.",
      "positionnement": "Nous intervenons sur les projets de rénovation où le recours à un architecte n'est pas obligatoire, mais où la complexité technique justifie un accompagnement professionnel. C'est précisément sur ce segment que les clients sont les plus exposés aux dérives de coût, de temps d'exécution et de conformité technique.",
      "deontologie": "Nos honoraires sont facturés directement au client, en toute transparence. Cette relation directe garantit un alignement total entre nos recommandations et vos intérêts. Chaque conseil, chaque orientation technique, chaque choix d'entreprise est dicté par un seul objectif : la réussite de votre projet."
    },
    "pourquoi": {
      "intro": "Un maître d'ouvrage qui pilote seul ses travaux de rénovation fait face à de nombreux écueils : des devis difficilement comparables car établis sur des bases différentes, des entreprises dont les assurances et références n'ont pas été vérifiées, des retards de chantier liés à un défaut de coordination, et des malfaçons découvertes trop tard. En moyenne, ces dérives représentent 15 à 20 % de surcoût par rapport au budget initial.",
      "solution": "En faisant appel à Opara, vous bénéficiez d'un cadrage technique rigoureux, de plans et quantitatifs qui permettent aux entreprises de chiffrer sur une base identique, d'une négociation éclairée des devis et d'un suivi régulier qui prévient les dérives. Nos honoraires représentent une fraction des économies qu'ils génèrent."
    },
    "comparatif": [
      {"critere": "Cadrage du projet", "sans": "Pas de vision d'ensemble, priorités floues", "avec": "Diagnostic technique, notice et estimation par lot"},
      {"critere": "Base de consultation", "sans": "Devis établis sur des bases différentes, incomparables", "avec": "Plans et quantitatifs identiques pour toutes les entreprises"},
      {"critere": "Sélection entreprises", "sans": "Bouche-à-oreille, sans vérification", "avec": "Artisans qualifiés, assurances et références vérifiées"},
      {"critere": "Négociation devis", "sans": "Pas de référence de prix, pas de levier", "avec": "Analyse comparative rigoureuse, négociation éclairée"},
      {"critere": "Suivi chantier", "sans": "Le client gère seul les imprévus et les litiges", "avec": "Visites régulières, comptes-rendus, alertes, suivi financier"},
      {"critere": "Réception", "sans": "Signature sans contrôle technique", "avec": "PV de réception commenté, réserves formalisées"},
      {"critere": "Risque de surcoût", "sans": "15 à 20 % de dépassement en moyenne", "avec": "Honoraires largement compensés par les économies réalisées"}
    ]
  },
  "packs": [
    {"id": 1, "nom": "Pack 1", "titre": "Diagnostic & Conseil", "objectif": "Cadrer votre projet et vous aider à définir vos priorités avant toute consultation d'entreprises.", "contenu": "Mission de conseil destinée à poser les bases de votre projet. Visite approfondie du bien, entretien détaillé pour cerner vos attentes, votre budget et vos objectifs. Rédaction d'une notice technico-économique synthétique accompagnée d'une estimation budgétaire par lot.", "livrables": ["Compte-rendu de première visite", "Notice descriptive technico-économique", "Estimation du projet par lot (base ratios)"], "tarif": "500 € HT (forfait)", "note": "Ce montant est déductible en cas de souscription au Pack Clé en main.", "featured": false},
    {"id": 2, "nom": "Pack 2", "titre": "Mise en relation & Planification", "objectif": "Préparer techniquement votre projet, consulter les entreprises sur une base identique et vous accompagner dans le choix le plus pertinent.", "contenu": "Réalisation des plans techniques, quantitatifs et descriptifs de tous les lots. Estimation détaillée selon les prix du marché, sélection d'entreprises qualifiées, organisation de la consultation, analyse des devis, assistance au choix et planning prévisionnel.", "livrables": ["Plans techniques par lot", "Quantitatif tous corps d'état", "Estimation détaillée par lot", "Liste des entreprises consultées", "Devis des entreprises", "Analyse comparative des offres", "Assistance au choix des entreprises", "Planning prévisionnel d'intervention"], "tarif": "5 à 7 % du montant des travaux (min. 1 000 € HT)", "prerequis": "Ce pack s'appuie sur les conclusions du Pack 1 (Diagnostic & Conseil).", "featured": false},
    {"id": 3, "nom": "Pack 3", "titre": "Suivi de chantier", "objectif": "Sécuriser l'exécution de vos travaux en assurant un suivi technique, financier et organisationnel rigoureux tout au long du chantier.", "contenu": "Organisation et animation des réunions de chantier, coordination des interventions, contrôle de conformité, vérification des situations de travaux, validation des factures, suivi financier et assistance à la réception.", "livrables": ["Planning d'intervention", "Comptes-rendus de réunions de chantier", "Contrôle et validation des factures", "Tableau de suivi financier", "PV de réception des entreprises"], "tarif": "3 à 5 % du montant des travaux, ou forfait par visite (≈ 500 € HT)", "featured": false},
    {"id": 4, "nom": "Pack Clé en main", "titre": "Accompagnement complet", "objectif": "Accompagnement complet depuis l'analyse initiale jusqu'à la réception des travaux, avec un pilotage technique, financier et organisationnel maîtrisé.", "contenu": "Regroupe l'ensemble des prestations des Packs 1, 2 et 3. Un interlocuteur unique vous accompagne de bout en bout. Un seul contrat, un seul tarif et une vision d'ensemble cohérente sur l'intégralité de votre projet.", "livrables": ["Compte-rendu de première visite, notice technico-économique, estimation par lot", "Plans techniques par lot, quantitatif tous corps d'état, estimation détaillée", "Consultation, analyse comparative des offres, assistance au choix des entreprises", "Planning d'intervention, comptes-rendus de chantier, suivi financier", "Contrôle et validation des factures, PV de réception"], "tarif": "7 % du montant total des travaux (min. 3 500 € HT)", "note": "Diagnostic initial de 500 € HT déduit des honoraires globaux.", "featured": true}
  ],
  "simulations": [
    {"projet": "Projet à 80 000 € de travaux", "honoraires": "5 600 € HT", "economies": "8 000 à 16 000 €", "detail": "Surcoût évité de 10 à 20 %"},
    {"projet": "Projet à 150 000 € de travaux", "honoraires": "10 500 € HT", "economies": "15 000 à 30 000 €", "detail": "Surcoût évité de 10 à 20 %"}
  ],
  "realisations": [
    {"titre": "Rénovation complète appartement", "lieu": "Ajaccio centre", "type": "Rénovation intérieure — Séjour & aménagement", "image": "assets/Projet-1.jpg", "client": "M. & Mme Ferrandi"},
    {"titre": "Réaménagement cuisine & pièce de vie", "lieu": "Ajaccio — Les Jardins de l'Empereur", "type": "Rénovation cuisine — Agencement sur mesure", "image": "assets/Projet-2.jpg", "client": "M. Luciani"},
    {"titre": "Réhabilitation appartement ancien", "lieu": "Ajaccio — Vieille ville", "type": "Rénovation structurelle — Verrière & voûtes", "image": "assets/Projet-3.jpg", "client": "Mme Santoni"}
  ],
  "temoignages": [
    {"texte": "Grâce à Opara, les devis étaient enfin comparables. On a pu choisir nos artisans en toute confiance, et les économies réalisées ont largement couvert leurs honoraires.", "auteur": "J. Ferrandi — Rénovation appartement — Ajaccio"},
    {"texte": "On ne connaissait rien aux travaux. Le diagnostic nous a permis de comprendre où mettre notre argent en priorité. Un accompagnement indispensable.", "auteur": "P. Luciani — Réaménagement cuisine — Ajaccio"},
    {"texte": "Le suivi de chantier nous a évité plusieurs malfaçons. Sans leur œil technique, on aurait signé la réception sans voir les problèmes.", "auteur": "A. Santoni — Réhabilitation appartement — Ajaccio"}
  ],
  "modalites": {
    "portee": "Opara agit en tant que coordinateur technique et conseiller. L'entreprise ne fournit pas de prestations réglementées de maîtrise d'œuvre au sens de la loi MOP et ne se substitue ni à un architecte ni à un bureau d'études. Les plans et documents techniques que nous produisons sont des outils d'aide à la décision et à la consultation. Les responsabilités juridiques liées à l'exécution des travaux restent du ressort des entreprises contractantes.",
    "deontologie": "Nos honoraires sont transparents et facturés directement au client. Cette indépendance financière est le socle de notre crédibilité : elle garantit que chaque recommandation est formulée dans votre seul intérêt."
  }
};

// ===== DATA LOADING =====
async function loadData() {
    let data;
    try {
        const response = await fetch('data.json');
        data = await response.json();
    } catch (error) {
        // Fallback: use embedded data (works with file:// protocol)
        data = EMBEDDED_DATA;
    }
    renderMission(data.presentation.mission);
    renderPourquoi(data.presentation);
    renderPacks(data.packs);
    renderSimulations(data.simulations);
    renderRealisations(data.realisations);
    renderTemoignages(data.temoignages);
    renderModalites(data.modalites);
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
                <img src="${real.image}" alt="${real.titre}" onerror="this.parentElement.innerHTML='<span>Photo à venir</span>'">
            </div>
            <div class="realisation-info">
                <div class="realisation-titre">${real.titre}</div>
                <div class="realisation-type">${real.type}</div>
                <div class="realisation-lieu">${real.lieu}${real.client ? ' — ' + real.client : ''}</div>
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
