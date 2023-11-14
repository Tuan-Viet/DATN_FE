import IProduct from "../product/product.interface"

export interface ICategory {
    _id?: string
    products: IProduct[]
    images: Url
    name: string
}

export interface Url {
    url: string
    publicId: string
}

export interface ICategoryState {
    categories: ICategory[]
}
