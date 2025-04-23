// Bouton de retour en haut de page
let backToTopButton = document.getElementById("backToTop");

window.onscroll = function() {
    // Si l'utilisateur défile à plus de 300px du haut de la page, on affiche le bouton
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};


backToTopButton.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};


// Vérification de l'email pour la réservation des billets

// Récupération de l'email depuis le formulaire de réservation de billet
const form = document.getElementById('contactForm');
const emailInput = document.getElementById('email');
const errorMessage = document.getElementById('error-message');

// Fonction de validation de l'email
function validateEmail(email) {
    // Expression régulière pour vérifier le format de l'email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Ajouter un écouteur d'événement pour la soumission du formulaire
form.addEventListener('submit', function(event) {
    const emailValue = emailInput.value;
    
    // Si l'email n'est valide, empêcher la soumission du formulaire
    if (!validateEmail(emailValue)) {
        event.preventDefault();  // Empêche la soumission du formulaire
        errorMessage.style.display = 'block';  // Afficher le message d'erreur
    } else {
        errorMessage.style.display = 'none';  // Masquer le message d'erreur si l'email est valide
    }
});


//Animation d'apr réservation
form.addEventListener('submit', function(event) {
    const emailValue = emailInput.value;
    
    if (!validateEmail(emailValue)) {
        event.preventDefault();
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';

        // Empêcher l'envoi réel pour montrer l'animation
        event.preventDefault();

        // Animation de disparition du formulaire
        form.style.opacity = 1;
        let fadeOut = setInterval(function () {
            if (form.style.opacity > 0) {
                form.style.opacity -= 0.05;
            } else {
                clearInterval(fadeOut);
                form.style.display = 'none';

                // Créer le message de confirmation
                const confirmationMessage = document.createElement('div');
                confirmationMessage.classList.add('text-center', 'mt-5');

                confirmationMessage.innerHTML = `
                <div class="container bg-primary text-center p-4 rounded">
                    <div style="font-size: 60px;">🎉
                        <h2 class="mt-3">Merci pour ta réservation !</h2>
                        <p>On se voit au concert 🤘</p>
                        <a href="index.html" class="btn btn-secondary mt-4">Retour à l'accueil</a>
                    </div> 
                </div>





                `;

                document.querySelector('.form-container').appendChild(confirmationMessage);
                
                // Animation du message (fade in)
                confirmationMessage.style.opacity = 0;
                let fadeIn = setInterval(function () {
                    if (confirmationMessage.style.opacity < 1) {
                        confirmationMessage.style.opacity = parseFloat(confirmationMessage.style.opacity) + 0.05;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 30);
            }
        }, 30);
    }
});
