package id.vn.thongdanghoang.graceful.services.impl;

import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.entities.ShippingPriceEntity;
import id.vn.thongdanghoang.graceful.repositories.CartRepository;
import id.vn.thongdanghoang.graceful.repositories.OrderRepository;
import id.vn.thongdanghoang.graceful.repositories.ShippingPriceRepository;
import id.vn.thongdanghoang.graceful.services.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn = Throwable.class)
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ShippingPriceRepository shippingPriceRepository;

    @Override
    public OrderEntity createPayment(OrderEntity orderEntity) {
        var entity = orderRepository.save(orderEntity);
        entity.getOrderItems().forEach(cartItemEntity -> {
            cartRepository.deleteByUserIdAndProductId(entity.getUser().getId(), cartItemEntity.getProduct().getId());
        });
        return entity;
    }

    @Override
    public ShippingPriceEntity getRandomShippingPrice() {
        return shippingPriceRepository.findAll().stream().findAny().orElseThrow();
    }
}
