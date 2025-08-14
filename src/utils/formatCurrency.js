export function formatCurrency(value, type = 'BR') {
    const number = Number(value)

    if (isNaN(number)) return 'R$ 0.00'

    switch (type) {
        case 'BR':
            return `R$ ${value}`
        case 'USA':
            return `$ ${value}`
        case 'EUR':
            return `€ ${value}`
        default:
            break;
    }
}