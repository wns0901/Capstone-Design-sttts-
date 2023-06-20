const Repository = require('./auth.reposiory');

class Auth {
  async register(clientInfo) {
    const { id, password } = clientInfo;
    return await Repository.register(id, password);
  }

  async login(clientInfo) {
    try {
      const userInfo = await Repository.login(clientInfo.id);
      const isOurUser =
        userInfo.id === clientInfo.id &&
        userInfo.password === clientInfo.password;
      if (!isOurUser) {
        return false;
      }
      return userInfo.userNo;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Auth;
