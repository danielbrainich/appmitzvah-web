import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Layout from './Layout'
import Holidays from '../../screens/Holidays'
import Shabbat from '../../screens/Shabbat'
import Settings from '../../screens/Settings'

export default function MainApp() {
    const location = useLocation()
    const navigate = useNavigate()
    const showSettings = location.pathname === '/settings'
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (showSettings) {
            setIsAnimating(true)
        }
    }, [showSettings])

    const handleClose = () => {
        setIsAnimating(false)
        setTimeout(() => {
            navigate(-1)
        }, 300) // Match animation duration
    }

    if (!showSettings && !isAnimating) {
        return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/holidays" replace />} />
                    <Route path="holidays" element={<Holidays />} />
                    <Route path="shabbat" element={<Shabbat />} />
                    <Route path="settings" element={<div />} />
                </Route>
            </Routes>
        )
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/holidays" replace />} />
                    <Route path="holidays" element={<Holidays />} />
                    <Route path="shabbat" element={<Shabbat />} />
                    <Route path="settings" element={<div />} />
                </Route>
            </Routes>

            {/* Settings Slide Panel */}
            <>
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isAnimating && showSettings ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={handleClose}
                />

                {/* Settings Panel */}
                <div
                    className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-background-primary z-50 shadow-2xl transition-transform duration-300 ease-out ${isAnimating && showSettings ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <Settings onClose={handleClose} />
                </div>
            </>
        </>
    )
}