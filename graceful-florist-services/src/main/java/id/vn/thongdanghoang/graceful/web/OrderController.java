package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.SearchCriteriaDto;
import id.vn.thongdanghoang.graceful.dtos.SearchResultDto;
import id.vn.thongdanghoang.graceful.dtos.orders.OrderDTO;
import id.vn.thongdanghoang.graceful.mappers.OrderMapper;
import id.vn.thongdanghoang.graceful.mappers.ProductMapper;
import id.vn.thongdanghoang.graceful.mappers.UserMapper;
import id.vn.thongdanghoang.graceful.services.OrderService;
import id.vn.thongdanghoang.graceful.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;


    @PostMapping
    public ResponseEntity<SearchResultDto<OrderDTO>> searchOrders(@RequestBody SearchCriteriaDto<Void> searchCriteria) {
        long total = orderService.countOrders();
        var orderEntities = orderService.searchOrders();
        var orderDTOs = orderMapper.toOrderDTOs(orderEntities);
        return ResponseEntity.ok(SearchResultDto.of(orderDTOs, total));
    }
}
