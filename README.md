# Anime Display App using Kitsu API

This project is a web application built with ViteJS and ReactJS that displays information about anime using the Kitsu API.

I'm using axios to fetch the API and i'm combining

## Installation

To get started with this project, you'll need to have Node.js and npm installed on your computer.

1. Clone the repository: git clone https://github.com/Passiflore/kitsu-app.git.
2. Navigate to the project directory: `cd Kitsu-App`
3. Install the dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your web browser and go to http://localhost:3000 to see the app in action.

## Features

- Browse a list of anime titles and view their details.
- Search for anime titles by name.
- Filter anime titles by category or status.

## Usage

Once you have the app running, you can browse and search for anime titles using the interface. Click on a title to view its details, including a synopsis, poster image, and other information.

## Technical Details
The app fetches data from the Kitsu API using the Axios library, and manages the data using React-Query. React-Table is used to display the data in a sortable and filterable table.

## Technologies Used

[ViteJS](https://vitejs.dev/) - A build tool that provides fast and efficient development server and builds.
[ReactJS](https://react.dev/) - A popular JavaScript library for building user interfaces.
[Kitsu API](https://kitsu.docs.apiary.io/) - A free and open API for accessing anime and manga data.
[Axios](https://axios-http.com/) - A promise-based HTTP client for JavaScript.
[React-Query](https://react-query.tanstack.com/) - A React library for managing and caching asynchronous data.
[React-Table](https://react-table.tanstack.com/) - A React library for building tables and grids.