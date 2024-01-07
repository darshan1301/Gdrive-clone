////////// USER LOGIN
export const loginHandler = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/user/login", {
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
    const response = await fetch("http://localhost:8000/user/signup", {
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
