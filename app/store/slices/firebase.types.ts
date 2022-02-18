export interface UserProfile {
  name: string
  bikes: Bike[] | string[]
}

export interface Bike {
  model: string
  lat: number
  lng: number
}

export interface DBSchema {
  bikes: Bike[]
}
