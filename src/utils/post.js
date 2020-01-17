export function parseErrors(errors) {
  try {
    const { graphQLErrors, networkError } = errors;
    let messages = [];
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        messages.push(message);
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      });
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      messages.push(networkError);
    }
    return messages;
  } catch (err) {
    return [];
  }
}

export function post(endpoint, data) {
  return fetch(endpoint, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(r => r.json())
    .catch(error => {
      console.error('Error:', error);
      return error;
    });
}
