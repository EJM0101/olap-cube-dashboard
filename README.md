# 📊 OLAP Cube Dashboard – Projet interactif React + D3.js

---

## 🧭 Présentation

**OLAP Cube Dashboard** est une application web professionnelle qui permet de **visualiser et manipuler dynamiquement un cube OLAP** (modélisation multidimensionnelle). Elle est conçue pour les analystes, gestionnaires de données et étudiants souhaitant explorer des données en étoile ou en flocon.

Développée avec **React**, **D3.js** et **Tailwind CSS**, l'application permet d'importer des **fichiers CSV** contenant des données de faits et de dimensions, puis d’en afficher dynamiquement une vue agrégée selon les axes sélectionnés.

---

## ⚙️ Technologies utilisées

- **React 18** – interface utilisateur
- **Next.js 14** – framework SSR et build
- **D3.js** – visualisation dynamique (prêt à l’intégration)
- **PapaParse** – parsing CSV client-side
- **Tailwind CSS** – design moderne et responsive
- **Vercel / Render** – déploiement facile

---

## 🗃️ Modélisation OLAP

Le système repose sur une **modélisation en étoile** :

- **Table de faits** : `ventes.csv` (ex: id, id_produit, id_client, id_temps, montant, quantite)
- **Tables de dimensions** :
  - `produit.csv` (ex: id, nom, catégorie)
  - `client.csv` (ex: id, nom, région)
  - `temps.csv` (ex: id, année, mois, jour)

---

## 🚀 Fonctionnalités

| Fonction                         | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| 📂 Téléversement CSV             | Import de plusieurs fichiers `.csv` (faits et dimensions)                   |
| 🎛️ Filtres dynamiques            | Choix de dimensions filtrables en temps réel (produit, client, temps, etc) |
| 📊 Tableau de faits interactif   | Visualisation simplifiée avec regroupement possible                         |
| 🖼️ Interface professionnelle     | Design propre, responsive et adapté aux utilisateurs métiers                |
| 🔌 Prêt pour extension D3.js     | Architecture prévue pour ajouter des visualisations en graphes              |

---

## 📁 Structure du projet

```
olap-cube-dashboard/
├── pages/                  # Pages Next.js
│   └── index.js            # Interface principale
├── components/
│   ├── CubeView.js         # Composant de visualisation des faits
│   └── FilterPanel.js      # Composant de filtres par dimension
├── styles/
│   └── globals.css         # Feuilles de style Tailwind
├── public/                 # Données statiques (facultatif)
├── utils/                  # Utilitaires de parsing (future extension)
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json
```

---

## ✅ Exemple d’utilisation

1. Préparez vos fichiers :
   - `fact_ventes.csv`
   - `client.csv`
   - `produit.csv`
   - `temps.csv`

2. Lancez le projet :

```bash
npm install
npm run dev
```

3. Accédez à `http://localhost:3000`  
4. Téléversez les fichiers CSV.  
5. Filtrez et observez les données du cube.

---

## 🧪 Exemple de CSV attendu

**fact_ventes.csv** :
```csv
id,id_client,id_produit,id_temps,montant,quantite
1,101,201,301,500,2
2,102,202,302,800,3
```

**client.csv** :
```csv
id,nom,région
101,Jean Dupont,Europe
102,Amina Diallo,Africa
```

---

## 📦 Déploiement

Compatible avec [Vercel](https://vercel.com) ou [Render](https://render.com) :

- Déposez le code sur GitHub
- Connectez votre repo sur la plateforme
- Déployez sans configuration supplémentaire

---

## 📚 Licence

MIT © 2025 – Emman Mlmb  
Développé dans un but pédagogique et professionnel pour les applications OLAP web.

---
