// Initialiser EmailJS (si tu utilises EmailJS)
(function() {
    emailjs.init("r50mzNs4DLHf_pWzK");
})();

// Fonction pour générer un numéro de commande aléatoire
function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000);
}

// Gérer l'envoi de la commande
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Récupérer les informations de la commande
    const nom = document.getElementById('nom').value;
    const plat = document.getElementById('plat').value;

    // Générer un numéro de commande
    const orderNumber = generateOrderNumber();

    // Afficher la confirmation
    document.getElementById('commande').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
    document.getElementById('confirmation-message').innerText = `Votre commande numéro ${orderNumber} a été passée. Vous avez commandé un(e) ${plat}.`;

    // Préparer l'e-mail (simulation)
    const emailParams = {
        to_email: "sauvegrainpml@gmail.com",  // Adresse e-mail fictive
        from_name: nom,
        order_number: orderNumber,
        plat: plat
    };

    // Envoyer l'e-mail via EmailJS
    emailjs.send('service_q67jhal', 'template_g66jtml', emailParams)
        .then(function(response) {
            console.log('Commande envoyée avec succès', response);
        }, function(error) {
            console.error('Erreur lors de l\'envoi de la commande', error);
        });
});
