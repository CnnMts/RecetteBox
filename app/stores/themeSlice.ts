import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: { 
        isDarkMode: false,
        isSystemTheme: true,
    },
    reducers: {
        toggleTheme(state) {
            state.isDarkMode = !state.isDarkMode;
            state.isSystemTheme = false; 
        },
        setSystemTheme(state, action: PayloadAction<boolean>) {
            if (state.isSystemTheme) {
                state.isDarkMode = action.payload;
            }
        },
        resetToSystem(state) {
            state.isSystemTheme = true;
        }
    },
});

export const { toggleTheme, setSystemTheme, resetToSystem } = themeSlice.actions;
export default themeSlice.reducer;