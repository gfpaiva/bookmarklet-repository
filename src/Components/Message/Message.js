import React from 'react';

const Message = ({ message, type }) => <p className={`message message--${type}`}>{message}</p>;

export default Message;