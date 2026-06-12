import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import favoritesReducer from './favoritesSlice';
import recipeReducer from './recipeSlice';
import themeReducer from './themeSlice';

const favoritesPersistConfig = {
    key: 'favorites',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
    recipes: recipeReducer,
    theme: themeReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;