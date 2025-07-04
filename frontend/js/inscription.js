document.addEventListener('DOMContentLoaded', () => {
  const inscriptionForm = document.getElementById('inscriptionForm');

  inscriptionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const mot_de_passe = document.getElementById('MotDePasse').value;
    const confirm_mot_de_passe = document.getElementById('ConfirmMotDePasse').value;

    if (mot_de_passe !== confirm_mot_de_passe) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch('/utilisateurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nom, email, mot_de_passe })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Inscription réussie ! Merci de vous connecter');
        window.location.href = 'connexion';
      } else {
        alert(data.erreur || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      console.error('Erreur réseau :', err);
    
      alert('Erreur de connexion');
    }
  });
});
