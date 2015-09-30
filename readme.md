# Node Rest API Framework

A simple REST API framework built using Node.js, Express and using MongoDB as a database.

## Developer setup & dependencies

Install Node and MongoDB using Homebrew

`brew update`

`brew install node`

`brew install mongodb`

More info on installing MongoDB can be found here: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

## Getting up and running

### Clone the repo

`$ git clone https://github.com/rstphnsn/node-rest-api-framework.git node-rest-api-framework`

`cd node-rest-api-framework`

### Install and run the app

Make sure mongo is up and running

`mongod`

Install and start the application

`npm install`

`npm start`

The services will start running on locahost:3001.

At first run your database will be empty. You can use the services to add, update and delete documents.

To use a document name other then default "items" use the following instead of `npm start`

`DOCUMENT_NAME=your_item_name node app.js`

To run the API on a different port by use the following

`PORT=3002 node app.js`

### Development workflow

If you are making changes to your own version of the framework you can use [Nodemon](https://github.com/remy/nodemon) to watch the JS files. Nodemon will then stop and restart the app when needed.

`npm run dev`

## REST API endpoints

By default the app provides the following endpoints.

### GET /v1/about

A health check endpoint to make sure the API is up and running

#### Example Response

```
{
    success: {
        statusCode: 200,
        message: "App is up and running"
    }
}

```


### GET /v1/items

Lists all documents in the items table.

#### Example Response

```
[
    {
        "_id": "555cbad1329d9abb83621bae",
        "first_name": "Stephen",
        "last_name": "Dunn",
        "email": "sdunn0@java.com",
        "country": "China",
        "lat": "28.31034",
        "lng": "121.00418"
    },
    {
        "_id": "555cbad8329d9abb83621baf",
        "first_name": "Mary",
        "last_name": "Owens",
        "email": "mowens1@dagondesign.com",
        "country": "Venezuela",
        "lat": "8.81556",
        "lng": "-65.3225"
    },
    {
        "_id": "555cbae1329d9abb83621bb0",
        "first_name": "Jessica",
        "last_name": "Jackson",
        "email": "jjackson2@utexas.edu",
        "country": "Canada",
        "lat": "42.91679",
        "lng": "-81.41646"
    }
]
```

### POST /v1/items

Post a document into the items table.

#### Example Response
```
{
    "first_name": "Ann",
    "last_name": "Parker",
    "email": "aparker3@netlog.com",
    "country": "China",
    "lat": "28.37222",
    "lng": "110.92722",
    "_id": "555cbc27329d9abb83621bb1"
}

```

### GET /v1/items/:id

Get an individual document from the items table based by `_id`.

#### Example Response

```
{
    "_id": "555cbad1329d9abb83621bae",
    "first_name": "Stephen",
    "last_name": "Dunn",
    "email": "sdunn0@java.com",
    "country": "China",
    "lat": "28.31034",
    "lng": "121.00418"
}
```


### PUT /v1/items/:id

Update an individual document from the items table based by `_id`. This is currently set up so that you do not need to put the whole object. Individual properties can be updated. If a property is PUT that doesn't exist on the document it will be added to the document.

#### Example Response

```
{
    "_id": "555cbad1329d9abb83621bae",
    "first_name": "Stephen",
    "last_name": "Dunn",
    "email": "sdunn0@java.com",
    "country": "China",
    "lat": "28.31034",
    "lng": "121.00418"
}
```

### DELETE /v1/items/:id

Delete an individual document from the items table based by `_id`.

#### Example Response

```
{}
```
