export interface UserProfile {
  name: string
  bikes: string[] & Bike[]
}

export interface Bike {
  id: string | undefined
  model: string
  lat: number
  lng: number
}

export interface DBSchema {
  bikes: Bike[]
}
