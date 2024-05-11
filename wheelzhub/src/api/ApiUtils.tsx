// Defining the generic fetch function
async function fetchJson<T, U = T>(url: string, method: string = 'GET', body?: U, headers: HeadersInit = { 'Content-Type': 'application/json' }): Promise<T> {
  const config: RequestInit = {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null
  };

  // For methods GET and HEAD, the body should not be used.
  if (method === 'GET' || method === 'HEAD') {
    delete config.body;
  }

  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  if (response.headers.get("Content-Type")?.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return null as unknown as Promise<T>;
}

export const fetchData = <T,>(url: string): Promise<T> => {
  return fetchJson<T>(url);
};

export const postData = <T, U = T>(url: string, data: U): Promise<T> => {
  return fetchJson<T, U>(url, 'POST', data);
};

export const putData = <T, U = T>(url: string, data: U): Promise<T> => {
  return fetchJson<T, U>(url, 'PUT', data);
};

export const deleteData = (url: string): Promise<void> => {
  return fetchJson<void>(url, 'DELETE');
};

export const patchData = <T, U = T>(url: string, data: U): Promise<T> => {
  return fetchJson<T, U>(url, 'PATCH', data);
};
