import { IProductDetail } from "../productDetail/productDetail.interface"

export interface IOutfit {
    _id?: string
    title: string
    description: string
    image: { url: string, publicId: string }
    sku: string
    items: IProductDetail[]
    hidden: boolean
    createdAt: string
}

export interface IOutfitState {
    outfits: IOutfit[]
}

export interface ISearchOutfitState {
    searchTerm: string,
    outfits: IOutfit[]
}