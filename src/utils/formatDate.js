export function formatDate(date, type = 'BR') {
    const day = date.slice(8, 10)
    const month = date.slice(5, 7)
    const year = date.slice(0, 4)

    switch (type) {
        case 'BR':
            return `${day}/${month}/${year}`
        case 'USA':
            return `${month}/${day}/${year}`
        default:
            break;
    }
}