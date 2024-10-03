package id.vn.thongdanghoang.graceful.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "order_items", schema = "graceful")
public class OrderItemEntity extends AbstractBaseEntity {

    @NotNull
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private OrderEntity order;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "total_price", nullable = false)
    private int totalPrice;

    public static OrderItemEntity of(OrderEntity order, ProductEntity product, int quantity, int price, int totalPrice) {
        var orderItemEntity = new OrderItemEntity();
        orderItemEntity.setOrder(order);
        orderItemEntity.setProduct(product);
        orderItemEntity.setQuantity(quantity);
        orderItemEntity.setPrice(price);
        orderItemEntity.setTotalPrice(totalPrice);
        return orderItemEntity;
    }

}
