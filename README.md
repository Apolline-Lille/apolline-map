# apolline-map
A web application for rending air quality maps and visualisations 

This project is to
- [x]  create a web application with node.js and Express and dispaly a map of University of Lille 1
- [x]  visualize a heat map
- [x]  add a sensor to the map
- [x]  delete a sensor from the map

There are two ways to start this project
### 1. With docker
```
docker-compose up
```
Now, you can visit the site localhost:3000

Add a admin ro test
```
docker exec -it apollinemap_mongo_1 /bin/bash
mongo
use nodedb
db.users.insert({name:"x",password:"x"}) 
```
### 2. Without docker
You need to start mongodb first

```
cd <mongoDIR>/bin
./mongd -dbpath <dbDIR>
```
Then start project
```
cd <projectDIR>
npm install
npm start
```
Add a admin ro test
```
cd <mongoDIR>/bin
./mongo
use nodedb
db.users.insert({name:"x",password:"x"}) 
```