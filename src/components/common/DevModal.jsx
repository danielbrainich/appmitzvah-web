import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDevMode, setOverrideDate, clearOverrideDate } from '../../store/slices/devSlice'

export default function DevModal({ onClose }) {
    const dispatch = useDispatch()
    const devModeEnabled = useSelector((state) => state.dev.devModeEnabled)
    const overrideDate = useSelector((state) => state.dev.overrideDate)
    const [dateInput, setDateInput] = useState(overrideDate || '')

    const handleToggle = () => {
        dispatch(toggleDevMode())
    }

    const handleSetDate = () => {
        if (dateInput) {
            dispatch(setOverrideDate(dateInput))
        }
        onClose()
    }

    const handleClearDate = () => {
        dispatch(clearOverrideDate())
        setDateInput('')
    }

    return (
        <div className="fixed inset-0 bg-black/55 z-50 flex items-start justify-center pt-24 px-6">
            <div className="bg-background-secondary rounded-xl p-6 border border-border-default max-w-md w-full">
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                    Developer Mode
                </h2>

                <p className="text-sm text-text-muted mb-6">
                    {devModeEnabled ? 'Dev mode is active' : 'Enable dev mode to override dates'}
                </p>

                {devModeEnabled && (
                    <div className="mb-6">
                        <label className="block text-sm text-text-muted mb-2">
                            Override Date (YYYY-MM-DD)
                        </label>
                        <input
                            type="date"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                            className="w-full px-4 py-3 bg-background-tertiary text-text-primary rounded-lg border border-border-light focus:outline-none focus:border-brand-primary"
                        />
                        {overrideDate && (
                            <button
                                onClick={handleClearDate}
                                className="text-sm text-brand-primary mt-2"
                            >
                                Clear override
                            </button>
                        )}
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-background-tertiary rounded-lg text-text-primary font-medium"
                    >
                        Cancel
                    </button>

                    {devModeEnabled ? (
                        <button
                            onClick={handleSetDate}
                            className="flex-1 py-3 bg-[#313131] rounded-lg text-text-primary font-medium"
                        >
                            Set Date
                        </button>
                    ) : (
                        <button
                            onClick={handleToggle}
                            className="flex-1 py-3 bg-[#313131] rounded-lg text-text-primary font-medium"
                        >
                            Enable
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}