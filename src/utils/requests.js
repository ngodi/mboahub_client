/* eslint-disable no-console */
/* eslint-disable no-return-await */
export async function postRequestWithToken(data, url) {
  const headers = {
    'Content-Type': 'application/json',
    credentials: 'include',
    timeoutDuration: 3000,
  };
  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  };

  const res = fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  return await res;
}

// To be refactored to a single method and pass the request type: post, put, get
export async function putRequestWithToken(data, url) {
  const headers = {
    'Content-Type': 'application/json',
    credentials: 'include',
    timeoutDuration: 3000,
  };
  const requestOptions = {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  };

  const res = fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  return await res;
}

export async function postRequest(data, url) {
  const headers = { 'Content-Type': 'application/json', timeoutDuration: 3000 };

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  };

  const res = fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  return await res;
}

export async function getRequestWithToken(url) {
  const headers = {
    'Content-Type': 'application/json',
    credentials: 'include',
    timeoutDuration: 3000,
  };

  const res = fetch(url, { headers })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  return await res;
}

export async function getRequest(url) {
  const headers = { 'Content-Type': 'application/json', timeoutDuration: 3000 };
  const res = fetch(url, { headers })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  return await res;
}

export async function deleteRequestWithToken(data, url) {
  const headers = {
    'Content-Type': 'application/json',
    credentials: 'include',
    timeoutDuration: 3000,
  };
  const requestOptions = {
    method: 'DELETE',
    headers,
    body: JSON.stringify(data),
  };

  const res = fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  return await res;
}
