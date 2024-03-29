const BLACKLIST = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
];

const STRICT_STRIP_REGEX = /[.-]/g;
const LOOSE_STRIP_REGEX = /[^\d]/g;

const verifierDigit = (digits) => {
    const numbers = digits
        .split('')
        .map(number => {
            return parseInt(number, 10)
        });

    const modulus = numbers.length + 1;
    const multiplied = numbers.map((number, index) => number * (modulus - index));
    const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;

    return (mod < 2 ? 0 : 11 - mod)
};

const strip = (number, strict = false) => {
    const regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (number || '').replace(regex, '')
};

const format = (number) => {
    return strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
};

const isValid = (number, strict = false) => {
    const stripped = strip(number, strict);

    // CPF must be defined
    if (!stripped) {
        return false
    }

    if (stripped.length !== 11) {
        return false
    }

    if (BLACKLIST.includes(stripped)) {
        return false
    }

    let numbers = stripped.substr(0, 9);
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2)
};

const generate = (formatted = false) => {
    let numbers = '';

    for (let i = 0; i < 9; i += 1) {
        numbers += Math.floor(Math.random() * 9)
    }

    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return (formatted ? format(numbers) : numbers)
};


module.exports = {
    verifierDigit,
    strip,
    format,
    isValid,
    generate,
};
