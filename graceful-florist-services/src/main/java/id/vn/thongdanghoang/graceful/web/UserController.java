package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.users.UserDetailDTO;
import id.vn.thongdanghoang.graceful.dtos.users.UserProfileUpdateRequest;
import id.vn.thongdanghoang.graceful.mappers.UserMapper;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import id.vn.thongdanghoang.graceful.securities.services.UserSecurityService;
import id.vn.thongdanghoang.graceful.services.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;
    private final UserService userService;
    private final UserSecurityService userSecurityService;

    @GetMapping()
    public ResponseEntity<UserDetailDTO> userProfile() {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var userDetail = userMapper
                .toUserDetail(securityUser.getUserEntity());
        return ResponseEntity.ok(userDetail);
    }

    @PutMapping()
    public ResponseEntity<UserDetailDTO> updateUserProfile(@RequestBody UserProfileUpdateRequest request) {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var userEntity = securityUser.getUserEntity();
        if (Objects.nonNull(request.getCurrentPassword())
                && Objects.nonNull(request.getNewPassword())
                && Objects.nonNull(request.getConfirmPassword())
                && StringUtils.equals(request.getNewPassword(), request.getConfirmPassword())
                && userSecurityService.checkPassword(request.getCurrentPassword(), securityUser.getPassword())) {
            userEntity.setPassword(userSecurityService.encodePassword(request.getNewPassword()));
        } else {
            return ResponseEntity.badRequest().build();
        }
        userEntity = userMapper.updateProfile(userEntity, request);
        var savedUser = userService.updateUser(userEntity);
        return ResponseEntity.ok(userMapper.toUserDetail(savedUser));
    }

}
