export interface Statistics {
    month?: string;
    day?: string;
    quarter?: string;
    totalOrders: number;
    totalOrderValue: number;
    totalRevenue: number;
    totalProfit: number;
    totalQuantitySold: number;
    totalCostPrice: number;
  }
  export interface ProductStatistics {
    productId: string;
    productName: string;
    quantitySold: number;
    totalOrders: number;
    totalRevenue: number;
    profit: number;
  }
  export type MonthlyStatistics = Statistics & { month: string };
  export type DateStatistics = Statistics & { day: string };
  export type QuarterlyStatistics = Statistics & { quarter: string };
  export interface OrderStatistics {
    orderId: string;
    customerName: string;
    totalQuantitySold: number;
    totalRevenue: number;
    totalProfit: number;
    totalCostPrice: number;
  }
  