import {PayloadAction} from '@reduxjs/toolkit';
import {IFact} from '../../types';
import {ADD_TO_BOOKMARK_LIST, FACT, REMOVE_FROM_BOOKMARK_LIST} from '../types';

export interface FactState {
  facts: IFact;
  bookmarks: IFact[];
}

const initialState: FactState = {
  facts: {} as IFact,
  bookmarks: [],
};

function factReducer(state = initialState, action: PayloadAction<IFact>) {
  switch (action.type) {
    case FACT:
      return {...state, facts: action.payload};
    case ADD_TO_BOOKMARK_LIST:
      return {...state, bookmarks: [...state.bookmarks, action.payload]};
    case REMOVE_FROM_BOOKMARK_LIST:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          book => book.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

export default factReducer;
