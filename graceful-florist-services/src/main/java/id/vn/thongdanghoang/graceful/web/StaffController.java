package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.SearchCriteriaDto;
import id.vn.thongdanghoang.graceful.dtos.SearchResultDto;
import id.vn.thongdanghoang.graceful.dtos.orders.OrderDTO;
import id.vn.thongdanghoang.graceful.mappers.CommonMapper;
import id.vn.thongdanghoang.graceful.mappers.OrderMapper;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import id.vn.thongdanghoang.graceful.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/staffs")
@PreAuthorize("hasRole('STAFF')")
@RestController
@RequiredArgsConstructor
public class StaffController {

    private final OrderService orderService;
    private final CommonMapper commonMapper;
    private final OrderMapper orderMapper;

    @PostMapping("/orders")
    public ResponseEntity<SearchResultDto<OrderDTO>> staffOrders(@RequestBody SearchCriteriaDto<Void> searchCriteriaDto) {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var pageable = commonMapper
                .toPageable(searchCriteriaDto.getPage(), searchCriteriaDto.getSort());
        var staffOrders = orderService
                .staffOrders(securityUser.getUserEntity(), pageable);
        var results = staffOrders
                .getContent().stream()
                .map(orderMapper::toOrderDTO)
                .toList();
        var searchResult = SearchResultDto
                .of(results, staffOrders.getTotalElements());
        return ResponseEntity.ok(searchResult);
    }

    @PostMapping("/pending-orders")
    public ResponseEntity<SearchResultDto<OrderDTO>> searchPendingOrders(@RequestBody SearchCriteriaDto<Void> searchCriteriaDto) {
        var pageable = commonMapper
                .toPageable(searchCriteriaDto.getPage(), searchCriteriaDto.getSort());
        var staffOrders = orderService
                .staffSearchPendingOrders(pageable);
        var results = staffOrders
                .getContent().stream()
                .map(orderMapper::toOrderDTO)
                .toList();
        var searchResult = SearchResultDto
                .of(results, staffOrders.getTotalElements());
        return ResponseEntity.ok(searchResult);
    }

    @PutMapping("/orders/{orderId}")
    public ResponseEntity<OrderDTO> receiveOrder(@PathVariable UUID orderId) {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var staffOrder = orderService
                .staffReceiveOrder(orderId, securityUser.getUserEntity());
        return ResponseEntity.ok(orderMapper.toOrderDTO(staffOrder));
    }

}
