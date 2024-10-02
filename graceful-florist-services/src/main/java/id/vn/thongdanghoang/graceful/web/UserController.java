package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.RegisterRequest;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import id.vn.thongdanghoang.graceful.securities.services.UserSecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserSecurityService service;

    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile() {
        return "Welcome to User Profile";
    }

    @PostMapping("/sign-up")
    public String addNewUser(@RequestBody RegisterRequest user) {
        UserEntity register = UserEntity.register(user.username(), user.password());
        service.addUser(register);
        return "User registered successfully";
    }

}
