package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.payments.PaymentDTO;
import id.vn.thongdanghoang.graceful.entities.OrderItemEntity;
import id.vn.thongdanghoang.graceful.enums.OrderStatus;
import id.vn.thongdanghoang.graceful.mappers.OrderMapper;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import id.vn.thongdanghoang.graceful.services.PaymentService;
import id.vn.thongdanghoang.graceful.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RequestMapping("/payments")
@RestController
@RequiredArgsConstructor
public class PaymentController {

    private final ProductService productService;
    private final PaymentService paymentService;
    private final OrderMapper orderMapper;

    @PostMapping
    public ResponseEntity<PaymentDTO> createPayment(@RequestBody @Valid PaymentDTO paymentDTO) {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var orderEntity = orderMapper.payment(paymentDTO);
        orderEntity.setUser(securityUser.getUserEntity());
        orderEntity.setStatus(OrderStatus.PENDING);
        var itemEntities = paymentDTO
                .getProducts().stream()
                .map(cartItemDTO -> {
                    var productEntity = productService
                            .getProductById(cartItemDTO.product().getId()).orElseThrow();
                    if (productEntity.getQuantity() - cartItemDTO.quantity() < 0) {
                        throw new RuntimeException("Not enough quantity");
                    }
                    productEntity.setPurchases(productEntity.getPurchases() + cartItemDTO.quantity());
                    productEntity.setQuantity(productEntity.getQuantity() - cartItemDTO.quantity());
                    if (productEntity.getQuantity() == 0) {
                        productEntity.setEnabled(false);
                    }
                    productEntity = productService.updateProduct(productEntity);
                    return OrderItemEntity.of(
                            orderEntity,
                            productEntity,
                            cartItemDTO.quantity(),
                            productEntity.getPrice(),
                            productEntity.getPrice() * cartItemDTO.quantity()
                    );
                })
                .collect(Collectors.toSet());
        orderEntity.setOrderItems(itemEntities);
        var totalPrice= Math.round(itemEntities.stream().mapToDouble(OrderItemEntity::getTotalPrice).sum())
                + paymentDTO.getRecipient().getShippingPrice().getPrice();
        orderEntity.setTotalPrice(totalPrice);
        var orderSaved = paymentService.createPayment(orderEntity);
        return ResponseEntity.ok(orderMapper.toPaymentDTO(orderSaved));
    }

}
