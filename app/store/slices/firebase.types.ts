export interface UserProfile {
  name: string
  bikes: string[] & Bike[]
}

export interface Bike {
  id?: string
  model: string
  lat: number
  lng: number
}

export interface DBSchema {
  bikes: Bike[]
}
