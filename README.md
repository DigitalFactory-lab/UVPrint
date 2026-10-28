# UV / Print — Digital Factory

Application statique de préparation à l’impression UV, avec une identité visuelle apparentée à Cut / Studio : violet, cyan, magenta et vert citron, contours foncés et cartes arrondies.

## Utilisation

Ouvrir `index.html` dans un navigateur récent, ou servir ce dossier avec un serveur HTTP statique. Aucun outil de compilation ni dépendance JavaScript externe n’est nécessaire.

1. Renseigner le prénom du stagiaire et les dimensions du support (10 à 600 mm par côté).
2. Importer une image PNG, JPG ou WebP pour cadrer l’impression.
3. Télécharger le gabarit de placement PDF, le PDF d’impression avec 2 mm de débord, ou le contour SVG de découpe laser à l’échelle 1:1.

En mode rectangle, les deux gabarits fonctionnent sans image. Les fichiers exportés portent le prénom. En mode rectangle, le SVG contient un contour rectangulaire fermé, sans débord, sans image et sans compensation du trait de coupe.

La procédure UV et ses illustrations sont incluses dans le dépôt. Les images importées sont traitées localement dans le navigateur.

## Fichiers

- `index.html` : interface et logique des exports.
- `assets/uvprint.css` et `assets/procedure.css` : styles de l’application et de la procédure.
- `assets/versaworks/` et `assets/impression-uv/` : illustrations de la procédure.
- `gabarit-impression.html` : redirection vers la page d’accueil.

## Origine

Adaptation de l’application de préparation UV de Digital Factory. L’application source reste indépendante. La palette et les codes graphiques proviennent du projet [Cut / Studio](https://github.com/DigitalFactory-lab/Stickers).

## Forme libre (PNG transparent)

1. Choisir **Forme libre — PNG transparent** dans « Ton support ».
2. Fournir obligatoirement un **PNG détouré sur fond transparent** (4 millions de pixels maximum). Les fichiers opaques, vides ou trop complexes sont refusés.
3. Régler les dimensions hors tout en millimètres, sans les marges transparentes. Les proportions sont conservées par défaut ; décocher cette option permet de les modifier.
4. Vérifier les contours roses dans l’aperçu, puis télécharger le **SVG laser** et le **PDF de placement**, à l’échelle 1:1.

Le tracé suit le bord des pixels dont l’opacité est au moins 50 %, sans lissage ni compensation du trait laser. Il conserve les trous et les éléments séparés : chacun est un contour de découpe fermé. La précision dépend donc du PNG fourni ; nettoyer les poussières et les détails indésirables avant importation.

Le PDF de placement reprend exactement les mêmes chemins, décalés de 2 mm dans une page de largeur + 4 mm et hauteur + 4 mm. Le PDF d’impression utilise ce même placement et conserve la transparence du PNG, **sans ajout de débord couleur** en mode forme libre.

Vérifications de la géométrie : `node --test tests/freeform.test.cjs`.
