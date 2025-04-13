import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
  uri: string | null;
}

const initialState: ImageState = {
  uri: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImageUri: (state, action: PayloadAction<string>) => {
      state.uri = action.payload;
    },
    clearImage: (state) => {
      state.uri = null;
    },
  },
});

export const { setImageUri, clearImage } = imageSlice.actions;
export default imageSlice.reducer;
