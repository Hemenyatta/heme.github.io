// Données des talents (exemple pour un arbre de guerrier/mage)
const talents = [
    { id: 1, x: 100, y: 100, name: "Coup Puissant", description: "+20% dégâts physiques", color: "#FF5252", icon: "⚔️" },
    { id: 2, x: 200, y: 150, name: "Bouclier Robuste", description: "+15% défense", color: "#4CAF50", icon: "🛡️" },
    { id: 3, x: 150, y: 250, name: "Maîtrise du Feu", description: "+10% dégâts de feu", color: "#FF9800", icon: "🔥" },
    { id: 4, x: 250, y: 200, name: "Soins Rapides", description: "+5% soins", color: "#2196F3", icon: "💙" },
    { id: 5, x: 300, y: 100, name: "Frappe Éclair", description: "+15% vitesse d'attaque", color: "#9C27B0", icon: "⚡" },
    { id: 6, x: 200, y: 50, name: "Ancrage Magique", description: "-10% coût en mana", color: "#673AB7", icon: "🔮" },
];

// Liens entre les talents
const links = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 5, to: 6 },
];

// Fonction pour créer un talent
function createTalent(talent) {
    const talentElement = document.createElement("div");
    talentElement.className = "talent";
    talentElement.style.left = `${talent.x}px`;
    talentElement.style.top = `${talent.y}px`;
    talentElement.style.backgroundColor = talent.color;
    talentElement.innerHTML = talent.icon;

    // Infobulle
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerHTML = `<strong>${talent.name}</strong><br>${talent.description}`;
    document.body.appendChild(tooltip);

    // Afficher l'infobulle au survol
    talentElement.addEventListener("mouseenter", (e) => {
        tooltip.style.display = "block";
        tooltip.style.left = `${e.pageX + 15}px`;
        tooltip.style.top = `${e.pageY + 15}px`;
    });

    // Cacher l'infobulle
    talentElement.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });

    // Ajouter au conteneur
    document.getElementById("tree").appendChild(talentElement);
}

// Fonction pour créer un lien entre deux talents
function createLink(link) {
    const linkElement = document.createElement("div");
    linkElement.className = "link";

    const fromTalent = talents.find(t => t.id === link.from);
    const toTalent = talents.find(t => t.id === link.to);

    // Calculer la position et la rotation du lien
    const dx = toTalent.x - fromTalent.x;
    const dy = toTalent.y - fromTalent.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    linkElement.style.left = `${fromTalent.x + 20}px`;
    linkElement.style.top = `${fromTalent.y + 20}px`;
    linkElement.style.width = `${length}px`;
    linkElement.style.transform = `rotate(${angle}deg)`;

    document.getElementById("tree").appendChild(linkElement);
}

// Initialisation
talents.forEach(createTalent);
links.forEach(createLink);
