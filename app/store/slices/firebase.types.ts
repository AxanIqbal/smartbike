export interface UserProfile {
  name: string
  bikes: string[] & Bike[]
  token: string
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
  owner: string
  history: LocationHistory[]
}

export interface LocationHistory {
  description: string
  time: Date | string
}

export interface DBSchema {
  bikes: Bike[]
}
