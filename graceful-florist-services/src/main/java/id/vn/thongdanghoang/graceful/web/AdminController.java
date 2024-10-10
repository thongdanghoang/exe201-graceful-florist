package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.admin.ReportDTO;
import id.vn.thongdanghoang.graceful.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequiredArgsConstructor
public class AdminController {

    private final OrderService orderService;

    @GetMapping("/reports")
    public ResponseEntity<ReportDTO> adminProfile() {
        return ResponseEntity.ok(ReportDTO.builder()
                .totalRevenue(orderService.totalRevenue())
                .totalRevenueLastWeek(orderService.totalRevenueLastWeek())
                .thisMonthRevenue(orderService.thisMonthRevenue())
                .thisYearRevenue(orderService.thisYearRevenue())
                .totalOrders(orderService.totalOrders())
                .totalOrdersLastWeek(orderService.totalOrdersLastWeek())
                .totalOrdersPendingLastWeek(orderService.totalOrdersPendingLastWeek())
                .totalOrdersPending(orderService.totalOrdersPending())
                .build());
    }

}
