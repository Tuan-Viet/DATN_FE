import { IProductDetail } from "../productDetail/productDetail.interface"

export interface IOutfit {
    _id?: string
    title: String
    description: string
    image: string
    items: IProductDetail[]
    hidden: boolean
}

export interface IOutfitState {
    outfits: IOutfit[]
}