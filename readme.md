What You Will Use:
Node.js
Express

Create a shopping list with Node.js:

Instructions
Create an HTML file.
Add a form where you will allow the user to submit a shopping item and an amount.
Create a js file, where you will have your express server.
When the form is submitted (ie. the user clicks on the “Submit” button), send the data to the server and save it in a variable (ie. save the item to your shopping list).
After submitting the data, direct the user to a page displaying your shopping list items (including the newly added items).


To create a shopping list using Node.js and Express, follow the instructions below:

Step 1: Set Up the Project

Create a new directory for your project.
Open a terminal or command prompt and navigate to the project directory.
Initialize a new Node.js project by running the following command:

npm init -y

Install the required dependencies (Express) by executing the following command:

npm install express

Step 2: Create HTML File

Inside the project directory, create an HTML file named index.html.
Add the following HTML code to the index.html file:

Step 3: Create JavaScript File (Express Server)

Inside the project directory, create a JavaScript file named app.js.
Add the following code to the app.js file:

Step 4: Run the Express Server

Open a terminal or command prompt and navigate to the project directory.
Run the following command to start the Express server:

node app.js


Click on http://localhost:3000 to access the shopping list form.
Fill in the item and amount fields, then click the "Submit" button.
You will be redirected to a page displaying your shopping list items, including the newly added items.
Note: Make sure to have Node.js and Express installed before running the project.











// ADD DATABASE TO MINI PROJECT

To add the shopping list items and their quantity to a PostgreSQL database using pgAdmin and SQL, 
perform the following steps:

Install the necessary dependencies:
pg package: This package allows you to interact with PostgreSQL from Node.js.

npm install pg

Set up the PostgreSQL database:
Install and configure PostgreSQL on your system if you haven't already.
Create a new database in pgAdmin for your shopping list items.
Update the server.js file with the necessary database code:
Import the pg package and create a new PostgreSQL client instance.
Modify the /addItem route to insert the item and amount into the database instead of storing it in the shoppingList array.
Modify the /list route to fetch the shopping list items from the database instead of using the shoppingList array.


Here's the updated code for the server.js file:


const express = require('express');
const app = express();
const path = require('path');
const { Pool } = require('pg');

// Set up middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Create a new PostgreSQL client
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // or your PostgreSQL port
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission and save item to the shopping list
app.post('/addItem', (req, res) => {
  const { item, amount } = req.body;
  const query = 'INSERT INTO shopping_list (item, amount) VALUES ($1, $2)';
  const values = [item, amount];
  pool.query(query, values, (error, result) => {
    if (error) {
      console.error('Error inserting item:', error);
      res.send('Error inserting item into database');
    } else {
      res.redirect('/list');
    }
  });
});

// Display the shopping list items
app.get('/list', (req, res) => {
  const query = 'SELECT * FROM shopping_list';
  pool.query(query, (error, result) => {
    if (error) {
      console.error('Error retrieving items:', error);
      res.send('Error retrieving items from database');
    } else {
      const items = result.rows;
      let listItems = '';
      for (const item of items) {
        listItems += `<li>${item.amount} ${item.item}</li>`;
      }
      res.send(`
        <h1>Shopping List Items</h1>
        <ul>${listItems}</ul>
      `);
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

Note: Replace the placeholder values (your_username, your_host, your_database, your_password) in the pool configuration with your actual PostgreSQL connection details.

In this updated code, we use the pg package to interact with the PostgreSQL database. The /addItem route inserts the item and amount into the shopping_list table, and the /list route fetches the items from the same table.


Ensure that you have created a shopping_list table in your PostgreSQL database with the appropriate columns (item and amount).

To create the shopping_list table in pgAdmin with the appropriate columns (item and amount), you can use the following SQL statement:

Inside pgadmin database:

CREATE TABLE shopping_list (
  id SERIAL PRIMARY KEY,
  item VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL
);

Here's how you can execute this SQL statement in pgAdmin:

Open pgAdmin and connect to your PostgreSQL server.
In the Object browser on the left-hand side, expand your database and navigate to the "Schemas" folder.
Right-click on the "Schemas" folder and select "Query Tool" from the context menu.
In the Query Tool, paste the SQL statement mentioned above.
Click the "Execute" button or press the F5 key to execute the query.
This will create the shopping_list table with the specified columns in your PostgreSQL database. You can now use this table to store the shopping list items and their quantities in the exercise's server.js file.







In the server.js file, the placeholder values your_username, your_host, your_database, and your_password are placeholders that need to be replaced with your actual PostgreSQL connection details. These details can be found in your PostgreSQL configuration.

Typically, the connection details include the following:

your_username: This refers to the username used to connect to your PostgreSQL database.
your_host: This is the host or IP address where your PostgreSQL database is hosted. It could be something like localhost if you are running PostgreSQL on your local machine, or it could be a specific IP address or domain name.
your_database: This is the name of the database you want to connect to in PostgreSQL.
your_password: This is the password associated with the specified username for connecting to your PostgreSQL database.
To find these connection details in pgAdmin, you can follow these steps:

Open pgAdmin and connect to your PostgreSQL server.
In the Object browser on the left-hand side, expand the "Servers" folder, and then expand your server.
Expand the "Databases" folder to view the list of databases.
Locate the specific database you want to connect to and make a note of its name.
To find the username and password, expand the "Login/Group Roles" folder, and you should see a list of roles.
Locate the role or user that corresponds to the username you want to use for connecting to the database. Make a note of the username and its associated password.
The host information can typically be set to localhost if you are running PostgreSQL on your local machine. If your PostgreSQL database is hosted on a remote server, you will need to obtain the appropriate host information from your hosting provider or system administrator.
Once you have gathered the actual PostgreSQL connection details, you can replace the placeholder values (your_username, your_host, your_database, your_password) in the server.js file with the corresponding values.















// Upload server to railway instead of using local host


If you want to deploy your Express server to a hosting platform like Railway, you can follow these steps:

Sign up for a Railway account at https://railway.app.

Install the Railway CLI by following the instructions provided in the Railway documentation.

Open a terminal or command prompt and navigate to your project directory.
Authenticate with Railway using the CLI:

railway login

Initialize your project with Railway:

railway init

Follow the prompts to configure your project settings, including selecting your project directory and specifying your default deployment environment.
Once your project is set up, you can deploy it to Railway using the following command:

railway up

This command will package your project and deploy it to Railway's hosting platform. It will provide you with a unique URL where your server will be accessible.
After deploying your server to Railway, you will need to update the PostgreSQL connection details in your code to match the credentials provided by Railway.
In the server.js file, locate the pool configuration object where the PostgreSQL connection details are specified.
Update the user, host, database, password, and port values in the pool configuration with the credentials provided by Railway for connecting to your PostgreSQL database.
For example, your updated pool configuration might look like this:

const pool = new Pool({
  user: 'railway_username',
  host: 'railway_host',
  database: 'railway_database',
  password: 'railway_password',
  port: railway_port,
});

Save the changes to your server.js file.
Commit the changes to your version control system (if you are using one) and deploy the updated code to Railway using the railway up command.
Railway will handle the deployment and provide you with a URL where your server is accessible.
Update your pgAdmin server details to match the credentials provided by Railway:
Open pgAdmin and navigate to the server connection settings for your PostgreSQL database.
Update the host, port, database name, username, and password in the pgAdmin server configuration to match the credentials provided by Railway.
Save the changes to the pgAdmin server configuration.
With these steps, you can deploy your Express server to Railway and update the necessary connection details in both your code and pgAdmin to make the connection work with the deployed server.






//DEPLOYMENT

It is recommended to separate your server-side code (e.g., server.js) and client-side code (e.g., index.html, CSS, JavaScript) into separate projects when deploying them to a hosting platform like Railway.

Here are a few reasons why it's beneficial to separate them:

Scalability: Separating the server-side and client-side code allows you to scale each component independently. If your application becomes more complex or receives higher traffic, you may need to scale the server separately from the frontend.
Maintenance: Separating the codebases makes it easier to manage and update each part of your application. It reduces the risk of accidentally modifying or breaking the server code when making frontend changes or vice versa.
Deployment: Separating the codebases enables you to utilize different deployment strategies or hosting providers optimized for each component. For example, you can use a static site hosting service (e.g., Netlify, Vercel) for the frontend and a serverless hosting service (e.g., AWS Lambda, Google Cloud Functions) for the server.
That being said, if your application is small or you have specific requirements that justify keeping the server and frontend code together in the same project, you can upload both files to the same folder on Railway. Railway supports various server frameworks and can serve both the backend and frontend code from the same project folder.

Keep in mind that if you decide to keep both files together, you should configure the server to serve the frontend files correctly. You may need to add additional routes or middleware to handle requests for static files like index.html, CSS, and JavaScript files.

If you prefer to host the frontend separately, you can upload the frontend files to a static site hosting service and configure it to work with your backend server deployed on Railway. The backend server can then serve API endpoints that the frontend can consume.

Ultimately, the decision to separate or combine the server and frontend code depends on the complexity and requirements of your application. Separation generally provides more flexibility and scalability, but there are cases where hosting them together makes sense.