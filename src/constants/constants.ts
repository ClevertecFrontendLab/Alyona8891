export enum RouterPath {
    MAIN = '/main',
    FEEDBACKS = '/feedbacks',
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

export const CHANGE_PASSWORD_CONTENT = {
    title: 'Восстановление аккауанта',
    inputHelper: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
    inputsPlaceholders: {
        input1: 'Новый пароль',
        input2: 'Повторите пароль',
    },
    button: 'Сохранить',
};

export const CONFIRM_PASSWORD = {
    error: {
        title: { part1: 'Неверный код. Введите код', part2: 'для восстановления аккауанта' },
        subtitle: {
            part1: 'Мы отправили вам на e-mail',
            part2: 'шестизначный код. Введите его в поле ниже.',
            part3: 'Не пришло письмо? Проверьте папку Спам.',
        },
    },
    content: {
        title: { part1: 'Введите код', part2: 'для восстановления аккауанта' },
        subtitle: {
            part1: 'Мы отправили вам на e-mail',
            part2: 'шестизначный код. Введите его в поле ниже.',
            part3: 'Не пришло письмо? Проверьте папку Спам.',
        },
    },
};

export const VALIDATION_RULES = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

export const RESULT_CARDS_DATA = {
    changePassword: {
        errors: {
            title: 'Данные не сохранились',
            subtitle: 'Что-то пошло не так. Попробуйте ещё раз',
            button: 'Повторить',
        },
        success: {
            title: 'Пароль успешно изменен',
            subtitle: {
                part1: 'Теперь можно войти в аккаунт, используя',
                part2: 'свой логин и новый пароль',
            },
            button: 'Вход',
        },
    },
    signIn: {
        errors: {
            title: 'Вход не выполнен',
            subtitle: 'Что-то пошло не так. Попробуйте ещё раз',
            button: 'Повторить',
        },
        error404: {
            title: 'Такой e-mail не зарегистрирован',
            subtitle: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
            button: 'Попробовать снова',
        },
    },
    checkPassword: {
        errors: {
            title: 'Что-то пошло не так',
            subtitle: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
            button: 'Назад',
        },
    },
    signUp: {
        errors: {
            title: 'Данные не сохранились',
            subtitle: 'Что-то пошло не так. Попробуйте еще раз',
            button: 'Повторить',
        },
        error409: {
            title: 'Данные не сохранились',
            subtitle: {
                part1: 'Такой e-mail уже записан в системе. Попробуйте',
                part2: 'зарегистрироваться по другому e-mail.',
            },
            button: 'Назад к регистрации',
        },
        success: {
            title: 'Регистрация успешна',
            subtitle: {
                part1: 'Что-то пошло не так и ваша регистрация',
                part2: 'не завершилась. Попробуйте ещё раз.',
            },
            button: 'Войти',
        },
    },
};
