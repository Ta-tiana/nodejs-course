const { pipeline, Transform } = require('stream');
const fs = require('fs');

const { coding } = require('./coding');
const { parser } = require('./parser');

const parsedArguments = parser(process.argv);
console.log(parsedArguments);

function customStream() {
  return new Transform({
    transform(chunk, encoding, callback) {
      let data = chunk.toString();

      data = coding(data, parsedArguments);

      callback(null, data);
    }
  });
}

pipeline(
  fs.createReadStream(parsedArguments.input),
  customStream(),
  fs.createWriteStream(parsedArguments.output, { flags: 'a' }),
  error => {
    if (error) console.log(error);
    else console.log('success');
  }
);
