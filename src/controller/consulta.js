require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.URL_DATABASE
})
module.exports = {

    async creteAppointment(request, response) {
        const { informacoes, idMed, idPat } = request.body

        try {
            const consulta = await pool.query('insert into appointment (informacoes, id_med, id_pat) VALUES ($1, $2, $3) returning *', [informacoes, idMed, idPat])
            return response.status(200).send(consulta.rows)
        } catch (error) {
            return response.status(400).send(error)
        }
    },
    async appointamentForMed(request, response) {
        const { idMed } = request.params
        try {
            const { rows } = await pool.query('select a.id as id_consulta, p.id as id_Paciente, p.name as Paciente, Informacoes, d.name as Medico, d.crm, a.date as Data from appointment a join doctors d on d.id = a.id_med join patient p on p.id = a.id_pat where a.id_med = ($1)', [idMed])
            return response.status(200).send(rows)
        } catch (error) {
            return response.status(400).send(error)
        }
    },
    async appointementAll(request, response) {
        try {
            const { rows } = await pool.query('select a.id, p.name as Paciente, Informacoes, d.name as Medico, d.crm, a.date as Data from appointment a join doctors d on d.id = a.id_med join patient p on p.id = a.id_pat ')
            return response.status(200).send(rows)
        } catch (error) {
            return response.status(400).send(error)
        }
    },
    async updateAppointament(request, response) {
        const { idMed, idApp } = request.params
        const data = request.body

        try {
            const belongToApp = await pool.query('select * from appointment a where a.id_med = ($1) and a.id = ($2)', [idMed, idApp])
            if (!belongToApp.rows[0]) {
                return response.status(400).send('Operation not allowed')
            }
            const medicos = await pool.query('update appointment set informacoes = ($1) where id = ($2) returning *', [data.informacoes, idApp])
            return response.status(200).send(medicos.rows)
        } catch (error) {
            return response.status(400).send(error)
        }

    },
    async deleteAppointment(request, response) {
        const { idApp } = request.params

        try {
            const appointment = await pool.query('delete from appointment where id = ($1) returning *', [idApp])
            return response.status(200).send({
                mensage: 'Consulta deletada deletado',
                deleteMedico: appointment.rows
            })
        } catch (error) {
            return response.status(400).send(error)
        }
    }
}