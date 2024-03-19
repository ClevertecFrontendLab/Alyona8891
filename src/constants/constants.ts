export enum RouterPath {
    MAIN = '/main',
    FEEDBACKS = '/feedbacks',
    AUTH = '/auth',
    CALENDAR = '/calendar',
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

export enum ErrorCodes {
    INTERNAL_SERVER_ERROR = 500,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    CONFLICT = 409,
}

export enum RequestResult {
    SUCCESS = 'success',
    ERROR_403 = 'error403',
    ERROR_FEEDBACK = 'errorFeedback',
}

export enum EErrorAction {
    OPEN = 'open',
    SAVE = 'save',
}

export enum EPopoverStatus {
    WITHOUT_TRAINING = 'withoutTraining',
    WITH_TRAINING = 'withTraining',
    ADD_TRAINING = 'addTraining',
}

export enum ETrainings {
    ARMS = 'Руки',
    LEGS = 'Ноги',
    POWER = 'Силовая',
    BREAST = 'Грудь',
    BACK = 'Спина',
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
    feedbacks: {
        error403: {
            title: 'Что-то пошло не так',
            subtitle: {
                part1: 'Произошла ошибка, попробуйте ещё раз.',
            },
            button: 'Назад',
        },
        errors: {
            title: 'Данные не сохранились',
            subtitle: {
                part1: 'Что-то пошло не так. Попробуйте ещё раз.',
            },
            buttons: {
                button1: 'Написать отзыв',
                button2: 'Закрыть',
            },
        },
        success: {
            title: 'Отзыв успешно опубликован',
            button: 'Отлично',
        },
    },
};

export const FEEDBACK_MODAL = {
    title: 'Ваш отзыв',
    button: 'Опубликовать',
    placeholder: 'Autosize height based on content lines',
};

export const CONTENT_WITHOUT_FEEDBACKS = {
    title: 'Оставьте свой отзыв первым',
    text: [
        {
            key: 1,
            part: 'Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.',
        },
        { key: 2, part: 'Поделитесь своим мнением и опытом с другими пользователями,' },
        { key: 3, part: 'и помогите им сделать правильный выбор.' },
    ],
    button: 'Написать отзыв',
};

export const CONTENT_WITH_FEEDBACKS = {
    buttons: {
        button1: 'Написать отзыв',
        button2: 'Развернуть все отзывы',
        button3: 'Свернуть все отзывы',
    },
};

export const TOKEN_STORAGE_PROPERTY = 'alyona8891_token';

export const POPOVER = {
    withoutTrainings: {
        title: 'Тренировки на ',
        text: 'Нет активных тренировок',
        button: 'Создать тренировку',
    },
    withTrainings: {
        title: 'Тренировки на ',
        button: 'Добавить тренировку',
    },
    addTraining: {
        title: 'Выбор типа тренировки',
        button1: 'Добавить упражнения',
        button2: 'Сохранить',
    },
};

export const DRAWER = {
    createExercise: {
        title: '+ Добавление упражнений',
        inputNamePlaceholder: 'Упражнение',
        numberInputs: {
            time: {
                label: 'Подходы',
                placeholder: '1',
            },
            weight: {
                label: 'Вес, кг',
                placeholder: '0',
            },
            quantity: {
                label: 'Количество',
                placeholder: '3',
            },
        },
        button: 'Добавить ещё',
    },
};

export const ERROR_MODAl = {
    open: {
        title: 'При открытии данных произошла ошибка',
        content: 'Попробуйте ещё раз.',
        button: 'Обновить',
    },
    save: {
        title: 'При сохранении данных произошла ошибка',
        content: 'Придётся попробовать ещё раз',
        button: 'Закрыть',
    },
};

export const initialFormData = {
    id: 'initial',
    name: null,
    time: null,
    quantity: null,
    weight: null,
};
