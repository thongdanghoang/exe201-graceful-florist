package id.vn.thongdanghoang.graceful.securities.services.impl;

import id.vn.thongdanghoang.graceful.entities.CartItemEntity;
import id.vn.thongdanghoang.graceful.repositories.CartRepository;
import id.vn.thongdanghoang.graceful.securities.services.CartService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(rollbackOn = Throwable.class)
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    @Override
    public List<CartItemEntity> getCartItems(UUID userId) {
        return cartRepository
                .findByUserIdOrderByCreatedDate(userId);
    }

    @Override
    public void saveOrUpdate(CartItemEntity cartItem) {
        cartRepository.save(cartItem);
    }

    @Override
    public void deleteCartItem(UUID userId, UUID productId) {
         cartRepository.deleteByUserIdAndProductId(userId, productId);
    }


    @Override
    public Optional<CartItemEntity> getCartsByProductId(UUID userId, UUID productId) {
        return cartRepository.findByUserIdAndProductId(userId, productId);
    }

}
