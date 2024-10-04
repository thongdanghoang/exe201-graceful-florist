package id.vn.thongdanghoang.graceful.mappers;


import id.vn.thongdanghoang.graceful.dtos.orders.OrderDTO;
import id.vn.thongdanghoang.graceful.dtos.orders.OrderItemDTO;
import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.entities.OrderItemEntity;
import id.vn.thongdanghoang.graceful.repositories.ProductRepository;
import id.vn.thongdanghoang.graceful.utils.JpaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.stream.Collectors;

@Component
public abstract class OrderMapperDecorator implements OrderMapper {

    @Autowired
    @Qualifier("delegate")
    private OrderMapper delegate;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public OrderDTO toOrderDTO(OrderEntity orderEntity) {
        var orderDTO = delegate.toOrderDTO(orderEntity);
        if (Objects.nonNull(orderEntity.getUser())) {
            orderDTO.setUser(userMapper.toUserDto(orderEntity.getUser()));
        }
        if(JpaUtils.isInitialized(orderEntity.getOrderItems()) && !orderEntity.getOrderItems().isEmpty()) {
            orderDTO.setOrderItems(orderEntity
                    .getOrderItems().stream()
                    .map(this::toOrderItemDTO)
                    .collect(Collectors.toSet()));
        }
        return orderDTO;
    }

    @Override
    public OrderItemDTO toOrderItemDTO(OrderItemEntity orderItemEntity) {
        var orderItemDTO = delegate.toOrderItemDTO(orderItemEntity);
        if (Objects.nonNull(orderItemEntity.getProduct())) {
            orderItemDTO.setProduct(productMapper
                    .toProductDTO(productRepository
                            .findById(orderItemEntity.getProduct().getId()).orElseThrow()));
        }
        return orderItemDTO;
    }
}
