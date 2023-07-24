class BusinessError extends Error {
    constructor(message,stack = '') {
      super(message);
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  module.exports = BusinessError;