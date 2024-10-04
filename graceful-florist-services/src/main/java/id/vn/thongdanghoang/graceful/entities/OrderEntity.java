package id.vn.thongdanghoang.graceful.entities;

import id.vn.thongdanghoang.graceful.enums.OrderStatus;
import id.vn.thongdanghoang.graceful.enums.PaymentMethod;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NamedEntityGraph(
        name = OrderEntity.ORDER_MANAGEMENT_ENTITY_GRAPH,
        attributeNodes = {
                @NamedAttributeNode("orderItems"),
                @NamedAttributeNode("user"),
        }
)
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "orders", schema = "graceful")
public class OrderEntity  extends AbstractAuditableEntity {

    public static final String ORDER_MANAGEMENT_ENTITY_GRAPH = "order-management-entity-graph";

    @NotNull
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private UserEntity user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "shipping_price_id")
    private ShippingPriceEntity shippingPrice;

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private PromotionEntity promotion;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private Set<OrderItemEntity> orderItems = new HashSet<>();

    @NotNull
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name = "total_price")
    private long totalPrice;

    @Column(name = "sender_name")
    private String senderName;

    @Column(name = "sender_phone")
    private String senderPhone;

    @Column(name = "recipient_name")
    private String recipientName;

    @Column(name = "recipient_phone")
    private String recipientPhone;

    @Column(name = "recipient_address")
    private String recipientAddress;

    @Column(name = "payment_method")
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

}
