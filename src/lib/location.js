export async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'))
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            },
            (error) => {
                reject(error)
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000, // 5 minutes
            }
        )
    })
}

export async function getLocationWithFallback() {
    try {
        return await getCurrentLocation()
    } catch (error) {
        console.warn('Location access denied or unavailable')
        return null
    }
}