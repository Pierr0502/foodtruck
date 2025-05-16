(function() {
    emailjs.init("r50mzNs4DLHf_pWzK");
})();

function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000);
}

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const platSelect = document.getElementById('plat');
    const plat = platSelect.value;
    const orderNumber = generateOrderNumber();
    let price = 0;

    // Déterminer le prix en fonction du plat sélectionné
    switch (plat) {
        case 'hamburger':
            price = 5;
            break;
        case 'frites':
            price = 2;
            break;
        case 'boisson':
            price = 1;
            break;
        default:
            price = 0; // Prix par défaut si le plat n'est pas reconnu
    }

    const costTotal = price; // Pour une seule commande, le coût total est le prix unitaire

    document.getElementById('commande').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
    document.getElementById('confirmation-message').innerText = `Votre commande numéro ${orderNumber} a été passée. Vous avez commandé un(e) ${plat}. Prix : ${price}€.`;

    const emailParams = {
        email: "hermend.paularthur@gmail.com",
        "From Name": nom,
        order_id: orderNumber,
        name: plat,
        price: price, // Prix unitaire
        'cost.total': costTotal // Coût total de la commande
    };

    console.log('Tentative d\'envoi de l\'e-mail avec les paramètres:', emailParams);

    emailjs.send('service_q67jhal', 'template_g66jtml', emailParams)
        .then(function(response) {
            console.log('Commande envoyée avec succès', response);
        }, function(error) {
            console.error('Erreur lors de l\'envoi de la commande', error);
        });
});
