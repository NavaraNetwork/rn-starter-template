import {
  AnyAction,
  combineReducers,
  configureStore,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import factsReducer, {FactState} from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {IFact} from '../types';
import {PersistPartial} from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bookmarks'], // persisted 'bookmarks' on ./reducers/index.ts
  // blacklist: ['facts'], // not persisted 'facts' on ./reducers/index.ts
};

export type AppReducer = Reducer<FactState & PersistPartial, AnyAction>;

export const store = configureStore({
  reducer: {
    factsReducer: persistReducer(persistConfig, factsReducer as AppReducer),
  },
});
export const persistor = persistStore(store);

export type GetState = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
