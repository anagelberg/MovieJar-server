# MovieJar-server

This is the backend for the MovieJar app, deployed at https://api.moviejar.ca/. The frontend repo is here: https://github.com/anagelberg/MovieJar

## Install Instructions

If you would like to run this app locally to store your data:

1. This app requires a TMDB API Key. [Register here](https://developer.themoviedb.org/docs/getting-started)
2. Create a new schema (called movie_db in my .env example) in MYSQL Work bench.
3. Install dependencies:

   ```
   npm i
   ```

4. Create a .env file in the root of the project folder with the following environment variables set to your information:

```
PORT=8080
BACKEND_URL=http://localhost
FRONTEND_URL=http://localhost:3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=rootroot
DB_DATABASE=movie_db
TMDB_API_KEY=<Your key>
```

4. Configure the database :

```
npm run migrate
```

5. OPTIONAL: If you would like to demo the app with seed data instead of creating your own in app:

```
npm run seed
```

6. Run the server:

```
npm start
```

## Endpoints

- Please note :userid should be defaulted to 1 for all endpoints, as creating new users and the like is not yet an option.

#### POST /jar

- Creates a new jar
- returns success / fail status code
- post body example:

```
  {
    "name": "My new jar",
    "creatorId": 1
}
```

#### GET /jar/:jarid

- sends detailed information about a given jar, including the movies and users contributing to that jar.

#### DELETE /jar/:jarid/:userid

- Deletes the user id from a given jar. If the user is the only user contributing to the jar, it also deletes the jar.

#### POST /:jarid/movie/:movieid

- Posts a new movie to a jar.
- Doesn't require a body. It searches the TMDB for the information based on the passed in TMDB. Returns failure if the id isn't a valid TMDB id.

#### DELETE /:jarid/movie/:movieid

- Deletes movie from jar. Sends fail/success status codes and messages.

#### GET /user/:userid/jar

- Gets a list of jar ids associated with the user.

#### PUT /user/:userid/movie/:movieid

- Edits user data
- Returns success/fail status codes and corresponding messages
- Optional additional parameters include custom rating and whether the user has already seen the movie. (Utility not yet in front-end).
- Example put body:

```
{
    "mental_vibe": "Neutral",
    "emotional_vibe": "Neutral"
}
```

#### POST /user/:userid/movie/:movieid

- Adds new user data for a movie.
- Returns success/failure status codes with messages.
- Optional additional parameters include custom rating and whether the user has already seen the movie. (Utility not yet in front-end).

- Body example:

```
{
    "mental_vibe": "Neutral",
    "emotional_vibe": "Neutral"
}
```

## Database schema:

The database was configured using 3 many many relationships between users, jars, and movies in order to aid with future expansion of the app.

![schema](https://github.com/anagelberg/MovieJar-server/assets/62032317/7ddb7a1d-5615-4f14-b234-d8de2b66db76)
