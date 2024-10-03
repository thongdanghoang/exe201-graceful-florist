package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.entities.CartItemEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CartService {

    List<CartItemEntity> getCartItems(UUID userId);

    void saveOrUpdate(CartItemEntity cartItem);

    void deleteCartItem(UUID userId, UUID productId);

    Optional<CartItemEntity> getCartsByProductId(UUID userId, UUID productId);

}
