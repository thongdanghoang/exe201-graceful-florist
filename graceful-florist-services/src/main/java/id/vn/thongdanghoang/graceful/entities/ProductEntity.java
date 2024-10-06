package id.vn.thongdanghoang.graceful.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@NamedEntityGraph(
        name = ProductEntity.PRODUCT_DETAIL_ENTITY_GRAPH,
        attributeNodes = {
                @NamedAttributeNode("categories"),
                @NamedAttributeNode("ingredients")
        }
)
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "products", schema = "graceful")
public class ProductEntity extends AbstractAuditableEntity {

    public static final String PRODUCT_DETAIL_ENTITY_GRAPH = "product-detail-entity-graph";

    @ManyToMany
    @Fetch(FetchMode.SUBSELECT)
    @JoinTable(
            name = "products_categories",
            schema = "graceful",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<CategoryEntity> categories = new HashSet<>();

    @ManyToMany
    @Fetch(FetchMode.SUBSELECT)
    @JoinTable(
            name = "products_ingredients",
            schema = "graceful",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<IngredientEntity> ingredients = new HashSet<>();

    @Column(name = "images")
    private String images;

    @Column(name = "main_image")
    private UUID mainImage;

    @NotNull
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "price")
    private int price;

    @Column(name = "enabled")
    private boolean enabled;
}
