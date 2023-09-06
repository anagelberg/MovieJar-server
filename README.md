# MovieJar-server

This API is deployed here: https://movie-jar-server-93ba0cba5a01.herokuapp.com/

This is the backend for the the MovieJar app. 

The frontend repo is here: https://github.com/anagelberg/MovieJar 

## Install Instructions
If you would like to run this app locally to store your data: 

1) This app requires a TMDB API Key. [Register here](https://developer.themoviedb.org/docs/getting-started)
2) Create a new schema (called movie_db in my .env example) in MYSQL Work bench.
3) Install dependencies:

   ```
   npm run i
   ```
5) Create a .env file in the root of the project folder with the following environment variables set to your information:
   
```
PORT=8080
BACKEND_URL=http://localhost
CORS_ORIGIN=http://localhost:3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=rootroot
DB_DATABASE=movie_db
TMDB_API_KEY=<Your key>
```

4) Configure the database :
   
```
npm run migrate
```

5) OPTIONAL: If you would like to demo the app with seed data instead of creating your own in app:
   
```
npm run seed
```
6) Run the server:
   
```
npm start
```



## Database schema: 
The database was configured using 3 many many relationships between users, jars, and movies in order to aid with future expansion of the app. 
![DatabaseSchema](https://github.com/anagelberg/MovieJar-server/assets/62032317/c86f9fc3-12ec-4a97-b2dd-dd78c2b72e6b)


## Endpoints 

#### #POST /jar

#### #GET /jar/:jarid

#### #DELETE /jar/:jarid/:userid

#### #POST /:jarid/movie/:movieid

#### DELETE /:jarid/movie/:movieid

#### GET /user/:userid/jar

#### PUT /user/:userid/movie/:movieid

#### POST /user/:userid/movie/:movieid

