export interface ReportDTO {
  totalRevenue: number;
  totalRevenueLastWeek: number;
  totalOrders: number;
  totalOrdersLastWeek: number;
  totalOrdersPendingLastWeek: number;
  totalOrdersPending: number;
  thisMonthRevenue: number[];
  thisYearRevenue: number[];
}
