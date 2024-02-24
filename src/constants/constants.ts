export enum RouterPath {
    MAIN = '/main',
    AUTH = '/auth',
    SIGN_IN = '/auth',
    SIGN_UP = '/auth/registration',
}

export const TEXT = {
    tabs: {
        signIn: 'Вход',
        signUp: 'Регистрация',
    },
    input: {
        email: {
            label: 'e-mail:'
        },
        password: {
            helper: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
            placeholder: 'Пароль'
        },
        confirmPassword: {
            placeholder: 'Повторите пароль'
        },
        rememberMeCheckbox: {
            label: 'Запомнить меня'
        }
    },
    button: {
        signIn: 'Войти',
        signInUsingGoogle: 'Войти через Google',
        signUpUsingGoogle: 'Регистрация через Google'
    },
    link: {
        forgetPassword: 'Забыли пароль?'
    }
}
