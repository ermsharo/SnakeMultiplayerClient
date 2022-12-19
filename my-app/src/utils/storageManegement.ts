export const getIsLogged = () => {
  return localStorage.getItem("logged");
};

export const setIsLogged = () => {
  localStorage.setItem("logged", "true");
};

export const getUserInfo = () => {
  return {
    id: localStorage.getItem("user_id"),
    user: localStorage.getItem("user_name"),
  };
};

export const setUserInfo = (id: string, user: string, token: string) => {
  localStorage.setItem("user_id", id);
  localStorage.setItem("user_name", user);
  localStorage.setItem("user_session_token", token);
  localStorage.setItem("is_logged", "true");
};

export const logout = () => {
  localStorage.clear();
};
