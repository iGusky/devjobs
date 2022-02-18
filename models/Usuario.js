const { Schema, model } = require('mongoose');
const slug = require('slug');
const shortId = require('shortid');
const bcrypt = require('bcrypt');

const UsuarioSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  token: String,
  expira: Date
});

// Metodo para hashear password
UsuarioSchema.pre('save', async function(next) {
  if(!this.isModified('password')) { 
    return next();
  }
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});
// Alerta de correo ya registrado
UsuarioSchema.post('save', function(error, doc, next) {
  console.log(error)
  if(error.code === 11000) {
    next('Ese correo ya esta registrado');
  } else {
    next(error);
  }
})

// Autenticar usuario
UsuarioSchema.methods = {
  compararPassword: function(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = model('Usuario', UsuarioSchema)