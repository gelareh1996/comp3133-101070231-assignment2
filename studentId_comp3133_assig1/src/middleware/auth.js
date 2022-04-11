module.exports = {
  isAdmin: (userLoggedIn, data) => {
    if (userLoggedIn) {
      if (userLoggedIn.type == "admin") {
        return data;
      } else {
        throw new Error("You must login as admin!");
      }
    }
    throw new Error("You are not authenticated!");
  },
  isUser: (userLoggedIn, data) => {
    if (userLoggedIn) {
      if (userLoggedIn.type == "customer") {
        return data;
      } else {
        throw new Error("You must login as customer!");
      }
    }
    throw new Error("You are not authenticated!");
  },
};
