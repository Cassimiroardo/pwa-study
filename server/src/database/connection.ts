import Knex from 'knex'

const knexfile = require('../../knexfile.ts')

const connection = Knex(knexfile)

export default connection