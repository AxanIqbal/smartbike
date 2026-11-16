export interface UserProfile {
  id: string | undefined
  battery: number
  isCharging: boolean
  latitude: number
  longitude: number
  model: string
  speed: number
  heading: number
  history: history[]
}

interface history {
  address: string
  timeStamp: Date
}

export interface DBSchema {}
