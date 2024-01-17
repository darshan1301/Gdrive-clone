import base_url from "../base_url";

////////// USER LOGIN
export const loginHandler = async (email, password) => {
  try {
    const response = await fetch(`${base_url}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response;
  } catch (error) {
    window.alert("Error during user registration. Please try again later.");
  }
};

/////////USER SIGNUP
export const signupHandler = async (formData) => {
  try {
    const response = await fetch(`${base_url}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return response;
  } catch (error) {
    window.alert("Error during user registration. Please try again later.");
  }
};

//////////USER LOGOUT
export const logoutHandler = async () => {};
