const { coding } = require('./coding');
const fs = require('fs');
const { pipeline, Transform } = require('stream');
const { onError } = require('./messages');
//

function readStream(input) {
  // if marked -i
  if (input) {
    // if doesnt exist
    if (!fs.existsSync(input)) {
      onError('file doesnt exist\n', 913); // close programm with error
    }

    try {
      fs.accessSync(input, fs.constants.R_OK); // if exist and  readable
      return fs.createReadStream(input);
    } catch (err) {
      process.exit(913);
    }
  }

  return process.stdin; // if doesnt mark -i at all then return stdin
}

function writeStream(output) {
  if (output) {
    if (!fs.existsSync(output)) {
      onError('file doesnt exist\n', 913);
    }

    try {
      fs.accessSync(output, fs.constants.R_OK | fs.constants.W_OK);
      return fs.createWriteStream(output, { flags: 'a' });
    } catch (err) {
      process.exit(913);
    }
  }

  return process.stdout;
}

function customStream(args) {
  return new Transform({
    transform(chunk, encoding, callback) {
      let data = chunk.toString();

      data = coding(data, args);

      callback(null, data);
    }
  });
}

function createPipeLine(args) {
  pipeline(
    readStream(args.input),
    customStream(args),
    writeStream(args.output),
    error => {
      if (error) console.log(error);
      else console.log('success');
    }
  );
}

module.exports = {
  createPipeLine
};
