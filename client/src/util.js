const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage");
    return null;
  }
};

export { getCurrentUser };