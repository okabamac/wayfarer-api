# wayfarer-api
WayFarer is a public bus transportation booking server.

[![Build Status](https://travis-ci.org/okabamac/wayfarer-api.svg?branch=develop)](https://travis-ci.org/okabamac/wayfarer-api) [![Coverage Status](https://coveralls.io/repos/github/okabamac/wayfarer-api/badge.svg?branch=develop)](https://coveralls.io/github/okabamac/wayfarer-api?branch=develop)

## Table of Content

- [Getting Started](#Getting-Started)
- [Technology Stack](#Technology-Stack)
- [Installation and Usage](#Installation-and-Usage)
- [Testing](#Testing)
- [Feature](#Features)
- [Routes for Express](#Routes-for-Express)
- [Models](#Models)
- [API Documentation](#API-Documentation)
- [License](#License)
- [FAQ](#FAQ)

## Getting Started
To run this application, you should have the following:
- Node
- NPM/Yarn (NPM comes with Node)

## Installation
The following commands enables you run the app:
- clone the repo: RUN THE COMMAND
## Deployments
This application was deployed to the following:
- [Heroku](https://wayfarer-bus-api.herokuapp.com/) : For API endpoints.
- [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2359702) : Pivot Tracker stories
- [Swagger Documentation](https://wayfarer-bus-api.herokuapp.com/api-docs/) : Swagger Documentation
```
>> git clone https://github.com/okabamac/wayfarer-api.git
```
- Install the dependencies: RUN THE COMMAND
```shell
>> npm i 
```
- Start the server: RUN THE COMMAND
```
>> npm run start
```
- You should use ```localhost:3000``` as your base url

## Features

* User (client) can sign up.
* User (client) can login.
* Admin can create a trip
* Both Admin and Users can see all trips
* Users can book a seat on a trip
* View all bookings. An admin can see all bookings, while user can see all of his/her bookings
* Users can delete their booking
* Admin can cancel a trip
* User can get and filter trips using trip destination
* User can get and filter trip using trip origin


## Testing
To run the test USE the following command
```
>> npm run test
```
#### What does this test covers?
The test covers all the endpoints and requests sent to them.

## API Endpoints
| METHOD   | DESCRIPTION                                  | ENDPOINTS                 
| ---------|----------------------------------------------| ------------------------------------------------| 
| POST     | User's Sign up                               | `/api/v1/auth/signup`                           |
| POST     | User's Sign in                               | `/api/v1/auth/signin`                           |
| POST     | Admin create trip                            | `/api/v1/v1/trips`                              |
| GET      |    Get all trips                               | `/api/v1/trips`                               |
| GET      |    Get trip by ID                               | `/api/v1/trips/:trip_id`                               |
| GET       |   Get trips by destination                    | `/ap/v1/trips/?destination=Ogoja`             |
| GET       |   Get trips by origin                   | `/ap/v1/trips/?origin=Calabar`             |
| POST       |   Register a bus                   | `/ap/v1/buses`             |
| GET       |   Get all bus                   | `/ap/v1/buses`             |
| GET       |   Get a bus                   | `/ap/v1/buses/:bus_id`             |
| POST       |   Make a booking                   | `/ap/v1/bookings`             |
| GET       |   Get all bookings                   | `/ap/v1/bookings`             |
| GET       |   Get a booking                   | `/ap/v1/bookings/:booking_id`             |
| DELETE       |   Delete a booking                   | `/ap/v1/bookings/:booking_id`             |
| PATCH       |   Patch a trip                   | `/ap/v1/trips/:trip_id`             |


## Author
Okaba Mark

## License
[Andela](https://www.andela.com)

