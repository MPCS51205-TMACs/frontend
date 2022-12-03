

export class Watchlist{
  watchlistId: string
  userId: string
  name: string
  minPrice: number
  maxPrice: number
  buyNowEnabled : {value: boolean}[]
  categories: {id: string, categoryDescription: string}[]
}


