# Hashtag You FE Assignment

Build the application described below, by cloning this repo and following the wireframes provided in `/wireframes`. Share a link to your repo when completed.

### Installation
You will need to be running Node v16.7.1

```sh
npm install
```

### Start Dev Server

```sh
npm run dev
```

## Assignment

Build out the navigation, products and cart features.

#### Notes
  - Follow the wireframes closely
  - Comment your code as much as possible
  - Do not use third party libraries, everything should be covered with browser standard methods
  - Use semantic HTML

#### Navigation

Open cart should open the Cart Modal

#### Products Container
  - Pull 6 products at a time from the database, and create a product component for each, with the following:
    - Product image
    - Product title
    - Product price
    - Add to Cart button
  - The product component must be styled following the structure provided in the wireframes
  - Add to Cart button should add that product with a quantity of 1
  - Load More button should retrieve the next 6 products and add them to the container
  
#### Cart

Implement a custom cart solution that showcases the current state of the cart
  - Should reflect the currently added products and their quantities
  - Remove button should remove that particular product from the Cart
  - The Cart should be persistent and the products should remain in the Cart upon page reload

### Querying the mock database
  Product list can be retrieved from http://localhost:5000/products, in order to be able to provide pagination, the following params can be used: `_page` and `_limit`, for example `http://localhost:5000/products?_page=1&_limit=10`