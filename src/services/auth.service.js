export const authService = {
    isAuth
};

function isAuth() {
  return localStorage.getItem('firebase:authUser:YOUR-API-KEY:[DEFAULT]') ? true : false;
}
