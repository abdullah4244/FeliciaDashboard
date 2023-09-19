import { configureStore } from '@reduxjs/toolkit'
import { Api } from './services/api'
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import userReducer from './slices/userSlice'
export const store = configureStore({
  reducer: {
    [Api.reducerPath] : Api.reducer,
    activeUser : userReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(Api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>() //This is used to perform action
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector