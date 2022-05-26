const AuthStorageService = {
  getUserFromStorage: function () {
    return JSON.parse(localStorage.getItem("user"));
  },

  setUserInStorage: function (user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUserFromStorage: function () {
    localStorage.removeItem("user");
  },

  getAccessTokenFromStorage: function () {
    const user = this.getUserFromStorage();
    return user?.access_token;
  },

  getRefreshTokenFromStorage: function () {
    const user = this.getUserFromStorage();
    return user?.refresh_token;
  },

  updateTokensInStorage: function ({ access, refresh }) {
    const user = this.getUserFromStorage();
    if (access) user.access_token = access;
    if (refresh) user.refresh_token = refresh;
    this.setUserInStorage(user);
    return user;
  },
};

export default AuthStorageService;
