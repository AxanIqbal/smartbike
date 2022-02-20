export interface UserProfile {
  id: string | undefined
  battery: number
  isCharging: boolean
  latitude: number
  longitude: number
  model: string
  speed: number
  heading: number
}

export interface DBSchema {}
