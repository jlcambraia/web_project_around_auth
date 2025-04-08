export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return !res.ok ? Promise.reject(`Error: ${res.status}`) : res.json();
  });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return !res.ok ? Promise.reject(`Error: ${res.status}`) : res.json();
  });
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return !res.ok ? Promise.reject(`Error: ${res.status}`) : res.json();
  });
};
