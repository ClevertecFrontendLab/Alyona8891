import { createSlice } from '@reduxjs/toolkit';
import { Feedback, PostFeedback, SignUpData, TTraining} from '../../types';
import { RequestResult } from '@constants/constants';

type AppSliceState = {
    authPageContent: 'signIn' | 'signUp';
    isLoading: boolean;
    userData: SignUpData | null | Record<'email', string>;
    userLoginData: null | string;
    newPassword: null | string;
    activeToken: null | string;
    isErrorModal: boolean;
    isFeedbackModal: boolean;
    feedbacks: Feedback[] | [];
    requestResult: null | RequestResult;
    userFeedback: null | PostFeedback;
    isAllFeedbacksVisible: boolean;
    trainingList: TTraining[],
    isPanelOpened: boolean,
};

const initialState: AppSliceState = {
    authPageContent: 'signIn',
    isLoading: false,
    userData: null,
    userLoginData: null,
    newPassword: null,
    activeToken: null,
    isErrorModal: false,
    isFeedbackModal: false,
    feedbacks: [],
    requestResult: null,
    userFeedback: null,
    isAllFeedbacksVisible: false,
    trainingList: [],
    isPanelOpened: false,
};

export const appSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        setAuthPageContent: (state, action) => {
            state.authPageContent = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setUserLoginData: (state, action) => {
            state.userLoginData = action.payload;
        },
        setActiveToken: (state, action) => {
            state.activeToken = action.payload;
        },
        setNewPassword: (state, action) => {
            state.newPassword = action.payload;
        },
        setIsErrorModal: (state, action) => {
            state.isErrorModal = action.payload;
        },
        setIsFeedbackModal: (state, action) => {
            state.isFeedbackModal = action.payload;
        },
        setFeedbacks: (state, action) => {
            state.feedbacks = [...action.payload];
        },
        setRequestResult: (state, action) => {
            state.requestResult = action.payload;
        },
        setUserFeedback: (state, action) => {
            state.userFeedback = action.payload;
        },
        setIsAllFeedbacksVisible: (state) => {
            const currentState = state.isAllFeedbacksVisible;
            state.isAllFeedbacksVisible = !currentState;
        },
        setTrainingList: (state, action) => {
            state.trainingList = action.payload;
        },
        setIsPanelOpened: (state, action) => {
            state.isPanelOpened = action.payload;
        },
    },
});

export const {
    setAuthPageContent,
    setIsLoading,
    setUserData,
    setUserLoginData,
    setActiveToken,
    setNewPassword,
    setIsErrorModal,
    setIsFeedbackModal,
    setFeedbacks,
    setRequestResult,
    setUserFeedback,
    setIsAllFeedbacksVisible,
    setTrainingList,
    setIsPanelOpened,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
