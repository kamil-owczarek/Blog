# Table of contents
* [General info](#general-info)
* [Main technologies](#main-technologies)
* [Setup](#setup)
    - [MongoDB](#mongodb)
    - [Django](#django)
    - [React](#react)

# General info
Fullstack REST application for posting in Blog. Backend is based on Python and Django REST Framework. Frontend part is created with React and axios. Bootstrap is used for page styling.

# Main technologies
Project is created with:
* Python version: 3.9.1
* Django version: 3.0.5
* Django Rest Framework version: 3.12.2
* React version: 17.0.1
* axios version: 0.21.1
* Bootstrap version: 4.5.3
* MongoDB version: 4.4.3

# Setup
## MongoDB 
To install and configure MongoDB locally, use [official documentation](https://docs.mongodb.com/manual/installation/).
You can change configuration of MongoDB connection in Django `settings.py` file and `DATABASE` property.

## Django
### Requirements
- Install Django requirements:
```
cd backend
pip install -r requirements.txt
```
### Server
- Start local server with:
```
python manage.py runserver 8080
```
### URLs
To access data from application use below URLs:
Base URL: `https://localhost:8080/api/`
|Endpoint|HTTP Method|CRUD Method|Result|
|---|---|---|---|
|`posts`|GET|READ|Get all posts|
|`posts/:id`|GET|READ|Get a single post|
|`posts?title=`|GET|READ|Get all posts with specific title|
|`posts`|POST|CREATE|Create a new post|
|`posts/:id`|PUT|UPDATE|Update a post|
|`posts/:id`|DELETE|DELETE|Delete a single post|
|`posts`|DELETE|DELETE|Delete all posts|
### API tests
To run Django Rest Framework tests type:
```
python manage.py test
```
Also, tests are written in the Postman. To import `BlogTests.postman_collection.json` file to the Postman check [official documentation](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/).

## React 
### Requirements
- Install React dependencies:
```
cd frontend/blog-react-app
npm install
```
### Server
- Create `.env` file and specfic port for local server:
```
cd frontend/blog-react-app
echo "PORT=8081" > .env
```
- Start local server for web application with:
```
npm start
```
- Start local server for handling email from contact form:
```
cd blog-react-app/src
node server.js
```
### URLs
To access data from application use below URLs:
Base URL: `https://localhost:8081/`
|Endpoint|HTTP Method|CRUD Method|Result|
|---|---|---|---|
|`/ or posts`|GET|READ|Get all posts|
|`posts/:id`|GET|READ|Get a single post|
|`posts/add`|POST|CREATE|Create a new post|
|`contact`|POST|CREATE|Create message to application author|
|`posts/:id`|PUT|UPDATE|Update a post|
|`/ or posts`|DELETE|DELETE|Delete all posts|
|`posts/:id`|DELETE|DELETE|Delete a single post|
### Contact form
To configure server for contact form email handling, use properties in `config.js` and `server.js`. Server is written with Express.js framework.