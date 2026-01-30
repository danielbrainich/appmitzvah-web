import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useTodayIsoDay from '../../hooks/useTodayIsoDay'
import { formatGregorianShortFromIso } from '../../utils/datetime'
import DevModal from './DevModal'

export default function TopBar() {
    const navigate = useNavigate()
    const [showDevModal, setShowDevModal] = useState(false)
    const devModeEnabled = useSelector((state) => state.dev.devModeEnabled)
    const todayIso = useTodayIsoDay()

    const dateLabel = formatGregorianShortFromIso(todayIso)

    return (
        <>
            <div className="fixed top-0 left-0 right-0 h-12 px-6 flex items-center justify-between bg-background-primary z-50">
                {/* Date pill */}
                <button
                    onClick={() => setShowDevModal(true)}
                    className="flex items-center gap-3 bg-background-secondary rounded-3xl px-6 py-3"
                >
                    <span className="text-base text-text-primary">{dateLabel}</span>
                    {devModeEnabled && (
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    )}
                </button>

                {/* Settings gear */}
                <button
                    onClick={() => navigate('/settings')}
                    className="w-9 h-9 rounded-full bg-background-secondary flex items-center justify-center"
                >
                    <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>

            {showDevModal && <DevModal onClose={() => setShowDevModal(false)} />}
        </>
    )
}