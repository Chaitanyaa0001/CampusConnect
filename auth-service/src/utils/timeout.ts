export const timeoutPromise = (ms: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new Error("Operation timed out")
      );

    }, ms);

  });

};