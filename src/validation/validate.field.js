import {isEmail} from "validator";
import React from "react";

const required = (value) => {
    if (!value) {
        return render('This field is required!');
    }
};

const login = (value) => {
    if (!isEmail(value)) {
        return render('This is not a valid email.');
    }
};

const loginLength = (value) => {
    if (value.length < 3 || value.length > 64) {
        return render('The login must be between 3 and 20 characters.');
    }
};

const passwordLength = (value) => {
    if (value.length < 6 || value.length > 64) {
        return render('The password must be between 6 and 40 characters.');
    }
};

const subgroupInput = (value) => {
    if (value !== '1' && value !== '2') {
        return render('The subgroup field must be 1 or 2.');
    }
};

const inputStringLength = (value) => {
    if (value.length < 0 || value.length > 64) {
        return render('The input field must be between 1 and 64 characters.');
    }
};

const inputNum = (value) => {
    if (!(/^[1-9][\d]*$/.test(value)) || Number(value) > 999999999999) {
        return render('The input field must be positive numeric and less than 999999999999.');
    }
};

const render = (message) => {
    return (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    );
}

const ValidationService = {
    required,
    login,
    loginLength,
    passwordLength,
    inputStringLength,
    inputNum,
    subgroupInput
}

export default ValidationService;
