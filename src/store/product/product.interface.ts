export interface IProduct {
    _id?: string;
    title: string;
    price: number;
    discount: number;
    description: string;
    images: any[];
    thumnail: string;
    quantity: number;
    variants: IVariants[];
    categoryId?: string;
    // categoryId: {
    //     _id: string;
    // };
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}

interface IVariants {
    imageColor: string
    nameColor: string
    items: Items[]
    sold: number
}

interface Items {
    size: string
    quantity: number
}

interface Images {
    url: string
}

export interface IProductState {
    products: IProduct[]
}

export interface IProductFilterState {
    nameTerm: string
    products: IProduct[]
}

export interface IProductSearchState {
    searchTerm: string
    products: IProduct[]
}



export default IProduct;