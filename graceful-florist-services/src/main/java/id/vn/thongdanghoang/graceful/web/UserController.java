package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.securities.services.UserSecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/users")
@PreAuthorize("hasRole('USER')")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserSecurityService service;

    @GetMapping("/profile")
    public String userProfile() {
        return "Welcome to User Profile";
    }

}
