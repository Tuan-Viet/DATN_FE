import { IProductDetail } from "../productDetail/productDetail.interface"

export interface IOutfit {
    _id?: string
    title: String
    description: string
    image: { url: string, publicId: string }
    sku: string
    items: IProductDetail[]
    hidden: boolean
}

export interface IOutfitState {
    outfits: IOutfit[]
}

export interface ISearchOutfitState {
    searchTerm: string,
    outfits: IOutfit[]
}