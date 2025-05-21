<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foodtruck - Commandez votre menu ici</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            padding-bottom: 60px; /* Ajouter de l'espace en bas pour éviter que le footer chevauche le formulaire */
        }

        footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px 0;
            width: 100%;
        }

        #total {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <header>
        <h1>FoodTruck</h1>
        <p>Commandez vos plats préférés en toute simplicité !</p>
    </header>

    <main>
        <section id="menu">
            <h2>Notre Menu</h2>
            <ul>
                <li>Hamburger - 5€</li>
                <li>Frites - 2€</li>
            </ul>
        </section>

        <section id="boissons-menu">
            <h2>Nos boissons</h2>
            <ul> 
                <li>Coca Cola - 1€</li>
                <li>Sprite - 1€</li>
                <li>Jupiler - 1,5€</li>
            </ul>
        </section>

        <section id="commande">
            <h2>Passer une commande</h2>
            <form id="order-form">
                <label for="nom">Votre nom :</label>
                <input type="text" id="nom" name="nom" required><br>

                <label for="plat">Choisissez votre plat :</label>
                <select id="plat" name="plat" required>
                    <option value="">-- Sélectionnez un plat --</option>
                    <option value="Hamburger">Hamburger - 5€</option>
                    <option value="Frites">Frites - 2€</option>
                </select><br>

                <label for="boisson">Choisissez votre boisson :</label>
                <select id="boisson" name="boisson" required>
                    <option value="">-- Sélectionnez une boisson --</option>
                    <option value="Coca Cola">Coca Cola - 1€</option>
                    <option value="Sprite">Sprite - 1€</option>
                    <option value="Jupiler">Jupiler - 1,5€</option>
                </select><br>

                <button type="submit">Valider la commande</button>
            </form>

            <!-- Section pour afficher le prix total -->
            <p id="total">Prix total : 0€</p>
        </section>

        <section id="confirmation" style="display: none;">
            <h2>Confirmation de commande</h2>
            <p id="confirmation-message"></p>
        </section>
    </main>

    <footer>
        <p>FoodTruck - © 2025</p>
    </footer>

    <script>
        // Prix des éléments de menu
        const prixPlats = {
            "Hamburger": 5,
            "Frites": 2
        };

        const prixBoissons = {
            "Coca Cola": 1,
            "Sprite": 1,
            "Jupiler": 1.5
        };

        // Fonction pour mettre à jour le prix total
        function updateTotal() {
            const plat = document.getElementById('plat').value;
            const boisson = document.getElementById('boisson').value;
            let total = 0;

            if (plat) {
                total += prixPlats[plat];
            }

            if (boisson) {
                total += prixBoissons[boisson];
            }

            // Affichage du total
            document.getElementById('total').textContent = `Prix total : ${total}€`;
        }

        // Écouteurs d'événements pour mettre à jour le total à chaque sélection
        document.getElementById('plat').addEventListener('change', updateTotal);
        document.getElementById('boisson').addEventListener('change', updateTotal);

        // Gérer la soumission du formulaire
        document.getElementById('order-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Empêcher l'envoi du formulaire pour tester le calcul

            const nom = document.getElementById('nom').value;
            const plat = document.getElementById('plat').value;
            const boisson = document.getElementById('boisson').value;

            if (nom && plat && boisson) {
                document.getElementById('confirmation-message').textContent = `Merci ${nom}, votre commande est confirmée : ${plat} et ${boisson}.`;
                document.getElementById('confirmation').style.display = 'block';
            } else {
                alert("Veuillez remplir tous les champs !");
            }
        });
    </script>

</body>
</html>
