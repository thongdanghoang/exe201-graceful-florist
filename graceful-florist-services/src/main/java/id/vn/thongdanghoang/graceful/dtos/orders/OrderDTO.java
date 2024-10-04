package id.vn.thongdanghoang.graceful.dtos.orders;

import id.vn.thongdanghoang.graceful.dtos.AbstractAuditableDTO;
import id.vn.thongdanghoang.graceful.dtos.users.UserDTO;
import id.vn.thongdanghoang.graceful.entities.OrderItemEntity;
import id.vn.thongdanghoang.graceful.enums.OrderStatus;
import id.vn.thongdanghoang.graceful.enums.PaymentMethod;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderDTO extends AbstractAuditableDTO {

    @NotNull
    private UserDTO user;

    private Set<OrderItemDTO> orderItems = new HashSet<>();

    @NotNull
    private OrderStatus status;
    private long totalPrice;
    private String senderName;
    private String senderPhone;
    private String recipientName;
    private String recipientPhone;
    private String recipientAddress;
    private PaymentMethod paymentMethod;
    @Column(name = "message")
    private String message;
    private LocalDate deliveryDate;
    private LocalTime deliveryTimeFrom;
    private LocalTime deliveryTimeTo;
}
