exports.formatError = function  (error) {
    if (typeof error === 'object') {
        error = error.toString();
        if (error.indexOf('Error: ') !== -1) {
            error = error.split('Error: ')[1];
        }
    }
    return error;
};
