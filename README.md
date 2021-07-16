To start everything:
- NPM install in both the ./Server and the ./Client
- go to ./Server and run npm start
- go to ./Client and run npm run serve
- start psql for auth (postgres -D ....)

The code in the ./Databse folder is not the actual database 
  but just a set of commands to get the prepdata ready

Some more words on the ./Client Vue app
- Bootstrap5 and Vue3
- public/index.html is nothing more than the holder of the app
- router is responsible for the routing although it is not routing because it is a SINGLE PAGE APPLICATION
- main.js is useless, just starts the app up
- 


NEW STUFF ABOUT HASURA
Relationships allow it to be very easy between these things
HASURA_GRAPHQL_UNAUTHORIZED_ROLE => set roles for when you are not authed
roles in general are super easy to manage

https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html#configuring-jwt-mode

you have an auth0 account, but I have no idea why you would ever use it. Just use the original thing to understand it better
jure.potok@gmail.com
Potok2002

https://hasura.io/blog/gqless-fetch-your-graphql-data-automagically/ 