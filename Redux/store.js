import rootReducer from './rootReducer';
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { AsyncStorage } from 'react-native'
import promise from 'redux-promise-middleware'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

const enhancer = compose(
    applyMiddleware(thunk, promise())
);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1,
    timeout: null
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer, enhancer);

store.subscribe(() =>
    console.log(store.getState())
);

export const persistor = persistStore(store);