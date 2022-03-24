
const errors = {
  NotAuthorizedError: 'NotAuthorizedError',
  invalidData: {
    email: 'Email invalido',
    password: 'Contraseña invalida',
    phoneNumber: 'Teléfono inválido'
  }
}

function processErrorManager(code, reason){
  return (error, request, reply) => {
    console.log(error);
  }
}





module.exports = {
  errors,
  processErrorManager

}
