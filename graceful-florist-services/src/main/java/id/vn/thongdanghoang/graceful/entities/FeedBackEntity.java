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
@Table(name = "feedbacks", schema = "graceful")
public class FeedBackEntity  extends AbstractAuditableEntity {

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @OneToOne
    @JoinColumn(name = "reply_id")
    private FeedBackEntity reply;

    @NotNull
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "rating")
    private int rating;

}
