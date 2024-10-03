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
@Table(name = "transactions", schema = "graceful")
public class TransactionEntity extends AbstractAuditableEntity {

    @NotNull
    @OneToOne
    @JoinColumn(name = "order_id")
    private OrderEntity order;
}
