export const formatName = (value) => {
    if (value) {
        if (value && value.length >= 15) {
            return `${value.substring(0, 15) + '...'}`
        } else {
            return value
        }
    }
}

export const formatMessage = (value) => {
    if (value) {
        if (value && value.length >= 15) {
            return `${value.substring(0, 18) + '...'}`
        } else {
            return value
        }
    }
}