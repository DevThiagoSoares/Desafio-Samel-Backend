require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.URL_DATABASE
})
module.exports = {

    //Medicos
    async allDoctors(request, response) {
        try {
            const { rows } = await pool.query('select * from doctors')
            return response.status(200).send(rows)
        } catch (error) {
            return response.status(400).send(error)
        }
    },

    async registerDoctors(request, response) {
        const { name, especializacao, crm } = request.body
        try {
            const medicos = await pool.query('insert into doctors (name, especializacao, crm) VALUES ($1, $2, $3) returning *', [name, especializacao, crm])
            return response.status(200).send(medicos.rows)
        } catch (error) {
            return response.status(400).send(error)
        }
    },

    async updateDoctor(request, response) {
        const { idMed } = request.params
        const { name, especializacao, crm } = request.body

        try {
            const medicos = await pool.query('update doctors set name = ($1), especializacao = ($2), crm = ($3) where id = ($4) returning *', [name, especializacao, crm, idMed])
            return response.status(200).send(medicos.rows)
        } catch (error) {
            return response.status(400).send(error)
        }

    },
    async deleteDoctor(request, response) {
        const { idMed } = request.params

        try {
            const medico = await pool.query('delete from doctors where id = ($1) returning *', [idMed])
            return response.status(200).send({
                mensage: 'Medico deletado',
                deleteMedico: medico.rows
            })
        } catch (error) {
            return response.status(400).send(error)
        }

    }
}
