class Api {
  constructor({ baseUrl, token, makeRequest }) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._makeRequest = makeRequest;
  }

  _handleServerResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(
          `Erro ao carregar informações do usuário: ${res.status}`
        );
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._handleServerResponse);
  }

  getCardsInfo() {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._handleServerResponse);
  }

  setUserInfo(inputNameValue, inputAboutValue) {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputNameValue,
        about: inputAboutValue,
      }),
    }).then(this._handleServerResponse);
  }

  addNewCard(inputTitleValue, inputLinkValue) {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputTitleValue,
        link: inputLinkValue,
      }),
    }).then(this._handleServerResponse);
  }

  updateLikeState(cardId, isLiked) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._handleServerResponse);
  }

  deleteCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._handleServerResponse);
  }

  changeProfileImage(data) {
    return this._makeRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleServerResponse);
  }
}

// Configuração para API
const apiConfig = {
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  token: "a97c4c63-ce40-4267-993b-56ebee3b0bfe",
  makeRequest: (...args) => fetch(...args),
};

// Instância para o Api
export const api = new Api(apiConfig);
