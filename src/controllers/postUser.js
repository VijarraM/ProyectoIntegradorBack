const { User } = require('../../DB_connection');
const { isValidEmail, isValidPassword } = require('../utils/validations');

async function postUser(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) throw Error('Faltan datos');
    if (!isValidEmail(email)) {
      throw Error('El correo o la contraseña no cumplen con los requisitos');
    } else {
      const [user, created] = await User.findOrCreate({
        where: { email: email.toLowerCase() },
        defaults: { password: password, name: name },
      });
      if (created) res.status(200).json(user);
      else throw Error('usuario ya registrado con este correo');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}

module.exports = postUser;
