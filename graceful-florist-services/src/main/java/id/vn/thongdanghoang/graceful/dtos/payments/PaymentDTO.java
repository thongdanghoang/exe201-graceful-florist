package id.vn.thongdanghoang.graceful.dtos.payments;

import id.vn.thongdanghoang.graceful.dtos.AbstractAuditableDTO;
import id.vn.thongdanghoang.graceful.dtos.carts.CartItemDTO;
import id.vn.thongdanghoang.graceful.dtos.products.ShippingPriceDTO;
import id.vn.thongdanghoang.graceful.enums.PaymentMethod;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class PaymentDTO extends AbstractAuditableDTO {
    private RecipientDTO recipient;
    private SenderDTO sender;
    private DeliveryDateTimeDTO deliveryDateTime;
    private String message;
    private PaymentMethod paymentMethod;
    private List<CartItemDTO> products;
}


