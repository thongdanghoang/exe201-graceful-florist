package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.RequestWrapper;
import id.vn.thongdanghoang.graceful.dtos.SearchCriteriaDto;
import id.vn.thongdanghoang.graceful.dtos.SearchResultDto;
import id.vn.thongdanghoang.graceful.dtos.orders.OrderCriteriaDto;
import id.vn.thongdanghoang.graceful.dtos.orders.OrderDTO;
import id.vn.thongdanghoang.graceful.dtos.orders.OrderRatingDTO;
import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.entities.OrderItemEntity;
import id.vn.thongdanghoang.graceful.entities.OrderRatingEntity;
import id.vn.thongdanghoang.graceful.entities.OrderRatingImageEntity;
import id.vn.thongdanghoang.graceful.enums.OrderStatus;
import id.vn.thongdanghoang.graceful.mappers.CommonMapper;
import id.vn.thongdanghoang.graceful.mappers.OrderMapper;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import id.vn.thongdanghoang.graceful.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.stream.Collectors;

@RequestMapping("/orders")
@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final CommonMapper commonMapper;

    @PostMapping
    public ResponseEntity<SearchResultDto<OrderDTO>> searchOrders(@RequestBody SearchCriteriaDto<OrderCriteriaDto> searchCriteria) {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var pageable = commonMapper
                .toPageable(searchCriteria.getPage(), searchCriteria.getSort());
        if (securityUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_USER"))) {
            return mappingOrderEntities(orderService.usersOrders(securityUser.getUserEntity().getId(), pageable));
        }
        return mappingOrderEntities(orderService.adminSearchOrders(searchCriteria.getCriteria(), pageable));
    }

    @NotNull
    private ResponseEntity<SearchResultDto<OrderDTO>> mappingOrderEntities(Page<OrderEntity> orderService) {
        var results = orderService
                .stream()
                .map(orderMapper::toOrderDTO)
                .toList();
        return ResponseEntity.ok(SearchResultDto.of(results, orderService.getTotalElements()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable UUID id) {
        var orderEntity = orderService
                .findOrderById(id);
        if (orderEntity.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var orderDTO = orderMapper.toOrderDTO(orderEntity.get());
        return ResponseEntity.ok(orderDTO);
    }

    @PutMapping("/{id}")
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

    @PostMapping("/{id}/rating")
    public ResponseEntity<Void> rateOrder(@PathVariable UUID id,
                                          @RequestBody OrderRatingDTO payload) {
        // prepare data
        var orderEntityOptional = orderService
                .findOrderById(id);
        if (orderEntityOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var user = securityUser.getUserEntity();
        var order = orderEntityOptional.get();
        var products = order
                .getOrderItems().stream()
                .map(OrderItemEntity::getProduct).toList();
        // mapping
        var orderRating = new OrderRatingEntity();
        var images = payload
                .images().stream()
                .map(imageId -> {
                    var image = new OrderRatingImageEntity();
                    image.setImage(imageId);
                    image.setOrderRating(orderRating);
                    return image;
                })
                .collect(Collectors.toSet());
        orderRating.setImages(images);
        orderRating.setProducts(products);
        orderRating.setOrder(order);
        orderRating.setUser(user);
        orderRating.setAnonymous(payload.anonymous());
        orderRating.setDescription(payload.description());
        orderRating.setRating(payload.rating());
        orderService.rateOrder(orderRating);
        return ResponseEntity.noContent().build();
    }
}
