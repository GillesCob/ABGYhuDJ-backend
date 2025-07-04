document.addEventListener('DOMContentLoaded', () => {
  const connectionForm = document.getElementById('connectionForm');

  connectionForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById('email').value;
    const mot_de_passe = document.getElementById('MotDePasse').value;

    try {
      const response = await fetch('/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mot_de_passe }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Connexion réussie!');
        // Redirigez l'utilisateur vers une page sécurisée ou le tableau de bord
        window.location.href = '/';
      } else {
        alert(data.erreur || 'Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion');
    }
  });
});
