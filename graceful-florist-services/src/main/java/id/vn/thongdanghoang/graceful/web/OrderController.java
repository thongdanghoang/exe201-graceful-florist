package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.RequestWrapper;
import id.vn.thongdanghoang.graceful.dtos.SearchCriteriaDto;
import id.vn.thongdanghoang.graceful.dtos.SearchResultDto;
import id.vn.thongdanghoang.graceful.dtos.orders.OrderDTO;
import id.vn.thongdanghoang.graceful.enums.OrderStatus;
import id.vn.thongdanghoang.graceful.mappers.CommonMapper;
import id.vn.thongdanghoang.graceful.mappers.OrderMapper;
import id.vn.thongdanghoang.graceful.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("/orders")
@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final CommonMapper commonMapper;

    @PostMapping
    public ResponseEntity<SearchResultDto<OrderDTO>> searchOrders(@RequestBody SearchCriteriaDto<Void> searchCriteria) {
        var pageable = commonMapper
                .toPageable(searchCriteria.getPage(), searchCriteria.getSort());
        long total = orderService.countOrders();
        var orderEntities = orderService.searchOrders(pageable);
        var orderDTOs = orderMapper.toOrderDTOs(orderEntities);
        return ResponseEntity.ok(SearchResultDto.of(orderDTOs, total));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable UUID id) {
        var orderEntity = orderService.findOrderById(id);
        if (orderEntity.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var orderDTO = orderMapper.toOrderDTO(orderEntity.get());
        return ResponseEntity.ok(orderDTO);
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<Void> updateOrderStatus(@PathVariable UUID id, @RequestBody RequestWrapper<OrderStatus> orderStatusWrapper) {
        var orderOptional = orderService.findOrderById(id);
        if (orderOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var order = orderOptional.get();
        order.setStatus(orderStatusWrapper.getValue());
        orderService.update(order);
        return ResponseEntity.noContent().build();
    }
}
