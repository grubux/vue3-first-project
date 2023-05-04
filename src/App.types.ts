export interface User {
  name: string
  username: string
  id: number
}

export interface NewUser {
  name: string
  username: string
  id: number | null
}
export interface UsersFetched {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}
