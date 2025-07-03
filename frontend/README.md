# 🎫 Site Web de Vente de Tickets – ABGYhuDJ

## 🎯 Objectif du projet

Développer un site web attrayant et accessible pour permettre aux fans du YouTuber fictif **ABGYhuDJ** d’acheter des tickets pour ses concerts. Le site doit refléter les préférences visuelles du client (rouge) tout en offrant une expérience utilisateur fluide et sécurisée.

---

## 🧰 Préparation

### Cahier des charges
#### **Charte graphique** : 
    - Couleur principale :  Rouge `#FF0000` (Backgrounds, boutons principaux, liens importants)
    - Couleur secondaires : 
        - Blanc `#FFFFFF` (Texte principal, fonds de sections)
        - Gris clair `#F2F2F2` (Backgrounds alternatifs, bordures)
        - Noir `#000000` (Texte principal, titres)

#### - **Typographie** :
    - Police principale : Roboto (Titres, sous-titres)
    - Police secondaire : Open Sans (Texte de paragraphe, descriptions)

#### - **Logo** : "ABGYhuDJ" en rouge/noir, style moderne dynamique

#### - **Composants** : 
    - Bouton principal : 
        - Background Rouge rouge `#FF0000`
        - Texte : Blanc `(#FFFFFF)`
        - Survol : Légère ombre portée, éclaircissement de la couleur de fond
    - Bouton secondaire : 
        - Background : Blanc `(#FFFFFF)`
        - Texte : Rouge `(#FF0000)`
        - Bordure : 1px solide Rouge `(#FF0000)`
        - Survol : Inversion des couleurs de fond et de texte
    - Formulaires : 
        - Champs de saisie : 
            - Bordure : 1px solide Gris clair `(#F2F2F2)`
            - Background : Blanc `(#FFFFFF)`
            - Texte : Noir `(#000000)`
            - Placeholder : Gris moyen `(#CCCCCC)`

#### - **Images et visuels**
    - Utilisation d'images de fond en haute résolution
    - Filtre Rouge en mode overlay

#### - **Header**
    - Fond : Rouge (#FF0000)
    - Texte et logos : Blanc (#FFFFFF)

#### - **Footer**
    - Fond : Noir (#000000)
    - Texte : Blanc (#FFFFFF)
    - Liens : Rouge (#FF0000)

#### - **Maquettes** : Réalisées avec Excalidraw pour le Zoning et Wireframe, sur Figma pour le Mockup

---

## 🏗️ Structure du projet
/index.html               → Page d'accueil
/dates-tournee.html       → Page avec les dates de la tournée
/reservation.html         → Page avec le formulaire de réservation et de paiement
/styles.css               → Feuille de styles principale
/custom.scss              → Feuille de style avec les modifications des éléments Bootstrap
/js/script.js             → Scripts d’interactivité (ex. : bouton retour haut)
/images/                  → Illustrations, photos et logo


---

## ⚙️ Stack et outils utilisés

- **HTML5 / CSS3**
- **JavaScript**
- **Excalidraw** (maquettes)
- **Figma** (maquettes)
- **FontAwesome** (icônes)
- **Visual Studio Code**
- **Lighthouse** (tests de performance, d’accessibilité, de SEO et des bonnes pratiques : 80 en mobile, 99 en bureau)
- **Wave** (tests de contraste)
- **Git / GitHub** (versioning)
- **Responsinator et responsive webdesign checker** (tests responsive)
- **cssminifier** (Minification du CSS)
- **TinyPNG** (Compression d'images)

---

## 🧩 Fonctionnalités

- Formulaire de réservation
- Interface responsive et intuitive
- Animation légère (bouton retour haut de page, effets au survol pour les boutons)
- Accessibilité : bon contraste tout en respectant les consignes, textes alternatifs pour les images

---

## 🔐 Sécurité & Accessibilité

- Respect des bonnes pratiques HTML/CSS (minification)
- Accessibilité testée (contraste, navigation clavier)
- Préparation à la sécurisation des formulaires (si backend futur)

---

## ✅ Tests

- **Accessibilité** : Wave, Lighthouse
- **Navigateurs testés** : Chrome, Firefox, Edge
- **Responsive design** : Desktop et mobile
- **JS dynamique** : Retour haut de page, transitions testées notamment lors de la réservation de billets

---

## 📈 Évolutions futures

- Connexion à une vraie base de données ou API
- Intégration d’une solution de paiement
- Utilisation d'autres framework JS comme React ou Angular
- Résoudre les soucis identifiés dans les commentaires du code

---

## 👨‍🎓 Auteur
Gilles COBIGO
Ce projet a été réalisé dans le cadre d’un exercice pédagogique.
Formation Développeur Web et Web Mobile, Live Campus 2025


