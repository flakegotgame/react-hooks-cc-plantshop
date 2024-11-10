# Phase 2 Code Challenge: Plantsy

## Plantsy assistant

Plantsy is an admin dashboard for a plant store where you can manage plants by adding, searching, updating prices, marking plants as sold out, and deleting them. It’s a React-based application that communicates with a backend API.

## Overview

Plantsy allows the user to:

1.View all plants available in the store.
2.Add a new plant with details like name, image URL, and price.
3.Search for plants by name to filter the available list.
4.Mark plants as sold out or available.
5.Update the price of a plant.
6.Delete a plant from the inventory.

## Features

1.View all plants on page load.
2.Add new plants using a form.
3.Search plants by name dynamically as you type.
4.Mark plants as Sold Out or Available.
5.Update plant prices and see changes reflected after refresh.
6.Delete plants from the inventory

# To set up and run this project on your local machine, follow the steps below:

## Prerequisites

Before you begin, ensure that you have the following installed:

Node.js (version 16 or higher)
npm (Node package manager)
json-server (for local API)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/plantsy.git
Navigate to the project folder:

bash
Copy code
cd plantsy
Install dependencies:

### Run the following command to install the required dependencies:

bash
Copy code
npm install
Start the backend server:

### If you don't have json-server installed globally, you can install it via npm:

bash
Copy code
npm install -g json-server
Then, you can start the backend server:

bash
Copy code
npm run server
This will start the backend server on port 6001.

Start the React development server:

In another terminal window, run:

bash
Copy code
npm start
The app will be running at http://localhost:3000 in your browser.

## Usage

Once everything is set up and running:

Home Page: The page will display all the available plants.
Add a Plant: Use the form at the top to add a new plant. Enter the name, image URL, and price.
Search for Plants: Use the search bar to filter plants by name.
Update Plant: Click the "Update Price" button next to a plant to change its price.
Mark as Sold Out: You can toggle the availability of a plant using the "Mark as Sold Out" button.
Delete Plant: Click the "Delete" button next to a plant to remove it from the list.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## End of README.md
. This file will guide users through the setup process and explain how to use the app.



