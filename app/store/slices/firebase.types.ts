export interface UserProfile {
  name: string
  bikes: string[] & Bike[]
  isEmpty: boolean
  isLoaded: boolean
}

export interface Bike {
  id: string | undefined
  battery: number
  isCharging: boolean
  latitude: number
  longitude: number
  model: string
  speed: number
  heading: number
}

export interface DBSchema {
  bikes: Bike[]
}
