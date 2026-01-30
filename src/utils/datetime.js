export function formatGregorianLongFromIso(isoDateString) {
    if (!isoDateString) return ''

    try {
        const date = new Date(isoDateString)
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        }

        return new window.Intl.DateTimeFormat('en-US', options).format(date)
    } catch (error) {
        console.error('formatGregorianLongFromIso error:', error)
        return isoDateString
    }
}

export function formatGregorianShortFromIso(isoDateString) {
    if (!isoDateString) return ''

    try {
        const date = new Date(isoDateString)
        const options = {
            month: 'short',
            day: 'numeric'
        }

        return new window.Intl.DateTimeFormat('en-US', options).format(date)
    } catch (error) {
        console.error('formatGregorianShortFromIso error:', error)
        return isoDateString
    }
}

export function formatTime(date) {
    if (!date) return '--:--'

    try {
        return new window.Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date)
    } catch (error) {
        console.error('formatTime error:', error)
        return '--:--'
    }
}

export function getTodayIsoString() {
    const now = new Date()
    return now.toISOString().split('T')[0]
}

export function formatHebrewDate(hebrewDate) {
    if (!hebrewDate) return ''

    try {
        const day = hebrewDate.getDate()
        const month = hebrewDate.getMonthName()
        const year = hebrewDate.getFullYear()

        return `${day} ${month} ${year}`
    } catch (error) {
        console.error('formatHebrewDate error:', error)
        return ''
    }
}