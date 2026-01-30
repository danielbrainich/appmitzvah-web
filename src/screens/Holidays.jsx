import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUpcomingHolidays } from '../lib/hebcalUtils'
import { getLocationWithFallback } from '../lib/location'
import useTodayIsoDay from '../hooks/useTodayIsoDay'
import TodayHolidayCard from '../components/holidays/TodayHolidayCard'
import UpcomingHolidaysCarousel from '../components/holidays/UpcomingHolidaysCarousel'
import HolidayModal from '../components/holidays/HolidayModal'

export default function Holidays() {
    const [todayHolidays, setTodayHolidays] = useState([])
    const [upcomingHolidays, setUpcomingHolidays] = useState([])
    const [location, setLocation] = useState(null)
    const [selectedHoliday, setSelectedHoliday] = useState(null)

    const settings = useSelector((state) => state.settings)
    const todayIso = useTodayIsoDay()

    useEffect(() => {
        async function loadLocation() {
            const loc = await getLocationWithFallback()
            setLocation(loc)
        }
        loadLocation()
    }, [])

    useEffect(() => {
        if (!todayIso) return

        const startDate = new Date(todayIso)
        const allHolidays = getUpcomingHolidays({
            startDate,
            months: 12,
            location,
            includeModernHolidays: settings.modernHolidays,
            includeMinorFasts: settings.minorFasts,
            includeRosheiChodesh: settings.rosheiChodesh,
        })

        const today = allHolidays.filter((h) => h.date === todayIso)
        setTodayHolidays(today)

        const upcoming = allHolidays
            .filter((h) => h.date > todayIso)
            .slice(0, 5)
        setUpcomingHolidays(upcoming)
    }, [todayIso, location, settings])

    const hasHolidayToday = todayHolidays.length > 0

    return (
        <div className="flex flex-col h-full">
            {/* Hero Section */}
            <div className="flex-1 flex items-center justify-center px-3 pt-3 pb-4">
                {hasHolidayToday ? (
                    <TodayHolidayCard
                        holiday={todayHolidays[0]}
                        onPress={() => setSelectedHoliday(todayHolidays[0])}
                    />
                ) : (
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-text-primary">
                            Today is not a Jewish holiday
                        </h1>
                    </div>
                )}
            </div>

            {/* Coming Up Section */}
            {upcomingHolidays.length > 0 && (
                <div className="mt-auto">
                    <UpcomingHolidaysCarousel
                        holidays={upcomingHolidays}
                        onSelectHoliday={setSelectedHoliday}
                    />
                </div>
            )}

            {/* Holiday Detail Modal */}
            {selectedHoliday && (
                <HolidayModal
                    holiday={selectedHoliday}
                    onClose={() => setSelectedHoliday(null)}
                />
            )}
        </div>
    )
}