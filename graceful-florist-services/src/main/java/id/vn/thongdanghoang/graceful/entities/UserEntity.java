package id.vn.thongdanghoang.graceful.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NamedEntityGraph(
        name = UserEntity.USER_AUTHORITIES_ENTITY_GRAPH,
        attributeNodes = {
                @NamedAttributeNode("authorities")
        }
)
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users", schema = "graceful")
public class UserEntity extends AbstractAuditableEntity {

    public static final String USER_AUTHORITIES_ENTITY_GRAPH = "user-authorities-entity-graph";

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @Fetch(FetchMode.SUBSELECT)
    @JoinTable(
            name = "users_authorities",
            schema = "graceful",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id")
    )
    private Set<AuthorityEntity> authorities = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    private List<CartItemEntity> cartItems = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<OrderEntity> orders = new ArrayList<>();

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "address")
    private String address;

    public static UserEntity register(String username, String password, String fullName) {
        UserEntity user = new UserEntity();
        user.setUsername(username);
        user.setPassword(password);
        String firstName = fullName.split(" ")[0];
        String lastName = fullName.substring(firstName.length()).trim();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        return user;
    }

    public void addAuthority(AuthorityEntity authority) {
        authorities.add(authority);
    }
}