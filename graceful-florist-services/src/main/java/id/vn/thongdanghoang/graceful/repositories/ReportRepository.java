package id.vn.thongdanghoang.graceful.repositories;

import java.util.List;

public interface ReportRepository {

    Long totalOrdersLastWeek();

    Long totalOrdersPending();

    Long totalOrdersPendingLastWeek();

    Long totalRevenue();

    Long totalRevenueLastWeek();

    List<Long> thisMonthRevenue();

    List<Long> thisYearRevenue();
}
