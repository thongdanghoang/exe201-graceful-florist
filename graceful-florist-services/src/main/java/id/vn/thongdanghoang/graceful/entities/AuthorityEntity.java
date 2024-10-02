package id.vn.thongdanghoang.graceful.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "authorities", schema = "graceful")
public class AuthorityEntity extends AbstractBaseEntity {

    @Column(name = "name", length = 64, nullable = false, unique = true)
    private String name;
}
