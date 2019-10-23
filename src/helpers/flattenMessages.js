const flattenMessages = (nestedMessages, prefix = '') =>
  Object.keys(nestedMessages).reduce((msgs, key) => {
    const messages = msgs;
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (
      key === 'schema' ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      Array.isArray(value)
    ) {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});

module.exports = flattenMessages;
