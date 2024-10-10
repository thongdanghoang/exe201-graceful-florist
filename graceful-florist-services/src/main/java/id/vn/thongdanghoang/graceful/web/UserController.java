package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.users.UserDetailDTO;
import id.vn.thongdanghoang.graceful.mappers.UserMapper;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;

    @GetMapping()
    public ResponseEntity<UserDetailDTO> userProfile() {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var userDetail = userMapper
                .toUserDetail(securityUser.getUserEntity());
        return ResponseEntity.ok(userDetail);
    }

}
