import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import settingsReducer from './slices/settingsSlice'
import devReducer from './slices/devSlice'

const settingsPersistConfig = {
    key: 'settings',
    storage,
}

const devPersistConfig = {
    key: 'dev',
    storage,
}

export const store = configureStore({
    reducer: {
        settings: persistReducer(settingsPersistConfig, settingsReducer),
        dev: persistReducer(devPersistConfig, devReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export const persistor = persistStore(store)