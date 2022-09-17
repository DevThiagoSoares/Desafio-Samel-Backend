const { Router } = require('express')
const controllerMed = require('../controller/medico')
const controllerPat = require('../controller/paciente')
const controllerApp = require('../controller/consulta')
const router = Router()


// Medicos
router.get('/doctors', controllerMed.allDoctors)
router.post('/doctor', controllerMed.registerDoctors)
router.patch('/doctorUpdate/:idMed', controllerMed.updateDoctor)
router.delete('/doctorDelete/:idMed', controllerMed.deleteDoctor)

// Pacientes
router.get('/patients', controllerPat.allPatiente)
router.post('/patient', controllerPat.createPatiente)
router.patch('/patientUpdate/:idPat', controllerPat.updatePatient)
router.delete('/patientDelete/:idPat', controllerPat.deletePatient)


// Consultas
router.post('/appointment', controllerApp.creteAppointment)
router.get('/appointment/:idMed', controllerApp.appointamentForMed)
router.get('/appointmentAll', controllerApp.appointementAll)
router.patch('/appointmentUpdate/:idMed/:idApp', controllerApp.updateAppointament)
router.delete('/appointmentDelete/:idApp', controllerApp.deleteAppointment)


module.exports = router

