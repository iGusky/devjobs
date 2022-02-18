const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL)

mongoose.connection.on('error', (error) => {
  console.error(error)
})

// Importar modelos
require('../models/Vacante');