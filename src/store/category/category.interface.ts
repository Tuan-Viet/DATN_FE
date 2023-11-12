import IProduct from "../product/product.interface"

export interface ICategory {
    _id?: string
    products: IProduct[]
    images: any
    name: string
}

export interface ICategoryState {
    categories: ICategory[]
}