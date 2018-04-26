import configAPI from "./configAPI";

const usersAPI = {
  getDriver: () => {
    return fetch(`${configAPI.serverRoute}/drivers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .catch(error => {
        return Promise.reject(new Error("Server unavailable"));
      });
  }
};

export default usersAPI;
