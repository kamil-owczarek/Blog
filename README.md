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


### URLs
Connect to this URLs to use functions:
* Home page: `https://<server_ip>/`
* List of pizza: `https://<server_ip>/pizza/list`
* Add pizza: `https://<server_ip>/pizza/add`
* Show detail about pizza: `https://<server_ip>/pizza/<pizza_id>`
* Vote for pizza: `https://<server_ip>/pizza/vote`
* Add topping: `https://<server_ip>/topping/add`
