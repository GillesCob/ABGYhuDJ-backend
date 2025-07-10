  document.addEventListener('DOMContentLoaded', function () {
    const reservationForm = document.getElementById('reservationForm');
    const payButton = document.getElementById('Pay');
    const nextButton = document.getElementById('NextButton');
    const previousButton = document.getElementById('PreviousButton');

    // Gestion du switch de carte (avant/arrière)
    nextButton.addEventListener('click', function () {
      reservationForm.classList.add('flipped');
    });

    previousButton.addEventListener('click', function () {
      reservationForm.classList.remove('flipped');
    });

    // Gestion du paiement
    payButton.addEventListener('click', async function (event) {
      event.preventDefault();

      // Récupération des données du formulaire
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const ville = document.getElementById('city').value;
      const nombreTickets = parseInt(document.getElementById('tickets').value);
      const cardNumber = document.getElementById('cardNumber').value.trim();
      const expiryDate = document.getElementById('expiryDate').value.trim();
      const cvv = document.getElementById('cvv').value.trim();
      const modePaiement = 'carte bancaire';

      // Vérification de base (tu peux ajouter plus de validations si tu veux)
      if (!name || !email || !ville || !nombreTickets || !cardNumber || !expiryDate || !cvv) {
        alert('Merci de remplir tous les champs.');
        return;
      }

      try {
        const response = await fetch('/reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            ville,
            nombreTickets,
            cardNumber,
            expiryDate,
            cvv,
            modePaiement,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Réservation confirmée ! 🎉');
          window.location.href = '/'; // ou rediriger vers une page de confirmation
        } else {
          alert(result.message || 'Erreur lors de la réservation.');
        }
      } catch (error) {
        console.error('Erreur lors de la réservation :', error);
        alert('Une erreur est survenue. Réessaie plus tard.');
      }
    });
  });
