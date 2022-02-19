export interface UserProfile {
  name: string
  bikes: string[] & Bike[]
  isEmpty: boolean
  isLoaded: boolean
}

export interface Bike {
  id: string | undefined
  model: string
  lat: number
  lng: number
  battery: number
}

export interface DBSchema {
  bikes: Bike[]
}
