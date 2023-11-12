import IProduct from "../product/product.interface"

export interface ICategory {
    _id?: string
    products: IProduct[]
    images: url[]
    name: string
}

export interface url {
    url: string
}

export interface ICategoryState {
    categories: ICategory[]
}