import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meal } from '../types';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: { favorites: [] as Meal[] },
    reducers: {
        addFavorite(state, action: PayloadAction<Meal>) {
            const exists = state.favorites.some(m => m.idMeal === action.payload.idMeal);
            if (!exists) {
                state.favorites.push(action.payload);
            }
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(m => m.idMeal !== action.payload);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;