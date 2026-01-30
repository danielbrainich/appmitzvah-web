import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TabBar() {
    return (
        <div className="fixed bottom-2 left-10 right-10 z-50">
            <div className="bg-background-secondary rounded-2xl h-16 flex items-center overflow-hidden relative">
                {/* Tabs */}
                <NavLink
                    to="/holidays"
                    className={({ isActive }) =>
                        `flex-1 h-full flex items-center justify-center text-base font-medium transition-colors z-10 ${isActive ? 'text-text-primary' : 'text-text-muted'
                        }`
                    }
                >
                    Holidays
                </NavLink>

                <NavLink
                    to="/shabbat"
                    className={({ isActive }) =>
                        `flex-1 h-full flex items-center justify-center text-base font-medium transition-colors z-10 ${isActive ? 'text-text-primary' : 'text-text-muted'
                        }`
                    }
                >
                    Shabbat
                </NavLink>

                {/* Sliding indicator */}
                <TabIndicator />
            </div>
        </div>
    )
}

function TabIndicator() {
    const [activeIndex, setActiveIndex] = React.useState(0)

    React.useEffect(() => {
        const path = window.location.pathname
        if (path.includes('holidays')) setActiveIndex(0)
        else if (path.includes('shabbat')) setActiveIndex(1)
    }, [])

    React.useEffect(() => {
        const handleRouteChange = () => {
            const path = window.location.pathname
            if (path.includes('holidays')) setActiveIndex(0)
            else if (path.includes('shabbat')) setActiveIndex(1)
        }

        window.addEventListener('popstate', handleRouteChange)
        return () => window.removeEventListener('popstate', handleRouteChange)
    }, [])

    return (
        <div
            className="absolute top-2 bottom-2 bg-[#313131] rounded-lg transition-all duration-300 ease-out"
            style={{
                width: 'calc(50% - 16px)',
                left: activeIndex === 0 ? '8px' : 'calc(50% + 8px)',
            }}
        />
    )
}