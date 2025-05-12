(function() {
    emailjs.init("r50mzNs4DLHf_pWzK");
})();

function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000);
}

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const plat = document.getElementById('plat').value;
    const orderNumber = generateOrderNumber();

    document.getElementById('commande').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
    document.getElementById('confirmation-message').innerText = `Votre commande numéro ${orderNumber} a été passée. Vous avez commandé un(e) ${plat}.`;
    
  const emailParams = {
        "To Email": "hermend.paularthur@gmail.com",
        "From Name": nom,
        order_id: orderNumber,
        name: plat
    };
    
    emailjs.send('service_q67jhal', 'template_g66jtml', emailParams)
        .then(function(response) {
            console.log('Commande envoyée avec succès', response);
        }, function(error) {
            console.error('Erreur lors de l\'envoi de la commande', error);
        });
});
