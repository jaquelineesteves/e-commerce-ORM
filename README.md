# e-commerce-ORM
  ![MIT](https://img.shields.io/static/v1?label=License&message=MIT&color=blue)
  
  ## Description 
   As demonstrated in the accompanying #videos, this is a REST API back-end application designed for managing products, categories, and tags in an e-commerce platform. The application allows users to view, add, update, and delete these entities. It leverages PostgreSQL for database management, Sequelize as the ORM (Object-Relational Mapping) tool, and Express.js via npm for handling server-side logic.

Technologies:

PostgreSQL for database storage.
Sequelize for ORM and database interactions.
Express.js (npm package) for building the REST API.

  ## Table of Contents 
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Video](#videos)
  * [Questions](#questions)
  
   ## Installation 
  To install necessary dependencies, run the following command:

```
   npm i

```

```
   psql -U postgres

```


  ## Usage

start installing dependencies, create database \i db/schema.sql then insert your postgres login and pin to the "dotenv" file, there's a dotenv file example to follow, you'll be able to perform CRUD requests in the Insomnia using http://localhost:3001/ the endpoints are: categories, tags and products.

```
   npm run seed

```
```
   npm run start

```
  ## License 
  This project is licensed under MIT license  


  ## Videos
Products: https://drive.google.com/file/d/14Bd1xaL08JzSrJp1GDMpvAjvXPa1J5DJ/view?usp=sharing

Tags: https://drive.google.com/file/d/1vdhht5LKmvyMFpMGTDLLeA5IyfKVyDhx/view?usp=sharing

Categories: https://drive.google.com/file/d/1SyBfhB3AfkFtmtMVvfU_QmwTfz1CP9rw/view?usp=sharing


  ## Questions
  If you have any questions about the repo, open an issue or contact me directly at jaaqfariasz@gmail.com. You can find more of my work at [jaquelineesteves](https://github.com/jaquelineesteves/).