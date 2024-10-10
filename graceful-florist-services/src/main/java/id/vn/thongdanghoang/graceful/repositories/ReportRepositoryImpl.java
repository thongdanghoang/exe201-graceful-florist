package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.AbstractAuditableEntity;
import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.enums.OrderStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class ReportRepositoryImpl implements ReportRepository{

    @PersistenceContext
    private EntityManager em;

    @Override
    public Long totalOrdersLastWeek() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<OrderEntity> order = cq.from(OrderEntity.class);

        // Define the date range for the last week
        var dateRange = cb.lessThanOrEqualTo(
                order.get(AbstractAuditableEntity.Fields.createdDate),
                cb.function("DATE_TRUNC", java.sql.Date.class, cb.literal("week"), cb.currentDate()).as(java.sql.Date.class)
        );

        cq.select(cb.count(order)).where(dateRange);

        return Optional.ofNullable(em.createQuery(cq).getSingleResult()).orElse(0L);
    }

    @Override
    public Long totalOrdersPending() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<OrderEntity> order = cq.from(OrderEntity.class);

        // Define the predicate for pending status
        Predicate statusPredicate = cb.equal(
                order.get(OrderEntity.Fields.status),
                OrderStatus.PENDING);

        cq.select(cb.count(order)).where(statusPredicate);

        return Optional.ofNullable(em.createQuery(cq).getSingleResult()).orElse(0L);
    }

    @Override
    public Long totalOrdersPendingLastWeek() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<OrderEntity> order = cq.from(OrderEntity.class);

        // Define the predicate for pending status
        Predicate statusPredicate = cb.equal(order.get(OrderEntity.Fields.status), OrderStatus.PENDING);

        // Define the date range for the last week before
        Predicate dateRange = cb.lessThanOrEqualTo(
                order.get(AbstractAuditableEntity.Fields.createdDate),
                cb.function("DATE_TRUNC", java.sql.Date.class, cb.literal("week"), cb.currentDate()).as(java.sql.Date.class)
        );

        cq.select(cb.count(order)).where(cb.and(statusPredicate, dateRange));

        return Optional.ofNullable(em.createQuery(cq).getSingleResult()).orElse(0L);
    }

    @Override
    public Long totalRevenue() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<OrderEntity> order = cq.from(OrderEntity.class);

        var deliveredOrder = cb
                .equal(order.get(OrderEntity.Fields.status), OrderStatus.DELIVERED);

        // Define the selection for the total revenue
        cq
                .select(cb.sum(order.get(OrderEntity.Fields.totalPrice)))
                .where(deliveredOrder);

        return Optional.ofNullable(em.createQuery(cq).getSingleResult()).orElse(0L);
    }

    @Override
    public Long totalRevenueLastWeek() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<OrderEntity> order = cq.from(OrderEntity.class);

        // Define the date range for the last week
        Predicate dateRange = cb.lessThanOrEqualTo(
                order.get(AbstractAuditableEntity.Fields.createdDate),
                cb.function("DATE_TRUNC", java.sql.Date.class, cb.literal("week"), cb.currentDate()).as(java.sql.Date.class)
        );
        var deliveredOrder = cb
                .equal(order.get(OrderEntity.Fields.status), OrderStatus.DELIVERED);

        // Define the selection for the total revenue
        cq
                .select(cb.sum(order.get("totalPrice")))
                .where(dateRange, deliveredOrder);

        return Optional.ofNullable(em.createQuery(cq).getSingleResult()).orElse(0L);
    }

    @Override
    public List<Long> thisMonthRevenue() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Object[]> cq = cb.createQuery(Object[].class);
        Root<OrderEntity> order = cq.from(OrderEntity.class);

        var deliveredOrder = cb
                .equal(order.get(OrderEntity.Fields.status), OrderStatus.DELIVERED);

        // Get the start of the current month and the current day
        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);
        LocalDate today = LocalDate.now();

        // Define the date range for the current month
        Predicate dateRange = cb.between(
                order.get(AbstractAuditableEntity.Fields.createdDate),
                startOfMonth.atStartOfDay(),  // Start of the current month
                today.atTime(23, 59, 59)      // End of the current day
        );

        // Extract the day from the createdDate field
        Expression<LocalDateTime> truncatedDay = cb.function(
                "DATE_TRUNC", LocalDateTime.class, cb.literal("day"), order.get(AbstractAuditableEntity.Fields.createdDate)
        );

        // Select the total revenue for each day and use COALESCE to handle null values
        cq.multiselect(truncatedDay, cb.coalesce(cb.sum(order.get(OrderEntity.Fields.totalPrice)), 0L))
                .where(deliveredOrder, dateRange)
                .groupBy(truncatedDay)
                .orderBy(cb.asc(truncatedDay));

        List<Object[]> results = em.createQuery(cq).getResultList();

        // Initialize a list of zeros for each day from the 1st to today
        int currentDay = today.getDayOfMonth();
        List<Long> dailyRevenue = new ArrayList<>(Collections.nCopies(currentDay, 0L));

        // Populate the dailyRevenue list with the actual values from the query result
        for (Object[] result : results) {
            LocalDateTime day = (LocalDateTime) result[0];
            Long revenue = (Long) result[1];

            // Extract the day of the month (1-31)
            int dayIndex = day.getDayOfMonth() - 1;  // 0-based index

            // Set the revenue for the corresponding day
            dailyRevenue.set(dayIndex, revenue);
        }

        return dailyRevenue;
    }


    @Override
    public List<Long> thisYearRevenue() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Object[]> cq = cb.createQuery(Object[].class);
        Root<OrderEntity> order = cq.from(OrderEntity.class);

        var deliveredOrder = cb
                .equal(order.get(OrderEntity.Fields.status), OrderStatus.DELIVERED);

        // Get the start of the year (January 1st of the current year) using LocalDateTime
        LocalDate startOfYear = LocalDate.now().withDayOfYear(1);
        LocalDate today = LocalDate.now();

        Predicate dateRange = cb.between(
                order.get(AbstractAuditableEntity.Fields.createdDate),
                startOfYear.atStartOfDay(),  // Start of the year
                today.atTime(23, 59, 59)     // Current date till the end of the day
        );

        // Truncate the createdDate field to month (ensure proper truncation)
        Expression<LocalDateTime> truncatedMonth = cb.function(
                "DATE_TRUNC", LocalDateTime.class, cb.literal("month"), order.get(AbstractAuditableEntity.Fields.createdDate)
        );

        // Select the total revenue for each month and use COALESCE to handle null values
        cq.multiselect(truncatedMonth, cb.coalesce(cb.sum(order.get(OrderEntity.Fields.totalPrice)), 0L))
                .where(deliveredOrder, dateRange)
                .groupBy(truncatedMonth)
                .orderBy(cb.asc(truncatedMonth));

        List<Object[]> results = em.createQuery(cq).getResultList();

        // Initialize a list of zeros for each month from January to the current month
        int currentMonth = today.getMonthValue();
        List<Long> monthlyRevenue = new ArrayList<>(Collections.nCopies(currentMonth, 0L));

        // Populate the monthlyRevenue list with the actual values from the query result
        for (Object[] result : results) {
            LocalDateTime month = (LocalDateTime) result[0];
            Long revenue = (Long) result[1];

            // Extract the month number (1-12) from the result
            int monthIndex = month.getMonthValue() - 1;  // 0-based index

            // Set the revenue for the corresponding month
            monthlyRevenue.set(monthIndex, revenue);
        }

        return monthlyRevenue;
    }


}
