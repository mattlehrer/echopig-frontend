export const addMsg = (type, message, messages) => {
  if (messages) {
    messages = [...messages, { type, message }];
  } else {
    messages = [{ type, message }];
  }
  return messages;
};
