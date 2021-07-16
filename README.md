To start everything:
- NPM install in both the ./Server and the ./Client
- go to ./Server and run npm start
- go to ./Client and run npm run serve
- start a PostgreSQL server with specifications:
    host: "localhost",
    port: 5432,
    database: "test",
    user: "postgres",
    password: "password",
  or simply change the data in ./Server/index.js

The code in the ./Databse folder is not the actual database 
  but just a set of commands to get the prepdata ready

Some more words on the ./Client Vue app
- Bootstrap5 and Vue3
- public/index.html is nothing more than the holder of the app
- router is responsible for the routing although it is not routing because it is a SINGLE PAGE APPLICATION
- main.js is useless, just starts the app up
- 