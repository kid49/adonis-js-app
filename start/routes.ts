/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {

  Route.post("/register", "AuthController.register").as("auth.register");
  Route.post("/login", "AuthController.login").as("auth.login");
  Route.group(() => {
    Route.resource("venue", "VenuesController")
      .apiOnly()
      .middleware({
      '*': ["auth"]
    })
    Route.resource("fields", "FieldsController")
      .apiOnly()
      .middleware({
        "*": ["auth"],
      });
    Route.resource("bookings", "BookingsController")
      .apiOnly()
      .middleware({
        "*": ["auth"],
      });
    Route.put("bookings/:id/join", "BookingsController.join")
      .middleware('auth');
    Route.get('/api/hello', 'TestsController.hello')
  })
}).prefix('api/v1')
