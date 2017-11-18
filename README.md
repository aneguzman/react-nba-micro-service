# React NBA micro-service

NBA React API based on Node js to get news, scores, standings data from the NBA.

## Table of Contents

- [Getting Started](#Getting_Started)
- [Usage](#Usage)
- [Stack](#Stack)
- [API Routes](#Upcoming_Work)

## Getting Started

### Installation

- Run npm start to start the application
- Access the app on localhost:9000
    
## Usage

- Get the latest news in the NBA
- Get the scores of the games from a selected date
- Get the current standings of the teams

## Stack

- Node JS

## API Routes

- GET:api/scores
  -Returns the list of game scores for a give date
  -Payload:
    -date (in '20171125' format)

- GET:api/standings
  -Returns the list of team standings for each NBA conference

- GET:api/feed
  -Returns the list of latest news in the NBA
  -Payload:
    -page
    
