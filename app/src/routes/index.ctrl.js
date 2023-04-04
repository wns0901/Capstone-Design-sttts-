const Auth = require("../models/auth.service");
const GetData = require("../models/web");

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

  getData: async (req, res) => {
    const getData = new GetData();
    const result = await getData.parsing(req.body.search);

    return res.json(result);
  },
};

module.exports = process;
