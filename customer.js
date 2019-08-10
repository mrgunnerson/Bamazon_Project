var mysql = require("mysql");
var inquirer = require("inquirer");
// require("console.table");

// connect to MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",
  password: "lflhrbjg1!",
  database: "bamazon_db"
});

// Creates server connection and loads product data
connection.connect(function(err) {
  if (err) {
    return console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      throw err;
    }

    // Draw the table in the terminal using the response
    console.table(res);

    // Then prompt the customer for their choice of product, pass all the products to whichItem
    whichItem();
    // Console.log("Welcome to Bamazon!") Didn't trigger for me
  });
}

// Prompt the customer for a product ID
function whichItem() {
  // Ask customer which item they'd like to buy
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you'd like to purchase",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(response) {
      console.log(response);
      //   Ask the user how many of the item they would like to buy
      // var product = checkInventory(choiceId, inventory); throws an error
      if (response.choice.toLowerCase() === "q") {
        console.log("goodbye!");
        connection.end();
      } else {
        howMany(response.choice); // {choice: 1}
      }
    });
}

// Prompt the customer for a product quantity
function howMany(productId) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "And how many would you like?",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(response) {
      console.log(response);
      if (response.quantity.toLowerCase() === "q") {
        console.log("goodbye!");
        connection.end();
      } else {
        // make a MySQL query getting the quantity of the product by ID
        connection.query(
          "SELECT quantity FROM products WHERE id = ?",
          productId,
          function(err, res) {
            if (err) {
              throw err;
            }
            console.log(res);
            if (response.quantity > res[0].quantity) {
              console.log("Insufficient quantity!");
            } else {
              purchase(productId, response.quantity);
            }
          }
        );
      }
    });
}

// Purchase items
function purchase(productId, quantity) {
  connection.query(
    "UPDATE products SET quantity = quantity - ? WHERE id = ?",
    [quantity, productId],
    function(err, res) {
      if (err) {
        throw err;
      }
      console.log("\nThank you! Please come again");
      loadProducts();
    }
  );
}

// add quit feature
