require('dotenv').config()
const axios = require('axios')
const fs = require('fs')

/*
TODO
[] add error handeling 
[] export getRepoPRData
*/

const repoPRData = {}

const getRepos = async () => {
    await axios.get('https://api.github.com/orgs/ramda/repos', {
        headers: {
            'Authorization': process.env.API_KEY,
            'User-Agent': 'postman-request'
        }
    }).then((responses) => {
        responses.data.forEach(response => {
            let repoName = response["full_name"]
            repoPRData[repoName] = {}
        })
    })
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

                repoPRData[repo][number] = {
                    'url': url,
                    'state': state
                }
            })
        }
    })
    return Promise.all(repoData.map(data => data))
}

const saveData = (data) => {
    JSONData = JSON.stringify(data)
    fs.writeFileSync('prData.json', JSONData)
}

const getRepoPRData = async () => {
    console.log('calling')
    getRepos()
    .then(() => getPrData())
    .then(() => saveData(repoPRData))
}

getRepoPRData()