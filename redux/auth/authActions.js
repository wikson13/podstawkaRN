import AsyncStorage from '@react-native-community/async-storage';

// import {exp} from 'react-native-reanimated';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTH_STORAGE_START = 'AUTH_STORAGE_START';
export const AUTH_STORAGE_REQUEST = 'AUTH_STORAGE_REQUEST';
export const AUTH_STORAGE_SUCCESS = 'AUTH_STORAGE_SUCCESS';
export const AUTH_STORAGE_FAILED = 'AUTH_STORAGE_FAILED';

export const authRequest = userData => {
  return {
    type: AUTH_REQUEST,
    payload: userData,
  };
};

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = responseData => {
  const expirationDate =
    new Date().getTime() + parseInt(responseData.expiresIn) * 1000;
  saveDataToStorage(
    responseData.idToken,
    responseData.localId,
    expirationDate,
    responseData.email,
  );
  return {
    type: AUTH_SUCCESS,
    payload: responseData,
  };
};

export const authFailed = err => {
  return {
    type: AUTH_FAILED,
    payload: err,
  };
};

export const authLogout = () => {
  AsyncStorage.removeItem('userData');
  return {
    type: AUTH_LOGOUT,
  };
};

const saveDataToStorage = (token, userId, expirationDate, email) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toString(),
      email,
    }),
  );
};

export const authenticate = (userId, token, email) => {
  return {
    type: AUTHENTICATE,
    payload: {userId, token, email},
  };
};

export const authStorageStart = (userId, token, email) => {
  return {
    type: AUTH_STORAGE_START,
    payload: {userId, token, email},
  };
};

export const authStorageRequest = userData => {
  return {
    type: AUTH_STORAGE_REQUEST,
    payload: userData,
  };
};

export const authStorageFailed = () => {
  return {
    type: AUTH_STORAGE_FAILED,
  };
};

export const authStorageSuccess = responseData => {
  return {
    type: AUTH_STORAGE_SUCCESS,
    payload: responseData,
  };
};
