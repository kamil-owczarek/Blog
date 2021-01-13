## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
The REST application based on Django and Python.

## Technologies
Project is created with:
* Python version: 3.9.1
* Django version: 3.0.5
* Django Rest Framework version: 3.12.2
* React version: 17.0.1
* axios version: 0.21.1
* bootstrap version: 4.5.3

## Setup
### Requirements
- Install requirements:
```
pip install -r requirements.txt
```

### Django
- Start local server with:
```
python manage.py runserver
```

### React 
- Start local server for web application with
```
cd blog-react-app
npm start
```

- Start local server for handling email from contact form:
```
cd blog-react-app/src
node server.js
```