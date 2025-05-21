// Initialiser EmailJS correctement
emailjs.init("r50mzNs4DLHf_pWzK");

const prixPlats = {
    "Hamburger": 5,
    "Frites": 2
};

const prixBoissons = {
    "Coca Cola": 1,
    "Sprite": 1,
    "Jupiler": 1.5
};

function updateTotal() {
    const plat = document.getElementById('plat').value;
    const boisson = document.getElementById('boisson').value;
    let total = 0;

    if (plat) total += prixPlats[plat];
    if (boisson) total += prixBoissons[boisson];

    document.getElementById('total').textContent = `Prix total : ${total}€`;
}

document.addEventListener('DOMContentLoaded', function () {
    const platEl = document.getElementById('plat');
    const boissonEl = document.getElementById('boisson');
    const form = document.getElementById('order-form');

    if (!platEl || !boissonEl || !form) {
        console.error("Un élément du formulaire est introuvable !");
        return;
    }

    platEl.addEventListener('change', updateTotal);
    boissonEl.addEventListener('change', updateTotal);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nom = document.getElementById('nom').value;
        const plat = platEl.value;
        const boisson = boissonEl.value;

        if (!nom || !plat || !boisson) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

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

        localStorage.setItem("commande", JSON.stringify(commande));

        emailjs.send("service_q67jhal", "template_g66jtml", {
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
    });
});
