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
            placeholder: 'Пароль'
        },
        rememberMeCheckbox: {
            label: 'Запомнить меня'
        }
    },
    button: {
        signIn: 'Войти',
        signInUsingGoogle: 'Войти через Google',
    },
    link: {
        forgetPassword: 'Забыли пароль?'
    }
}
