const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

export async function login(username, password) {
  let endpoint = BASE_URL + '/login';

  await axios
    .post('http://localhost:5000/login', {
      username: username,
      password: password,
    })
    .then(function (response) {
      console.log(response);
      localStorage.setItem('token-myapp', response.data);
      window.location.href = '/';
    })
    .catch(function (error) {
      console.log(error.response.status);

      switch (error.response.status) {
        case 401:
        case 400:
            return Promise.reject('Unauthorized');
        default:
            return Promise.reject('Authentication failed');
      }
    });
}

export function getContacts() {
    let endpoint = BASE_URL + '/contact';

    return axios.get(endpoint).then(res => res.data);
}

export function getContact(id) {
    let endpoint = BASE_URL + '/contact/' + id;

    return axios.get(endpoint).then(res => res.data);
}

export function addContact(contact) {
    let endpoint = BASE_URL + '/contact';

    return axios.post(endpoint, contact).then(res => res.data)
}
