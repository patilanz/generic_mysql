const validators = require('../util/validators');
const sec = require('../util/sec');
const {mysql} = require('../db/index');


module.exports = instance => {
  instance.post('/login', {
    schema: {
      tags: ['auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {type: 'string'},
          password: {type: 'string'},
        }
      }
    }
  }, async (request, reply) => {
    const {email, password} = request.body;

    validators.email(email);
    validators.password(password);


    const [rows] = await mysql.query('SELECT * FROM user WHERE email = ?', [email]);
    let user = rows[0];
    if(!user || !(await sec.checkHash(password, user.hash)))return {error: 'Email o contraseña incorrectos'};


    const token = await reply.jwtSign({
      email: user.email,
      type: 'client', // client or driver
      id: user._id
    });

    return {id: user._id, token};


    /*    reply.setCookie('token', token, {
          path: '/',
          secure: false,
          httpOnly: false,
          sameSite: false
        }).code(200).send({success: true});*/
  });

  instance.post('/register',{
    schema: {
      tags: ['auth'],
      body: {
        type: 'object',
        required: ['email', 'name', 'password', 'phone'],
        properties: {
          email: {type: 'string'},
          name: {type: 'string', minLength: 2},
          surname: {type: 'string', minLength: 2},
          password: {type: 'string'},
          phone: {type: 'string'},
        }
      }
    }
  } ,async (request, reply) => {
    const {email, surname, name, password, phone} = request.body;

    validators.email(email);
    validators.password(password);
    validators.phoneNumber(phone);

    //const exists = await db.collection('user').countDocuments({email});
    const [exists_rows, exists_fields] = await mysql.query('SELECT COUNT(*) AS `exists` FROM `user` WHERE email = ?', [email]);

    if(exists_rows[0].exists)return {error: 'El email ya esta registrado'};


    const hash = await sec.hashPassword({pw: password});

    const [rows, fields] = await mysql.query('INSERT INTO `user` (name, surname, email, phone, hash) VALUES(?, ?, ?, ?, ?)', [name, surname, email, phone, hash]);

    console.log(rows);
    console.log(fields);


    return {success: true};
    //reply.send({sucess: true});
  });
}
