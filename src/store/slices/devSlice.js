import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    devModeEnabled: false,
    overrideDate: null,
}

const devSlice = createSlice({
    name: 'dev',
    initialState,
    reducers: {
        toggleDevMode: (state) => {
            state.devModeEnabled = !state.devModeEnabled
            if (!state.devModeEnabled) {
                state.overrideDate = null
            }
        },
        setOverrideDate: (state, action) => {
            state.overrideDate = action.payload
        },
        clearOverrideDate: (state) => {
            state.overrideDate = null
        },
    },
})

export const { toggleDevMode, setOverrideDate, clearOverrideDate } = devSlice.actions
export default devSlice.reducer