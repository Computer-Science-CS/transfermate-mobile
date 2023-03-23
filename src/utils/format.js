// const defaultOptions = {
//     significantDigits: 2,
//     thousandsSeparator: '.',
//     decimalSeparator: ',',
//     symbol: 'R$',
// };

// export const currencyFormatter = (value, options = defaultOptions) => {
//     if (typeof value !== 'number') value = 0.0;
//     options = { ...defaultOptions, ...options };
//     value = value.toFixed(options.significantDigits);

//     const [currency, decimal] = value.split('.');
//     return `${options.symbol} ${currency.replace(
//         /\B(?=(\d{3})+(?!\d))/g,
//         options.thousandsSeparator,
//     )}${options.decimalSeparator}${decimal}`
// }

export const formatCurrency = (value) => {
    return value && value.replace(/\D/g, '')
        .replace(/(\d{1,2})$/, ',$1')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

// export const formatCurrency = (value) => {
//     const str = value.toString();
//     return str.substr(0, value.toString().length - 2) + "." + value.toString().substr(-2);
// }