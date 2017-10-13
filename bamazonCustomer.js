// Dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);

// MySQL connection parameters
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'alttimtal',
  database: 'bamazon'
});

// Displaying all of the items available for sale.
function displayItemsForSale() {

  queryString = 'SELECT * FROM products';
  connection.query(queryString, function(err, data) {
    if (err) throw err;

    console.log('Items for Sale: ' + '\n');
    var strOut = '';
    for (var i = 0; i < data.length; i++) {
      strOut = '';
      strOut += 'Item ID: ' + data[i].item_id + '\n';
      strOut += 'Product Name: ' + data[i].product_name + '\n';
      strOut += 'Department: ' + data[i].department_name + '\n';
      strOut += 'Price: $' + data[i].price + '\n';

      console.log(strOut);
    }
      console.log("\n");
      userPrompt();
  })
}

//Prompting users with two messages about id and quantity
function userPrompt() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'item_id',
      message: 'Please enter the ID of the item you would like to purchase.'
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'Please enter the quantity.'
    }
  ]).then(function(input) {
    var item = input.item_id;
    var quantity = input.quantity;
    var queryString = 'SELECT * FROM products WHERE ?';
    connection.query(queryString, {item_id: item}, function(err, data) {
      if (err) throw err;

      if (data.length === 0) {
        console.log('ERROR: Please select a valid Item ID.');
        displayItemsForSale();

      } else {
        var productData = data[0];
        if (quantity <= productData.stock_quantity) {
          console.log('This item is available. Placing order!');
          var updateQueryString = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

          connection.query(updateQueryString, function(err, data) {
            if(err) throw err;
            console.log('Your order has been placed. Your total is $' + productData.price * quantity + '.');
            connection.end();
          })
        } else {
          console.log('\nInsufficient quantity!\n');
          console.log('Press c to continue.');
          pressContinue();
        }
      }
    })
  })
}
function pressContinue() {
    
    // without this, we would only get streams once enter is pressed
    process.stdin.resume();
    process.stdin.setEncoding( 'utf8' );
    // on any data into stdin
    process.stdin.on( 'keypress',( str, key ) => {
      // ctrl-c ( end of text )
      
      if(key.name === 'c'){
         runBamazon();
      }
      else{ return; }
      // write the key to stdout all normal like
     
    });
};

function runBamazon() {
    displayItemsForSale();
};
runBamazon();

