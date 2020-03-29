const { parser } = require('./parser');
const { createPipeLine } = require('./pipeline');

const parsedArguments = parser(process.argv);

createPipeLine(parsedArguments);

// node caesar-cipher/index
// node caesar-cipher/index -c encode -s 1
// node caesar-cipher/index -c encode -s 1 -i ./caesar-cipher/input.txt
// node caesar-cipher/index -c encode -s 1 -o ./caesar-cipher/output.txt
// node caesar-cipher/index -c encode -s 1 -i ./caesar-cipher/input.txt -o ./caesar-cipher/output.txt
// node caesar-cipher/index -c decode -s 1 -i ./caesar-cipher/output.txt -o ./caesar-cipher/input.txt
