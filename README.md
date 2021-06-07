# Redox Take Home Assignment 💊

Hello! 
Thank you for taking the time to review my code. 

As of 6/7/21 @ 6:46pm, this project retrieves 156 open and closed PRs from the Ramda org on Github.

The up to date value is also printed to the console when app is ran.

## To run the application 🏃🏾‍♀️ 
- Run `npm install` to install npm modules used in this project 
- Place your Github API key in `./utils/.env_sample`
- Rename `.env_sample` to `.env`
- Run `npm run start` inside of `./utils` 

## Dependencies 🛠
In this project, I'm using:
-  [axios](https://www.npmjs.com/package/axios) to make HTTP GET requests
-  [dotenv](https://www.npmjs.com/package/dotenv) to set an enviornment variable for the Github API key
-  [pretty-format](https://www.npmjs.com/package/pretty-format) as a dev dependency to make the console output a little bit prettier

## What's going on here? 👀
In `./utils/app.js` there are four functions. 

`getRepos()` 

Stores `full_name` metadata from Github response for each repo in the Ramda org in the `repoPRData` object as an obect key.
```
// example: ramda/ramdangular

repoPRData = {
    "ramda/ramdangular": {}
}
```

`getPrData()`

Uses the `full_name` metadata stored in `repoPRData` to make HTTP GET requests for all PRs (opened and closed) in each repo in the Ramda org. By default, the last 30 PRs are included in page 1's reponse.

It then stores the PRs number, url, state, date merged at, and date created at inside its repo object in `repoPRData`.
```
// example: /ramda/repl/

repoPRData = {
    "/ramda/repl/": {
        "69": {
            "createdAt": "2020-09-29T14:41:45Z",
            "mergedAt": "2020-09-29T14:49:12Z",
            "state": "closed",
            "url": "https://api.github.com/repos/ramda/repl/pulls/69",
        }
    }
}

```

`countPRsRetrieved()`

Returns the number of PRs retrieved


`getRepoPRData()`

Calls `getRepos()`, `getPrData()`, and `countPRsRetrieved()`. Then logs the formatted `repoPRData` object.