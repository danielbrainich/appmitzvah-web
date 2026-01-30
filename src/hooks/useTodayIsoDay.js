import { useSelector } from 'react-redux'
import { getTodayIsoString } from '../utils/datetime'

export default function useTodayIsoDay() {
    const overrideDate = useSelector((state) => state.dev.overrideDate)

    if (overrideDate) {
        return overrideDate
    }

    return getTodayIsoString()
}