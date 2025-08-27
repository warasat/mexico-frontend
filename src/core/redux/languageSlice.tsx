import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  currentLanguage: string;
  availableLanguages: string[];
}

const initialState: LanguageState = {
  currentLanguage: 'en',
  availableLanguages: ['en', 'es']
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
    addLanguage: (state, action: PayloadAction<string>) => {
      if (!state.availableLanguages.includes(action.payload)) {
        state.availableLanguages.push(action.payload);
      }
    },
    removeLanguage: (state, action: PayloadAction<string>) => {
      state.availableLanguages = state.availableLanguages.filter(
        lang => lang !== action.payload
      );
    }
  }
});

export const { setLanguage, addLanguage, removeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
