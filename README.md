# UV / Print — Digital Factory

Application statique de préparation à l’impression UV, avec une identité visuelle apparentée à Cut / Studio : violet, cyan, magenta et vert citron, contours foncés et cartes arrondies.

## Utilisation

Ouvrir `index.html` dans un navigateur récent, ou servir ce dossier avec un serveur HTTP statique. Aucun outil de compilation ni dépendance JavaScript externe n’est nécessaire.

1. Renseigner le prénom du stagiaire et les dimensions du support (10 à 600 mm par côté).
2. Importer une image PNG, JPG ou WebP pour cadrer l’impression.
3. Télécharger le gabarit de placement PDF, le PDF d’impression avec 2 mm de débord, ou le contour SVG de découpe laser à l’échelle 1:1.

Les deux gabarits fonctionnent sans image. Les fichiers exportés portent le prénom. Le SVG contient un contour rectangulaire fermé, sans débord, sans image et sans compensation du trait de coupe.

La procédure UV et ses illustrations sont incluses dans le dépôt. Les images importées sont traitées localement dans le navigateur.

## Fichiers

- `index.html` : interface et logique des exports.
- `assets/uvprint.css` et `assets/procedure.css` : styles de l’application et de la procédure.
- `assets/versaworks/` et `assets/impression-uv/` : illustrations de la procédure.
- `gabarit-impression.html` : redirection vers la page d’accueil.

## Origine

Adaptation de l’application de préparation UV de Digital Factory. L’application source reste indépendante. La palette et les codes graphiques proviennent du projet [Cut / Studio](https://github.com/DigitalFactory-lab/Stickers).
