const storeToken = (token: string) => {
  try {
    localStorage.setItem("token", token);
  } catch (error) {
    console.log(error);
  }
};

const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.log(error);
  }
};

const removeToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};

export default { storeToken, getToken, removeToken };
