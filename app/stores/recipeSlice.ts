import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Meal } from '../types';

import { searchMeals } from '../services/apiService';

interface RecipesState {
    results: Meal[];
    loading: boolean;
    error: string | null;
    cache: Record<string, Meal[]>;
}

const initialState: RecipesState = {
    results: [],
    loading: false,
    error: null,
    cache: {},
};
export const fetchRecipes = createAsyncThunk<
    Meal[],
    string,
    { state: { recipes: RecipesState } }
>(
    'recipes/fetchRecipes',
    async (query: string, thunkAPI) => {
        const state = thunkAPI.getState() as { recipes: RecipesState };
        const cachedData = state.recipes.cache[query.toLowerCase().trim()];

        if (cachedData) {
            return cachedData;
        }

        const response = await searchMeals(query);
        return response;
    }
);
const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Meal[], string, { arg: string }>) => {
                state.loading = false;
                state.results = action.payload;
                const query = action.meta.arg.toLowerCase().trim();
                state.cache[query] = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Une erreur est survenue lors de la récupération des recettes.";
            });
    },
});

export default recipeSlice.reducer;