import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../interface/redux';

const initialState: UserState = {
  isTriedLogin: false,
  user: {
    id: '',
  },
};

const reducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    setIsTriedLogin: (
      state,
      { payload }: PayloadAction<UserState['isTriedLogin']>
    ) => {
      state.isTriedLogin = payload;
    },
    setUser: (state, { payload }: PayloadAction<UserState['user']>) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {},
});
export const userActions = {
  ...reducer.actions,
};

export const userReducer = reducer.reducer;
