export const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

export const validateRequiredInputChar = (value: string) => {
    if (value.length < 5) {
        return 'Invalid Input: Input must be at least 5 characters long';
    }
    return null;
};

export const validateRequredValue = (value: string) => {
    if (value === '') {
        return 'Invalid Input: Input can not be empty'
    }
    return null
}

export const validateRequredEmail = (value: string) => {
    if (!validateEmail(value)) {
        return 'Invalid Input: Please enter valid email address'
    }
    return null
}