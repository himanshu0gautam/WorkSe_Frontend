import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const storeUser = localStorage.getItem('userInfo')

const initialState = {
    user: storeUser ? JSON.parse(storeUser) : null,
    accessToken: null,
    isAuthenticated: !!storeUser
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginData: (state, action) => {

            const incomingUser = action.payload.user;

            state.user = incomingUser;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true

            localStorage.setItem('userInfo', JSON.stringify(incomingUser))
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        logout: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false

            localStorage.removeItem('userInfo')
        }
    }
})

export const { setLoginData, setAccessToken, logout } = authSlice.actions
export default authSlice.reducer