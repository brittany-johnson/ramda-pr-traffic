require('dotenv').config()
const axios = require('axios')
const {format: prettyFormat} = require('pretty-format')

const repoPRData = {}

const getRepos = async () => {
    await axios.get('https://api.github.com/orgs/ramda/repos', {
        headers: {
            'Authorization': process.env.API_KEY,
            'User-Agent': 'postman-request'
        }
    })
    .then((responses) => {
        responses.data.forEach(response => {
            let repoName = response["full_name"]
            repoPRData[repoName] = {}
        })
    })
    .catch((error) => console.log(`Something went wrong:${error}`))
}

const getPrData = () => {
    const repoData = Object.keys(repoPRData).map(async repo => {
        const responses = await axios.get(`https://api.github.com/repos/${repo}/pulls?state=all`, {
            headers: {
                'Authorization': process.env.API_KEY,
                'User-Agent': 'postman-request',
            }
        })
        if (responses.data.length) {
            responses.data.forEach(response => {
                let number = response["number"]
                let url = response["url"]
                let state = response["state"]
                let mergedAt = response["merged_at"]
                let createdAt = response["created_at"]

                repoPRData[repo][number] = {
                    url,
                    state,
                    mergedAt,
                    createdAt,
                }
            })
        }
    })
    return Promise.all(repoData.map(data => data))
}

const countPRsRetrieved = (repos) => {
    let count = 0
    Object.values(repos).forEach((repo) => {
        count += Object.values(repo).length
    })
    return count
}

const getRepoPRData = () => {
    console.log('Calling Github...📞')
    getRepos()
    .then(() => getPrData())
    .then(() => console.log(prettyFormat(repoPRData)))
    .then(() => console.log(`${countPRsRetrieved(Object.values(repoPRData))} PRs have been retrieved 🎣`))
    .catch((error) => console.log(`Something went wrong:${error}`))
}

getRepoPRData()