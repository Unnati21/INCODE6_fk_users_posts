// LOADING AND INITIALISE THE LIBRARY
const pgp = require('pg-promise')()

// CONNECTION STRING
const cn = 'postgres://postgres:123456@localhost:5432/foreign_key_test'

const db = pgp(cn)

module.exports = db