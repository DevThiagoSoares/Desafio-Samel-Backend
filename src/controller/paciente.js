require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.URL_DATABASE
})
module.exports = {

    //Paciente

    async allPatiente(request, response) {
        try {
            const { rows } = await pool.query('select * from patient')
            return response.status(200).send(rows)
        } catch (error) {
            return response.status(400).send(error)
        }
    },

    async createPatiente(request, response) {
        const { name, fone, healthPlan } = request.body

        try {
            const patient = await pool.query('insert into patient (name, fone, health_plan) VALUES ($1, $2, $3) returning *', [name, fone, healthPlan])
            return response.status(200).send(patient.rows)
        } catch (error) {
            return response.status(400).send(error)
        }
    },

    async updatePatient(request, response) {
        const { idPat } = request.params
        const { name, fone, healthPlan } = request.body

        try {
            const patient = await pool.query('update patient set name = ($1), fone = ($2), health_plan = ($3) where id = ($4) returning *', [name, fone, healthPlan, idPat])
            return response.status(200).send(patient.rows)
        } catch (error) {
            return response.status(400).send(error)
        }

    },

    async deletePatient(request, response) {
        const { idPat } = request.params

        try {
            const patient = await pool.query('delete from patient where id = ($1) returning *', [idPat])
            return response.status(200).send({
                mensage: 'Paciente deletado',
                deletePaciente: patient.rows
            })
        } catch (error) {
            return response.status(400).send(error)
        }
    }

}