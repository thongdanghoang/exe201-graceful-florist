package id.vn.thongdanghoang.graceful.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "order_rating_images", schema = "graceful")
public class OrderRatingImageEntity extends AbstractBaseEntity {

    @NotNull
    @ManyToOne
    @JoinColumn(name = "product_rating")
    private OrderRatingEntity orderRating;

    @NotNull
    @Column(name = "image")
    private UUID image;

}
