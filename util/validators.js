const {errors} = require('../services/ErrorService');

function email(email){
  if(!email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)){
    throw {error: errors.invalidData.email};
  }
}

function password(pw) {
  if(!pw.match(/^(?=.*[a-z])(?=.*[0-9])\S{8,30}$/i)){ // por lo menos 8 caracteres, 1 letra y 1 numero obligatorios
    throw {error: errors.invalidData.password};
  }
}

function phoneNumber(number){
  if(!number.match(/^\(\+[1-9]{1,4}\)\d{4,16}$/)){
    throw {error: errors.invalidData.phoneNumber}
  }
}



module.exports = {email, password, phoneNumber};
