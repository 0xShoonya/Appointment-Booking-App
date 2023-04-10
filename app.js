const express = require("express");
const cors = require("cors")
const {
    getUserAppointment,
    addUserAppointment,
    deleteUserAppointment
  } = require("./controllers/userControllers")

const app = express();

app.use(express.json());
app.use(cors());

const User = require("./models/users")
const sequelize = require("./models/users")

app.get('/users', getUserAppointment);
  
app.post('/user', addUserAppointment);

app.delete('/users/:id', deleteUserAppointment);
  
  
sequelize.sync()
.then(() => {
    app.listen(3300, () => {
        console.log("Server is running on port 3300");
    })
})
.catch(err => console.log(err))


