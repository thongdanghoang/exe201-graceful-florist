package id.vn.thongdanghoang.graceful.entities;

import id.vn.thongdanghoang.graceful.enums.CategoryType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "categories", schema = "graceful")
public class CategoryEntity extends AbstractAuditableEntity {

    @NotNull
    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private CategoryType type;

    @NotNull
    @Column(name = "name")
    private String name;

    @Column(name = "enabled")
    private boolean enabled;

}
