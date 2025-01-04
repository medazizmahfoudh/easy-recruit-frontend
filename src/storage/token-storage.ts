const storeToken = (key: string, token: string) => {
  try {
    localStorage.setItem(key, token);
  } catch (e) {
    console.error("error storing the token", e);
  }
};

const getToken = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error("error getting the token", e);
  }
};

const removeToken = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("error removing the token", e);
  }
};

export { storeToken, getToken, removeToken };
