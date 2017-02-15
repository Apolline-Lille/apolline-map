## Suivi de la qualité de l’air intérieur

Visualisation des données


---

##Architecture
	-app.js
	-bin
	-database
		-dbHandel.js
		-models.js
	-node_modules
	-package.json
	-public
		-front
		-stylesheets
		-javascripts
			-bootstrap.min.js
			-heatmap.min.js
			-jquery.min.js
			-leaflet-heatmap.js
			-map.js	
	-routes
		-index.js
		-login.js
		-logout.js
		-config.js
	-views
		-config.html
		-error.html
		-home.html
		-index.html
		-login.html

---
##MongoDB
Dans la ficher model.js, j'ai definit le schéma de user et capture. Et puis, on propose les fonctions de login/logout pour user(login.html, login.js,logout.js). 

Pour l'insant, il y a un compte pour tester:
compte:x, mot de passe:x

Après authentification, dans la page config(config.js, config.html), on peut ajouetr une capture par cliquer la place qu'on veux déployer la capture sur la carte. On peut aussi supprimer ou modifier le nom de cette carte par clique la marquer de la capture.

Pour éviter autre personne faire ces opération, je ne propose pas la fonction register dans cette web application. Donc pour ajouter une gestionnaire, on doit le faire directement dans le mongodb:

```
docker exec -it apollinemap_mongo_1 /bin/bash
mongo
use nodedb
db.users.insert({name:"x",password:"x"}) 
```

D'allier, pour voir le effet de heatmap, vous devez acces à la page config et ajouter une capture qui a le même nom de location dans le influxDB. Par exemple: inria, bureau107.
  


---
##InfluxDB
Pour afficher un heatmap, il y a quatre étaps:

- [x] Connecter l’application Node.js à la base de données InfluxDB
- [x] Obtenir les coordonnées de chaque capture dans la base de données InfluxDB. 
- [ ] Obtenir le CO2 de temps réel de chaque capture
- [x] Utiliser heatmap.js qui permettent de visualiser une heat map

Pour l'instant, les data dans la base de données ne sont pas tout bonnes, il y a plusieurs captures ne sont que pour tester. Donc je obtien le point plus recent dans chaque measurement. Mais je ne reussi pas à obtenir le CO2 de temps réel.  

---
##Problème
1. Error: failed to connect to [apolline_mongo_1:27017]
   Solurtion:
		Dans app.js, changer le nom de mongo container
		mongoose.connect("mongodb://mongo-container-name:27017/nodedb");

2.	Error: Cannot find module 'express'
	Solution:
		npm install

