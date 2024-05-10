const { User } = require('../../DB_connection');
const bcrypt = require('bcryptjs');

async function login(req, res) {
  try {
    const { email, password } = req.query;
    if (!email || !password) res.status(400).json({ message: 'Faltan datos', access: false });
    else {
      const findUser = await User.findOne({ where: { email: email } });
      if (!findUser) res.status(404).json({ message: 'Usuario no encontrado', access: false });
      else {
        const passwordCompared = await bcrypt.compare(password, findUser.password);
        if (passwordCompared) {
          res.json({
            access: true,
            user: findUser.id,
          });
        } else
          res.status(403).json({
            message: 'Contraseña incorrecta',
            access: false,
          });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = login;
