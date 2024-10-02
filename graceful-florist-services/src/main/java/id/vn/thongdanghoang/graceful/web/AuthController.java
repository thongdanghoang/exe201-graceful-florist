package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.AuthRequest;
import id.vn.thongdanghoang.graceful.dtos.RegisterRequest;
import id.vn.thongdanghoang.graceful.dtos.TokenResponse;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import id.vn.thongdanghoang.graceful.enums.UserRole;
import id.vn.thongdanghoang.graceful.securities.jwt.JwtService;
import id.vn.thongdanghoang.graceful.securities.services.UserSecurityService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserSecurityService service;
    private final JwtService jwtService;

    @PostMapping("/sign-in")
    public TokenResponse signIn(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password())
        );
        if (authentication.isAuthenticated()) {
            return new TokenResponse(jwtService.generateToken(authRequest.username()));
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @PostMapping("/sign-up")
    public String signUp(@RequestBody RegisterRequest user) {
        UserEntity register = UserEntity.register(user.username(), user.password());
        service.addUser(register);
        return "User registered successfully";
    }
}


