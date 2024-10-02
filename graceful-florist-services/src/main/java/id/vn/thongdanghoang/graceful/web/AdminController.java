package id.vn.thongdanghoang.graceful.web;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequiredArgsConstructor
public class AdminController {

    @GetMapping("/profile")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }

}
