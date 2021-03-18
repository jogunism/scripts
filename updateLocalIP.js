'use strict'

const cron = require('node-cron')
const publicIp = require('public-ip')
const axios = require('axios')
const qs = require('qs')

const domain = 'https://console.shipon.de'  // promotion
//const domain = 'http://192.168.178.191:8080'  // dev


let retrievePublicIp = () => {
    return new Promise((resolve, reject) => {
                publicIp.v4()
                    .then((ip) => resolve({ip: ip}))
                    .catch((err) => {
                        console.error('Error during retrive public IP : ' + err.message)
                    })
            })
}


let retrieveToken = (o) => {
    return new Promise((resolve, reject) => {
                axios.get(domain + '/api/common/update/publicip/token')
                    .then((response) => {
                        o.token = response.data
                        resolve(o)
                    })
                    .catch(err => {
                        console.error('Error during retrieve Token : ' + err.message)
                    })
                })
}

let updatePublicIp = (o) => {
    return new Promise((resolve, reject) => {
            axios.post(domain + '/api/common/update/publicip', qs.stringify({ip: o.ip}, {arrayFormat: 'brackets'}),{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': o.token
                    }
                })
                .then(response => resolve())
                .catch(err => {
                    console.error('Error during update public ip : ' + err.message)
                })
            })
}

/**
 * Update public IP
 */
cron.schedule('*/30 * * * 1-5', () => {
    retrievePublicIp()
        .then(retrieveToken)
        .then(updatePublicIp)
        .then(() => {
            console.log('Successed the public Ip update!!')
        })
})
