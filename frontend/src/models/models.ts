

export class Watchlist{
  watchlistId: string
  userId: string
  name: string
  minPrice: number
  maxPrice: number
  buyNowEnabled : {value: boolean}[]
  categories: {id: string, categoryDescription: string}[]

  constructor(watchlistId: string, userId: string, name: string, minPrice: number, maxPrice: number, buyNowEnabled: { value: boolean }[], categories: { id: string; categoryDescription: string }[]) {
    this.watchlistId = watchlistId;
    this.userId = userId;
    this.name = name;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.buyNowEnabled = buyNowEnabled;
    this.categories = categories;
  }
}

export class User{
  id: string
  name: string
  email: string
  admin: boolean
  active: boolean
  roles: string[]


  constructor(id: string, name: string, email: string, admin: boolean, active: boolean, roles: string[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.admin = admin;
    this.active = active;
    this.roles = roles;
  }
}




