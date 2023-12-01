export interface IVoucher {
    _id?: string
    title: string
    type: string
    code: string
    quantity: number
    discount: number
    used: number
    minOrderValue: number
    validFrom: number
    validTo: number
    description: string
    createdAt: Date;
}

export interface IVoucherState {
    vouchers: IVoucher[]
}