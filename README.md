## Architecture and tech choices
 
 Architecture:
    I attempted to implement this app using a layered architecture (rest layer, service layer, and db layer), this way 
    code is nicely decoupled and we are able to change database or web framework easily without making any changes to core business logic. 
    I used OO design, and patterns such as dependency injection, which makes relations between each layer more transparent
    and also this would make code more testable if we were to write unit tests(which i omitted for this assignment for reasons
    explained in book-controller/index.spec.ts)

 Database choice: 
    I decided not to use relational database for this assignment although it might be a better choice if we were to implement proper
    many to many relationship between books and authors. But since the only requirement for this assignemt is to implement book management,
    I just use mongoDB because it makes overall implementation more simple and straightforward. And i don't think, that overhead
    of storing duplicit authors is that terrible.
    I decided to use mongoose ORM for mongodb because of schema validation.

 Framework choice:
    I decided to use expressjs, since it is a framework that I am familiar with and also because
    I like it's middleware system, but other than that I don't have a preference for any node.js framework.

 For both speed of development was a factor in my decision   


## Getting started

Dependencies: git, node.js, yarn, mongodb

## To run locally

1. Clone this repo and enter!

   ```
   git clone https://github.com/JozefKysel/book-crud-app.git
   cd book-crud-app
   ```

2. Start server.
   ```
   yarn start:watch // for local development
   ```

3. Run tests.
   ```
   yarn test
   ```

Enjoy!

# TechStack
mongodb (mongoose as ORM), express

