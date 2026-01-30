import React from 'react'

export default function UpcomingHolidayCard({ holiday, onPress }) {
    const dateLabel = new Date(holiday.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    })

    return (
        <button
            onClick={onPress}
            className="w-full bg-background-secondary rounded-2xl p-5 text-left hover:bg-background-tertiary transition-colors"
        >
            <div className="flex items-center justify-between mb-1">
                <p className="text-base text-text-muted flex-1">{dateLabel}</p>
                <svg className="w-5 h-5 text-text-muted flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-brand-primary mb-1">
                {holiday.title}
            </h3>
            {holiday.hebrewTitle && (
                <p className="text-2xl text-brand-primary text-right mt-1" style={{ direction: 'rtl' }}>
                    {holiday.hebrewTitle}
                </p>
            )}
        </button>
    )
}