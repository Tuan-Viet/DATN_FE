import IProduct from "../product/product.interface"

export interface ICategory {
    _id?: string
    products: IProduct[]
    name: string
}

export interface ICategoryState {
    categories: ICategory[]
}