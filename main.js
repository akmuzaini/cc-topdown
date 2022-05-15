/**
 * a -> x
 * b -> y
 * c -> z
 */
var charmap = { 'a': 'x', 'b': 'y', 'c': 'z', '$': '$' }

// valid inputs
parse("aabcc$")
// parse('bbbb$')


// invalid inputs
// parse('aac$')

//prints the output of the parser
function parse(input) {
    let fout = parseTprime(input)
    console.log(fout);
}

function parseTprime(input) {
    let next = input[0]
    var output = ''
    console.log(`Parsing for T' input: ${input} , next: ${next}`);
    if (next == 'a' ||
        next == 'b' ||
        next == '$') {
        console.log(`T' => T`);
        var p = parseT(input, output)
        input = p['input']
        output = p['output']

        var m = match('$', input, output)
        input = m['input']
        output = m['output']
    } else {
        reportError()
    }
    return {
        'input': input,
        'output': output
    }
}

function parseT(input, output) {
    let next = input[0]
    console.log(`Parsing for T input: ${input} , next: ${next}`);
    if (next == 'b'||
        next == 'c'||
        next == '$') {
        return parseR(input,output)
    } else if (next == 'a') {
        console.log(`T => aTc`);
        var m = match('a', input, output)
        input = m['input']
        output = m['output']

        var p = parseT(input, output)
        input = p['input']
        output = p['output']

        m = match('c', input, output)
        input = m['input']
        output = m['output']
        return {
            'input': input,
            'output': output
        }
    } else {
        reportError();
    }
}

function parseR(input, output) {
    let next = input[0]
    console.log(`Parsing for R input: ${input} , next: ${next}`);
    if (next == 'c' ||
        next == '$') {
        console.log(`R => ε`);
        console.log('do nothing');
        return {
            'input': input,
            'output': output
        }
    } else if (next == 'b') {
        console.log(`R => bR`);
        var m = match('b', input, output)
        input = m['input']
        output = m['output']
        return parseT(input, output)
    } else {
        reportError()
    }
}

function match(symbol, input, output) {
    console.log(`trying to match ${symbol} to input ${input}`);
    if (input[0] == symbol) {
        input = input.substring(1)
        output += charmap[symbol]
        console.log(`matched ${symbol} , output: ${output}`);
        return {
            'input': input,
            'output': output
        }
    } else {
        reportError()
    }
}

function reportError() {
    console.log(`Error! can't parse input`);
}