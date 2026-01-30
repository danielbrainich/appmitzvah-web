import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { computeShabbatInfo } from '../lib/computeShabbatInfo'
import { getThisWeeksParsha } from '../lib/hebcalUtils'
import { getLocationWithFallback } from '../lib/location'
import { formatTime } from '../utils/datetime'
import useTodayIsoDay from '../hooks/useTodayIsoDay'
import ParshaModal from '../components/shabbat/ParshaModal'

export default function Shabbat() {
    const [shabbatInfo, setShabbatInfo] = useState(null)
    const [parshaInfo, setParshaInfo] = useState(null)
    const [location, setLocation] = useState(null)
    const [showParshaModal, setShowParshaModal] = useState(false)
    const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 })

    const settings = useSelector((state) => state.settings)
    const todayIso = useTodayIsoDay()

    // Load location
    useEffect(() => {
        async function loadLocation() {
            const loc = await getLocationWithFallback()
            setLocation(loc)
        }
        loadLocation()
    }, [])

    // Load Shabbat info
    useEffect(() => {
        if (!location || !todayIso) return

        const info = computeShabbatInfo({
            date: new Date(todayIso),
            location,
            candleLightingOffset: settings.candleLightingToggle
                ? settings.candleLightingTime
                : 18,
            havdalahOffset: settings.havdalahTimeToggle
                ? settings.havdalahTime
                : 42,
        })

        setShabbatInfo(info)

        const parsha = getThisWeeksParsha({
            date: new Date(todayIso),
            location,
        })

        setParshaInfo(parsha)
    }, [location, todayIso, settings])

    // Countdown timer
    useEffect(() => {
        if (!shabbatInfo?.candleLighting) return

        const interval = setInterval(() => {
            const now = new Date()
            const target = shabbatInfo.isShabbatNow
                ? shabbatInfo.havdalah
                : shabbatInfo.candleLighting

            if (!target) return

            const diff = target - now

            if (diff <= 0) {
                setCountdown({ hours: 0, minutes: 0, seconds: 0 })
                return
            }

            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setCountdown({ hours, minutes, seconds })
        }, 1000)

        return () => clearInterval(interval)
    }, [shabbatInfo])

    const candleLightingTime = shabbatInfo?.candleLighting
        ? formatTime(shabbatInfo.candleLighting)
        : '--:--'

    const havdalahTime = shabbatInfo?.havdalah
        ? formatTime(shabbatInfo.havdalah)
        : '--:--'

    return (
        <div className="px-3 pb-8">
            {/* Hero */}
            <div className="text-center pt-3 pb-4">
                <h1 className="text-[60px] leading-[70px] font-bold text-text-primary">
                    Shabbat Shalom
                </h1>
                {parshaInfo && (
                    <p className="text-lg text-brand-primary text-center mt-2" style={{ direction: 'rtl' }}>
                        {parshaInfo.hebrewName}
                    </p>
                )}
            </div>

            {/* Countdown */}
            {(shabbatInfo?.candleLighting || shabbatInfo?.havdalah) && (
                <div className="flex justify-between my-5 mx-20">
                    <CountdownItem label="Hours" value={countdown.hours} />
                    <CountdownItem label="Mins" value={countdown.minutes} />
                    <CountdownItem label="Secs" value={countdown.seconds} />
                </div>
            )}

            {/* Times Card */}
            <div className="bg-background-secondary rounded-2xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Friday
                </h3>

                <TimeRow label="Candle lighting" value={candleLightingTime} />
            </div>

            {/* Saturday Card */}
            <div className="bg-background-secondary rounded-2xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Saturday
                </h3>

                <TimeRow label="Shabbat ends" value={havdalahTime} />
            </div>

            {/* Parsha Card */}
            {parshaInfo && (
                <div className="bg-background-secondary rounded-2xl p-5">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                        Torah Portion
                    </h3>

                    <button
                        onClick={() => setShowParshaModal(true)}
                        className="w-full flex items-center justify-between"
                    >
                        <div className="flex-1 text-left">
                            <p className="text-base text-text-primary">
                                {parshaInfo.name}
                            </p>
                            {parshaInfo.verses && (
                                <p className="text-sm text-text-muted mt-1">
                                    {parshaInfo.verses}
                                </p>
                            )}
                        </div>
                        <svg className="w-5 h-5 text-text-muted ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}

            {!location && (
                <div className="text-center py-12">
                    <p className="text-text-muted">
                        Enable location to see Shabbat times
                    </p>
                </div>
            )}

            {showParshaModal && parshaInfo && (
                <ParshaModal
                    parsha={parshaInfo}
                    onClose={() => setShowParshaModal(false)}
                />
            )}
        </div>
    )
}

function CountdownItem({ label, value }) {
    return (
        <div className="w-1/3 text-center">
            <div className="text-[44px] font-['ChutzBold',sans-serif] text-brand-primary leading-none">
                {String(value).padStart(2, '0')}
            </div>
            <div className="text-sm text-text-muted mt-1">{label}</div>
        </div>
    )
}

function TimeRow({ label, value }) {
    return (
        <div className="flex items-center justify-between mb-2">
            <span className="text-base text-text-primary">{label}</span>
            <span className="text-base text-text-primary max-w-[60%] text-right">
                {value}
            </span>
        </div>
    )
}