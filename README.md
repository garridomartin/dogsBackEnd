# dogsBackEnd
Back End Dogs Proyect
This is the back end of the Dogs project. Basically, it has a POST route /dogs, and three GET routes: /dogs (fetches all the dogs from the API and the database), 
/temperaments (fetches all the dog temperaments and saves them in the database), and /dogs/:id (fetches a dog with a specific id). Additionally, /dogs?name=xxx
route fetches a dog by name, disregarding case sensitivity.

The server is built with Express, and the database is PostgreSQL. The database is named "dogs" and it consists of three tables: Dogs, Temperaments, and an 
intermediate table that relates them.
