<!-- ABOUT THE PROJECT -->
## Animal Sighting Tracker App
Animal Sighting Tracker is an application that helps scientists monitor sightings of endangered species. 

## Features

- Forms to add new sightings, individuals, and species.
- Displays data from three tables using SQL JOIN queries.
- RESTful API to handle GET, POST, and DELETE requests.
- PostgreSQL to store species, individuals, and sightings data.


### Demo


https://user-images.githubusercontent.com/79618165/270061211-2ac65a7f-2197-4e8f-8020-4213d426956c.mov



## Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.


* [![Node.js][Node.js-badge]][Node-url]
* [![Express][Express-badge]][Express-url]
* [![PostgreSQL][PostgreSQL-badge]][PostgreSQL-url]
* [![React][React-badge]][React-url]
* [![Vite][Vite-badge]][Vite-url]

[Node.js-badge]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white
[Express-badge]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[PostgreSQL-badge]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Vite-badge]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E

[Node-url]: https://nodejs.org/
[Express-url]: https://expressjs.com/
[PostgreSQL-url]: https://www.postgresql.org/
[React-url]: https://reactjs.org/
[Vite-url]: https://vitejs.dev/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

1. Clone project & switch into the project directory.
   ```sh
   git clone https://github.com/cathydao95/animal-sighting-tracker
   ```
2. Install NPM packages on the client and server
   ```sh
     cd client && npm install && cd ../server && npm install
   ```
3. Setup Environment Variables
   ```js
   Copy the instructions from the .env.example files in the server.
   ```
4. Connect the database
   ```js
   cd server
   psql eventonica -f db.sql
   ```
5. Start the program
   ```js
   cd server && npm run dev
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>


