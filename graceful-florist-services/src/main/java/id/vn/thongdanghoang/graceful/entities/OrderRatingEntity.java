package id.vn.thongdanghoang.graceful.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NamedEntityGraph(
        name = OrderRatingEntity.COMMENT_ENTITY_GRAPH,
        attributeNodes = {
                @NamedAttributeNode("images"),
                @NamedAttributeNode("user"),
        }
)
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "order_rating", schema = "graceful")
public class OrderRatingEntity extends AbstractAuditableEntity {

    public static final String COMMENT_ENTITY_GRAPH = "productRating.images";

    @OneToMany(mappedBy = "orderRating", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @Fetch(FetchMode.SUBSELECT)
    private Set<OrderRatingImageEntity> images = new HashSet<>();

    @OneToMany
    @JoinTable(
            name = "order_rating_product",
            schema = "graceful",
            joinColumns = @JoinColumn(name = "order_rating_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @Fetch(FetchMode.SUBSELECT)
    private List<ProductEntity> products;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private OrderEntity order;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "rating")
    private int rating;

    @NotNull
    @Column(name = "anonymous")
    private boolean anonymous;
}
