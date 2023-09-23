const customResponse = (res, statusCode, data, message) => {
    res.status(statusCode).json({
        data,
        success: statusCode === 200 || statusCode === 201,
        statusCode,
        message
    });
}

const isEmpty = (field) => {
    if (typeof field === 'object') {
        try {
            return Object.keys(field).length === 0
        } catch (err) {
            return true
        }
    }
    if (field instanceof Array) {
        return field.length === 0
    }
    return field === undefined || field === null || field === '' || field === 0
}

export { customResponse, isEmpty }
