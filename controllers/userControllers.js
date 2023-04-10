const User = require("../models/users")
const sequelize = require("../util/database")

 async function getUserAppointment(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
      console.log("hello")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

 async function addUserAppointment(req, res) {
    try {
    console.log(req.body);
      const { name, email, phone, date, time } = req.body;
      const user = await User.create({ name, email, phone, date, time });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user.' });
    }
  }

   async function   deleteUserAppointment(req, res) {
    try {
      const appointment = await User.findByPk(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      await appointment.destroy();
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  module.exports = {
    getUserAppointment,
    addUserAppointment,
    deleteUserAppointment
  };