API DOCUMENTATION:

Cache was realized with MongoDB, at most one document for each endpoint at any given time. During request processing if the document
is older than 24 hours, it will be deleted and replaced with a fresh one.

REGISTER

The register route lets you create an account, which you will need to utilize every other resource of this API.
This is the only resource that doesn't require you to pass a valid username/password within a request. In order to create an account you need to pass an object containing your desired username and password. Both username and password need to be between 8 and 32 characters long.

Example request:
https://localhost/users/register

Attached JSON object example: 
{
    "name":"newname",
    "password":"newpassword"
}

Upon creating an account, this route returns an object containing name and password

FILMS

The films route will pull all the films from either the cache (if it was requested within last 24h) or the original swapi endpoint. Resource requires passing a JSON object containing a valid name, password and optionally the id of a single resource (if you want to pull it by id)

Example:
{
    "name":"validname",
    "password":"validpassword",
    "id":1 //OPTIONAL
}

Route provides pagination options using attributes, as such:
-page (integer)  
-size (integer)
Defaults are 1 for page and 5 for size. Size determines amount of records on a page, page determines which page will be pulled.

Sample request: https://localhost/swapi/films/?page=2&size=5

FILMS

The films route will pull all the films from either the cache (if it was requested within last 24h) or the original swapi endpoint. Resource requires passing a JSON object containing a valid name, password and optionally the id of a single resource (if you want to pull it by id)

Example:
{
    "name":"validname",
    "password":"validpassword",
    "id":1 //OPTIONAL
}

Route provides pagination options using attributes, as such:
-page (integer)  
-size (integer)
Defaults are 1 for page and 10 for size. Size determines amount of records on a page, page determines which page will be pulled.

Sample request: https://localhost/swapi/films/?page=1&size=20

SPECIES

The species route will pull all the species from either the cache (if it was requested within last 24h) or the original swapi endpoint (it will coalesce all original result pages in order to return a full set of data). Resource requires passing a JSON object containing a valid name, password and optionally the id of a single resource (if you want to pull it by id)

Example:
{
    "name":"validname",
    "password":"validpassword",
    "id":1 //OPTIONAL
}

Route provides pagination options using attributes, as such:
-page (integer)  
-size (integer)
Defaults are 1 for page and 10 for size. Size determines amount of records on a page, page determines which page will be pulled.

Sample request: https://localhost/swapi/species/?page=1&size=20

VEHICLES

The vehicles route will pull all the vehicles from either the cache (if it was requested within last 24h) or the original swapi endpoint (it will coalesce all original result pages in order to return a full set of data). Resource requires passing a JSON object containing a valid name, password and optionally the id of a single resource (if you want to pull it by id)

Example:
{
    "name":"validname",
    "password":"validpassword",
    "id":1 //OPTIONAL
}

Route provides pagination options using attributes, as such:
-page (integer)  
-size (integer)
Defaults are 1 for page and 10 for size. Size determines amount of records on a page, page determines which page will be pulled.

Sample request: https://localhost/swapi/vehicles/?page=1&size=20

STARSHIPS

The starships route will pull all the starships from either the cache (if it was requested within last 24h) or the original swapi endpoint (it will coalesce all original result pages in order to return a full set of data). Resource requires passing a JSON object containing a valid name, password and optionally the id of a single resource (if you want to pull it by id)

Example:
{
    "name":"validname",
    "password":"validpassword",
    "id":1 //OPTIONAL
}

Route provides pagination options using attributes, as such:
-page (integer)  
-size (integer)
Defaults are 1 for page and 10 for size. Size determines amount of records on a page, page determines which page will be pulled.

Sample request: https://localhost/swapi/starships/?page=1&size=20

PLANETS

The planets route will pull all the planets from either the cache (if it was requested within last 24h) or the original swapi endpoint (it will coalesce all original result pages in order to return a full set of data). Resource requires passing a JSON object containing a valid name, password and optionally the id of a single resource (if you want to pull it by id)

Example:
{
    "name":"validname",
    "password":"validpassword",
    "id":1 //OPTIONAL
}

Route provides pagination options using attributes, as such:
-page (integer)  
-size (integer)
Defaults are 1 for page and 10 for size. Size determines amount of records on a page, page determines which page will be pulled.

Sample request: https://localhost/swapi/planets/?page=1&size=20

WORDPAIRS

This route will return an array of pairs of unique words from all film openings with number of their occurences in text.
It requires passing a JSOJN object containing a valid name and password. Route takes no query parameters

Example:
{
    "name":"validname",
    "password":"validpassword"
}

Sample request: https://localhost/swapi/wordpairs

COMMON_NAME

This route will return a character from the /people API that occurs the most often across all of the openings of the film, with number of occurences. Only exact matches are processed. It requires passing a JSOJN object containing a valid name and password. Route takes no query parameters

Example:
{
    "name":"validname",
    "password":"validpassword"
}

Sample request: https://localhost/swapi/common_name