package id.vn.thongdanghoang.graceful.entities;

import id.vn.thongdanghoang.graceful.enums.IngredientType;
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
@Table(name = "ingredients", schema = "graceful")
public class IngredientEntity extends AbstractAuditableEntity {

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "image")
    private UUID image;

    @NotNull
    @Column(name = "price")
    private int price;

    @NotNull
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private IngredientType type;

}
