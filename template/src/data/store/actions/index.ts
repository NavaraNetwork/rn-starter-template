import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import uuid from 'react-native-uuid';
import {Dispatch} from 'redux';
import {GetState} from '..';
import {IFact} from '../../types';
import {ADD_TO_BOOKMARK_LIST, FACT, REMOVE_FROM_BOOKMARK_LIST} from '../types';

export const getFact = () => {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const prevState = getState()?.factsReducer?.facts;
      const response = await axios.get('https://meowfacts.herokuapp.com');
      if (response.data) {
        dispatch({
          type: FACT,
          payload: {
            id: uuid.v4(),
            fact: response.data?.data?.[0],
          },
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    } catch (error) {
      console.warn(error);
    }
  };
};

export const addBookmark = (fact: IFact) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_TO_BOOKMARK_LIST,
    payload: fact,
  });
};

export const removeBookmark = (fact: IFact) => (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_FROM_BOOKMARK_LIST,
    payload: fact,
  });
};
