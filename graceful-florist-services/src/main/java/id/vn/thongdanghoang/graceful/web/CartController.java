package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.carts.CartItemDTO;
import id.vn.thongdanghoang.graceful.dtos.carts.CartItemRequest;
import id.vn.thongdanghoang.graceful.entities.CartItemEntity;
import id.vn.thongdanghoang.graceful.mappers.ProductMapper;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import id.vn.thongdanghoang.graceful.services.CartService;
import id.vn.thongdanghoang.graceful.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api/carts")
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final ProductService productService;
    private final ProductMapper productMapper;

    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getCartItems() {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var cart = getCartItems(securityUser.getUserEntity().getId());
        return ResponseEntity.ok(cart);
    }

    private List<CartItemDTO> getCartItems(UUID userId) {
        return cartService
                .getCartItems(userId).stream()
                .map(cartEntity -> new CartItemDTO(
                        productMapper.toProductDto(cartEntity.getProduct()),
                        cartEntity.getQuantity()))
                .toList();
    }

    @PutMapping
    public ResponseEntity<List<CartItemDTO>> addCartItem(@RequestBody CartItemRequest cartItemDto) {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var userId = securityUser.getUserEntity().getId();
        var productId = cartItemDto.product().getId();
        var cartItemOptional = cartService
                .getCartsByProductId(userId, productId);
        if (cartItemOptional.isPresent()) {
            var cartItem = cartItemOptional.get();
            if (cartItemDto.quantity() <= 0) {
                cartService.deleteCartItem(userId, productId);
                return ResponseEntity.ok(getCartItems(userId));
            }
            cartItem.setQuantity(cartItemDto.quantity());
            cartService.saveOrUpdate(cartItem);
            return ResponseEntity.ok(getCartItems(userId));
        }
        var product = productService.getProductById(productId);
        if (product.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var cartItem = CartItemEntity
                .of(securityUser.getUserEntity(), product.get(), cartItemDto.quantity());
        cartService.saveOrUpdate(cartItem);
        return ResponseEntity.ok(getCartItems(userId));
    }

}
