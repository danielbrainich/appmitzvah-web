import { HebrewCalendar, Location } from '@hebcal/core'

export function computeShabbatInfo(options = {}) {
  const {
    date = new Date(),
    location = null,
    candleLightingOffset = 18,
    havdalahOffset = 42,
  } = options

  if (!location) {
    return {
      candleLighting: null,
      havdalah: null,
      parsha: null,
      isShabbatNow: false,
    }
  }

  const loc = new Location(
    location.latitude,
    location.longitude,
    location.il || false,
    location.tzid || 'America/Los_Angeles'
  )

  const events = HebrewCalendar.calendar({
    start: subtractDays(date, 1),
    end: addDays(date, 7),
    location: loc,
    candlelighting: true,
    havdalah: true,
    candleLightingMins: candleLightingOffset,
    havdalahMins: havdalahOffset,
    sedrot: true,
  })

  let candleLighting = null
  let havdalah = null
  let parsha = null

  events.forEach((ev) => {
    const cats = ev.getCategories()

    if (cats.includes('candles')) {
      candleLighting = ev.eventTime
    }

    if (cats.includes('havdalah')) {
      havdalah = ev.eventTime
    }

    if (cats.includes('parashat')) {
      parsha = {
        name: ev.render('en'),
        hebrewName: ev.renderBrief('he'),
      }
    }
  })

  const now = new Date()
  const isShabbatNow =
    candleLighting && havdalah && now >= candleLighting && now <= havdalah

  return {
    candleLighting,
    havdalah,
    parsha,
    isShabbatNow,
  }
}

function subtractDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
