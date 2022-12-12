const setTimeFunc = (fn = () => {}, delay) => {
  if (!timer.value) {
    timer.value = setInterval(() => {
      fn();
    }, delay);
  }
  return {
    clear: () => {
      if (timer.value) {
        clearInterval(timer.value);
      }
    },
  };
};
