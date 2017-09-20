export const alertActions = {
    success,
    error,
    clear
};

function success(error) {
  return { type: 'SUCCESS', message: error.message };
}

function error(error) {
  return { type: 'ERROR', message: error.message };
}

function clear() {
  return { type: 'CLEAR' };
}
