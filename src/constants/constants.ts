export enum RouterPath {
    MAIN = '/main',
    AUTH = '/auth',
    SIGN_IN = '/auth',
    SIGN_IN_RESULT = '/auth/result',
    SIGN_IN_RESULT_ERROR = '/auth/result/error-login',
    SIGN_IN_RESULT_CHECK_ERROR_404 = '/auth/result/error-check-email-no-exist',
    SIGN_IN_RESULT_CHECK_ERRORS = '/auth/result/error-check-email',
    SIGN_IN_CONFIRM_EMAIL = '/auth/confirm-email',
    SIGN_IN_CHANGE_PASSWORD = '/auth/change-password',
    SIGN_IN_CHANGE_PASSWORD_ERRORS = '/auth/change-password/result/error-change-password',
    SIGN_IN_CHANGE_PASSWORD_SUCCESS = '/auth/change-password/result/success-change-password',
    SIGN_UP = '/auth/registration',
    SIGN_UP_RESULT = '/auth/registration/result',
    SIGN_UP_RESULT_SUCCESS = '/auth/registration/result/success',
    SIGN_UP_RESULT_ERROR_409 = '/auth/registration/result/error-user-exist',
    SIGN_UP_RESULT_ERRORS = '/auth/registration/result/error',
}

export const TEXT = {
    tabs: {
        signIn: 'Вход',
        signUp: 'Регистрация',
    },
    input: {
        email: {
            label: 'e-mail:',
        },
        password: {
            helper: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
            placeholder: 'Пароль',
        },
        confirmPassword: {
            placeholder: 'Повторите пароль',
        },
        rememberMeCheckbox: {
            label: 'Запомнить меня',
        },
    },
    button: {
        signIn: 'Войти',
        signInUsingGoogle: 'Войти через Google',
        signUpUsingGoogle: 'Регистрация через Google',
    },
    link: {
        forgetPassword: 'Забыли пароль?',
    },
};

export const VALIDATION_RULES = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
};
