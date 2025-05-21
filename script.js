// Initialiser EmailJS
emailjs.init(r50mzNs4DLHf_pWzK); // Remplace par ton vrai User ID EmailJS

const prixPlats = {
    "Hamburger": 5,
    "Frites": 2
};

const prixBoissons = {
    "Coca Cola": 1,
    "Sprite": 1,
    "Jupiler": 1.5
};

// Met à jour le prix total en fonction des sélections
function updateTotal() {
    const plat = document.getElementById('plat').value;
    const boisson = document.getElementById('boisson').value;
    let total = 0;

    if (plat) total += prixPlats[plat];
    if (boisson) total += prixBoissons[boisson];

    document.getElementById('total').textContent = `Prix total : ${total}€`;
}

// Ajoute les écouteurs d'événements une fois le DOM chargé
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('plat').addEventListener('change', updateTotal);
    document.getElementById('boisson').addEventListener('change', updateTotal);

    document.getElementById('order-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const nom = document.getElementById('nom').value;
        const plat = document.getElementById('plat').value;
        const boisson = document.getElementById('boisson').value;

        if (nom && plat && boisson) {
            const total = prixPlats[plat] + prixBoissons[boisson];
            const code = Math.floor(100000 + Math.random() * 900000);
            const now = new Date();
            const date = now.toLocaleDateString('fr-FR');
            const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

            const commande = {
                nom,
                plat,
                boisson,
                total: `${total}€`,
                code
            };

            // Stocker la commande dans localStorage pour confirmation.html
            localStorage.setItem("commande", JSON.stringify(commande));

            // Envoi via EmailJS
            emailjs.send(service_q67jhal, template_g66jtml, {
                name: nom,
                order: `${plat} + ${boisson}`,
                date: date,
                time: time,
                "cost.total": total,
                order_id: code
            }).then(() => {
                window.location.href = "confirmation.html";
            }).catch((error) => {
                alert("Erreur lors de l'envoi de l'email : " + error.text);
            });

        } else {
            alert("Veuillez remplir tous les champs !");
        }
    });
});

