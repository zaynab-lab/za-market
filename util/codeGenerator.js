export function codeGenerator() {
  const alphabet = [
    ..."0123456789@#%tuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrs"
  ];
  const code = new Array(5)
    .fill()
    .map(() => alphabet[Math.floor(Math.random() * 65)])
    .reduce((a, b) => {
      return a + b;
    });
  return code;
}
