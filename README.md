# API DOCS

### [Admin](src/api/admin/docs/ADMIN.md)
### [Balances](src/api/balances/docs/BALANCES.md)
### [Contracts](src/api/contracts/docs/CONTRACTS.md)
### [Jobs](src/api/jobs/docs/JOBS.md)

# Handle Transactional Operations

The only module that handles transactions is Jobs -> payJob `/jobs/:job_id/pay`; due to is the only one that performs more than one Update operation into the DataBase, if something went wrong then a Rollback is made to the Uncommitted operations.

- Update the Client's balance.
- Update the Contractor's balance.
- Update the Job status.

# Concurrency

Every module in the API is loosely coupled, which means that every endpoint can be easily exported as a sole Microservice or even as a Lambda function, Both strategies stand for an easy scaling for every service in the case is needed.


# Setup

- Node v16.14.0 {LTS}
- Npm v8.3.1

# Before Start
```properties
$ npm install
```

# Unit Testing

Some unit tests were added to the module Contracts -> getContactById `contracts/:id`; they can be run with:


```properties
$ npm run test
```

# Start the server
Navigate to the root directory and type into the console: 
 ```properties
$ npm start
```

# DEEL BACKEND TASK

💫 Welcome! 🎉


This backend exercise involves building a Node.js/Express.js app that will serve a REST API.

## Data Models

> **All models are defined in src/model.js**

### Profile
A profile can be either a `client` or a `contractor`. 
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

### Contract
A contract between a client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`
Contracts group jobs within them.

### Job
contractor get paid for jobs by clients under a certain contract.

## Getting Set Up

  
The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

  

1. Start by cloning this repository.

  

1. In the repo root directory, run `npm install` to gather all dependencies.

  

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

  

1. Then run `npm start` which should start both the server and the React client.

  
## Technical Notes

  

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize - **please spend some time reading sequelize documentation before starting the exercise.**

- To authenticate users use the `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.profile`. make sure only users that are on the contract can access their contracts.
- The server is running on port 3001.

  
## Implemented APIs
  

Below is a list of the required API's for the application.

  

1. ***GET*** `/contracts/:id` - This API is broken 😵! it should return the contract only if it belongs to the profile calling. better fix that!

2. ***GET*** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

3. ***GET*** `/jobs/unpaid` -  Get all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.

4. ***POST*** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

5. ***POST*** `/balances/deposit/:userId` - Deposits money into the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

6. ***GET*** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contractor that worked in the query time range.

7. ***GET*** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
```
 [
    {
        "id": 1,
        "fullName": "Reece Moyer",
        "paid" : 100.3
    },
    {
        "id": 200,
        "fullName": "Debora Martin",
        "paid" : 99
    },
    {
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
    }
]
```
