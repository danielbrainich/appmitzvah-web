import React, { useState } from 'react'
import UpcomingHolidayCard from './UpcomingHolidayCard'

export default function UpcomingHolidaysCarousel({ holidays, onSelectHoliday }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <div className="px-3 pt-6 pb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-1">
                Coming Up
            </h3>

            {/* Carousel */}
            <div className="overflow-hidden -mx-3">
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {holidays.map((holiday) => (
                        <div key={holiday.id} className="w-full flex-shrink-0 px-3">
                            <UpcomingHolidayCard
                                holiday={holiday}
                                onPress={() => onSelectHoliday(holiday)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 py-4">
                {holidays.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                ? 'bg-brand-primary w-6'
                                : 'bg-border-light'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}