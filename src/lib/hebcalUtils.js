import { HebrewCalendar, Location, flags } from '@hebcal/core'
import { getHolidayDetails } from '../data/holidayDetails'
import { getParshaDataByName } from '../data/parshiot'

export function getUpcomingHolidays(options = {}) {
    const {
        startDate = new Date(),
        months = 12,
        location = null,
        includeModernHolidays = true,
        includeMinorFasts = true,
        includeRosheiChodesh = true,
    } = options

    const mask = buildMask({
        includeModernHolidays,
        includeMinorFasts,
        includeRosheiChodesh,
    })

    const hebcalOptions = {
        start: startDate,
        end: addMonths(startDate, months),
        mask,
        noHolidays: false,
        noRoshChodesh: !includeRosheiChodesh,
        noModern: !includeModernHolidays,
        noMinorFast: !includeMinorFasts,
        il: location?.il || false,
    }

    if (location) {
        hebcalOptions.location = new Location(
            location.latitude,
            location.longitude,
            location.il || false,
            location.tzid || 'UTC'
        )
    }

    const events = HebrewCalendar.calendar(hebcalOptions)

    return events
        .filter((ev) => {
            const cat = ev.getCategories()
            return cat.includes('holiday') || cat.includes('roshchodesh')
        })
        .map((ev) => ({
            id: `${ev.getDate().greg().toISOString()}-${ev.basename()}`,
            date: ev.getDate().greg().toISOString().split('T')[0],
            title: ev.render('en'),
            hebrewTitle: ev.renderBrief('he'),
            category: ev.getCategories()[0],
            event: ev,
            details: getHolidayDetails(ev.basename()),
        }))
}

export function getThisWeeksParsha(options = {}) {
    const { date = new Date(), location = null } = options

    const hebcalOptions = {
        start: date,
        end: addDays(date, 7),
        sedrot: true,
        il: location?.il || false,
    }

    if (location) {
        hebcalOptions.location = new Location(
            location.latitude,
            location.longitude,
            location.il || false,
            location.tzid || 'UTC'
        )
    }

    const events = HebrewCalendar.calendar(hebcalOptions)

    const parshaEvent = events.find((ev) => {
        const cats = ev.getCategories()
        return cats.includes('parashat')
    })

    if (!parshaEvent) return null

    const parshaName = parshaEvent.render('en')
    const parshaData = getParshaDataByName(parshaName)

    return {
        name: parshaName,
        hebrewName: parshaEvent.renderBrief('he'),
        date: parshaEvent.getDate().greg().toISOString().split('T')[0],
        ...parshaData,
    }
}

function buildMask(options) {
    let mask = 0

    if (options.includeModernHolidays) {
        mask |= flags.MODERN_HOLIDAY
    }

    if (options.includeMinorFasts) {
        mask |= flags.MINOR_FAST
    }

    if (options.includeRosheiChodesh) {
        mask |= flags.ROSH_CHODESH
    }

    mask |= flags.MAJOR_FAST | flags.MINOR_HOLIDAY | flags.MAJOR_HOLIDAY

    return mask
}

function addMonths(date, months) {
    const result = new Date(date)
    result.setMonth(result.getMonth() + months)
    return result
}

function addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}