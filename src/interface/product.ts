import ICategory from "./category";
interface IProduct {
    _id?: string;
    title: string;
    price: number;
    discount: number;
    description: string;
    images: any[];
    thumnail: string;
    quantity: number;
    productDetails: any;
    categoryId?: ICategory;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}

export default IProduct;