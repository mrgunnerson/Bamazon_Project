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
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});


function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Draw the table in the terminal using the response
    console.table(res);

    // Then prompt the customer for their choice of product, pass all the products to whichItem
    whichItem(res);
  });
}

// Prompt the customer for a product ID
function whichItem(inventory) {
  // Ask customer which item they'd like to buy
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like to purchase",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(response){
        console.log(response);
        //   Ask the user how many of the item they would like to buy
      if (response.choice) {
        howMany(response);
      }
      else {
        // If not in the inventory, re-run loadProducts
        console.log("\nsold out!");
        loadProducts();
      }
    })
    
}

// Prompt the customer for a product quantity
function howMany(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "Quantity?",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(response){
        console.log(response);
        if (response.quantity > product.choice) {
            loadProducts();
          }
          else {
            // Let the user know we're sold out
            // Otherwise run makePurchase, give it the product information and desired quantity to purchase
            purchase(product.choice, response.quantity);
          }
    })

     
      
}

// Purchase items
function purchase(product, quantity) {
  connection.query(
    "UPDATE products SET quantity = quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
    
      console.log("\nThank you!");
      loadProducts();
    }
  );
}


function checkInventory(choiceId, inventory) {
    // Check for availability
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}


