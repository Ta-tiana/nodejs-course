function onExit(number) {
  process.stderr.write(`exit with code ${number}`);
}

function onError(string, number) {
  process.stderr.write(string);
  process.exit(number);
}

process.addListener('exit', onExit);

module.exports = {
  onError
};
