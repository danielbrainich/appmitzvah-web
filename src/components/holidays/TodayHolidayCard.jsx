import React from 'react'

export default function TodayHolidayCard({ holiday, onPress }) {
    return (
        <div className="text-center">
            <button onClick={onPress} className="group">
                <h1 className="text-5xl mb-2 text-text-primary group-hover:text-text-secondary transition-colors">
                    Today is {holiday.title}
                </h1>
                {holiday.hebrewTitle && (
                    <p className="text-lg text-brand-primary text-center mt-2" style={{ direction: 'rtl' }}>
                        {holiday.hebrewTitle}
                    </p>
                )}
            </button>
        </div>
    )
}