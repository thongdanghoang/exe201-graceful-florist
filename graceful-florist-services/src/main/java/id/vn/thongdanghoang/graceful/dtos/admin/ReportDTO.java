package id.vn.thongdanghoang.graceful.dtos.admin;

import lombok.Builder;

import java.util.List;

@Builder()
public record ReportDTO(
        long totalRevenue,
        long totalRevenueLastWeek,
        long totalOrders,
        long totalOrdersLastWeek,
        long totalOrdersPendingLastWeek,
        long totalOrdersPending,
        List<Long> thisMonthRevenue,
        List<Long> thisYearRevenue
) {
}
