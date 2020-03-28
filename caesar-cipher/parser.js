const { program } = require('commander');

program
  .requiredOption('-s, --shift <number>', 'a shift', parseInt)
  .option('-i, --input <string>', 'an input file')
  .option('-o, --output <string>', 'an output file')
  .requiredOption('-c, --codingType <string>', 'an action encode/decode');

function parser(args) {
  program.parse(args);

  if (isNaN(program.shift)) {
    process.stderr.write('error: shift expected integer value');
    process.exit(911); // eslint-disable-line no-process-exit
  }

  if (['encode', 'decode'].indexOf(program.codingType) === -1) {
    process.stderr.write("error: codingType expected 'encode', 'decode' value");
    process.exit(912); // eslint-disable-line no-process-exit
  }

  return program.opts();
}

module.exports = {
  parser
};
