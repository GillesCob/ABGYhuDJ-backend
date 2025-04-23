// ================== Variables ==================
const ReservationForm = document.getElementById('reservationForm');
const emailInput = document.getElementById('email');
const errorMessageMail = document.getElementById('error-message-mail');
const errorMessageCardNumber = document.getElementById('error-message-card-number');


// ==================================== Animations ====================================

// ================== Bouton de retour en haut de page ==================
let backToTopButton = document.getElementById("backToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

backToTopButton.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};


// ================== Validation de l'email dans le formulaire ==================
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


// ================== Animation carte cliquable =====================
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card-click');
    
    cards.forEach(card => {
        const buttonPrevious = card.querySelector('#PreviousButton');
        const buttonNext = card.querySelector('#NextButton');
        
        buttonPrevious.addEventListener('click', function () {
            card.classList.remove("flipped");
        });

        buttonNext.addEventListener('click', function () {
            card.classList.add("flipped");
        });
    });
});

// ==================================== Formulaire de réservation de billets ====================================

// ================== Récupération des données du formulaire et envoi à API ==================
document.addEventListener('DOMContentLoaded', function () {
    ReservationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const emailValue = emailInput.value;
        if (!validateEmail(emailValue)) {
            errorMessageMail.style.display = 'block';
            return;

        } else {
            errorMessageMail.style.display = 'none';
            console.log('Email valide :', emailValue);
        }


        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let city = document.getElementById('city').value;
        let tickets = document.getElementById('tickets').value;
        let cardNumber = document.getElementById('cardNumber').value;
        let expiryDate = document.getElementById('expiryDate').value;
        let cvv = document.getElementById('cvv').value;

        console.log({
            name: name,
            email: email,
            city: city,
            tickets: tickets,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv
        });

        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('city', city);
        formData.append('tickets', tickets);
        formData.append('cardNumber', cardNumber);
        formData.append('expiryDate', expiryDate);
        formData.append('cvv', cvv);

        fetch('/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Réponse du serveur :', data);
            lancerAnimationConfirmation();
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi :', error);
            console.log("Je triche mais c'est temporaire");
            lancerAnimationConfirmation(); // A supprimer quand l'envoi au serveur sera fonctionnel

        });
    });
});





// ================== Message animé après réservation ==================
function lancerAnimationConfirmation() {
    ReservationForm.style.opacity = 1;
    
    let fadeOut = setInterval(function () {
        if (ReservationForm.style.opacity > 0) {
            ReservationForm.style.opacity -= 0.05;
        } else {
            clearInterval(fadeOut);
            ReservationForm.style.display = 'none';

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








