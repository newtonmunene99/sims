const baseUrl = "http://localhost:3000";
export class AuthProvider {
  constructor() {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })
        .then(response => response.json())
        .then(data => {
          try {
            localStorage.setItem("sims-token", data.token);
            localStorage.setItem("sims-user", JSON.stringify(data.user));
            resolve(data);
          } catch (error) {
            reject(error);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  register(email: string, firstName: string, lastName: string, role: number) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          role
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updatePassword(oldPassword: string, newPassword: string) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/auth/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          oldPassword,
          newPassword
        })
      })
        .then(response => response.json())
        .then(data => {
          try {
            localStorage.setItem("sims-token", data.token);
            localStorage.setItem("sims-user", JSON.stringify(data.user));
            resolve(data);
          } catch (error) {
            reject(error);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
