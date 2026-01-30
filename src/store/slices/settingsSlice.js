import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modernHolidays: true,
    minorFasts: true,
    rosheiChodesh: true,
    candleLightingToggle: true,
    candleLightingTime: 18,
    havdalahTimeToggle: true,
    havdalahTime: 42,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleModernHolidays: (state) => {
            state.modernHolidays = !state.modernHolidays
        },
        toggleMinorFasts: (state) => {
            state.minorFasts = !state.minorFasts
        },
        toggleRosheiChodesh: (state) => {
            state.rosheiChodesh = !state.rosheiChodesh
        },
        toggleCandleLighting: (state) => {
            state.candleLightingToggle = !state.candleLightingToggle
            if (state.candleLightingToggle) {
                state.candleLightingTime = 0
            }
        },
        setCandleLightingTime: (state, action) => {
            state.candleLightingTime = action.payload
        },
        toggleHavdalahTime: (state) => {
            state.havdalahTimeToggle = !state.havdalahTimeToggle
            if (state.havdalahTimeToggle) {
                state.havdalahTime = 0
            }
        },
        setHavdalahTime: (state, action) => {
            state.havdalahTime = action.payload
        },
    },
})

export const {
    toggleModernHolidays,
    toggleMinorFasts,
    toggleRosheiChodesh,
    toggleCandleLighting,
    setCandleLightingTime,
    toggleHavdalahTime,
    setHavdalahTime,
} = settingsSlice.actions

export default settingsSlice.reducer