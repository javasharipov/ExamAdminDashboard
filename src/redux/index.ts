import { configureStore } from '@reduxjs/toolkit'
import { mainApi } from './api'
import { combineReducers } from 'redux'

export const store = configureStore({
	reducer: combineReducers({
		[mainApi.reducerPath]: mainApi.reducer,
	}),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(mainApi.middleware),
	devTools: process.env.NODE_ENV !== 'production',
})

// Define types AFTER store is created
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
