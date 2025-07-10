document.addEventListener('DOMContentLoaded', () => {
  const concertForm = document.getElementById('Ajout_concert');

  concertForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const ville = document.getElementById('ville').value;
    const salle = document.getElementById('salle').value;
    const date = document.getElementById('date').value;
    const nombre_tickets = document.getElementById('nombre_tickets').value;
    const prix = document.getElementById('prix').value;

    try {
      const response = await fetch('/ajoutConcert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ville, salle, date, nombre_tickets, prix }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Concert ajouté avec succès!');
        window.location.href = '/dates-tournee';
      } else {
        alert(data.erreur || 'Erreur lors de l\'ajout du concert');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout du concert');
    }
  });
});
