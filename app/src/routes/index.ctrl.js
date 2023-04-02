const Auth = require("../models/auth.service");

const process = {
  register: async (req, res) => {
    const auth = new Auth();
    const result = await auth.register(req.body);
    return res.sendStatus(result ? 200 : 400);
  },

  login: async (req, res) => {
    const auth = new Auth();
    const result = await auth.login(req.body);
    return result ? res.json(result) : res.sendStatus(404);
  },
};

module.exports = process;
