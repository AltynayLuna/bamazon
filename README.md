Amazon-like storefront supported by a MySQL database. The app takes in orders from customers and depletes stock from the store's inventory. 
The app first displays the inventory, then it prompts users with two messages. The 1st message asks them the ID of the product they would like to purchase and the 2nd one asks how many units of the product they would like to buy. Once the customer has placed the order, the app checks if the store has enough of this product to meet the customer's request. If the store has enough of the product, it places the customer's order and displays the amount due. After the order is placed, the MySQL database is updated with a new remaining quantity. However, if the inventory does not have enough of the product, the app logs Insufficient quantity! and then prevents the order from going through.

![Alt text](/screenshots/01.PNG?raw=true "Screenshot1")
![Alt text](/screenshots/02.PNG?raw=true "Screenshot2")
![Alt text](/screenshots/03.PNG?raw=true "Screenshot3")
![Alt text](/screenshots/04.PNG?raw=true "Screenshot4")
![Alt text](/screenshots/05.PNG?raw=true "Screenshot5")

