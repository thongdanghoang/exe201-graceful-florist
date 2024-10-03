package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.AuthRequest;
import id.vn.thongdanghoang.graceful.dtos.RegisterRequest;
import id.vn.thongdanghoang.graceful.dtos.TokenResponse;
import id.vn.thongdanghoang.graceful.entities.AuthorityEntity;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import id.vn.thongdanghoang.graceful.repositories.UserRepository;
import id.vn.thongdanghoang.graceful.securities.jwt.JwtService;
import id.vn.thongdanghoang.graceful.securities.services.UserSecurityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserSecurityService service;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/sign-in")
    public TokenResponse signIn(@RequestBody @Valid AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password())
        );
        Optional<UserEntity> userEntity = userRepository.findByUsernameWithAuthorities(authRequest.username());
        if (authentication.isAuthenticated() && userEntity.isPresent()) {
            UserEntity user = userEntity.get();
            Set<String> roles = user
                    .getAuthorities()
                    .stream()
                    .map(AuthorityEntity::getName)
                    .collect(Collectors.toSet());
            return new TokenResponse(jwtService.generateToken(user.getUsername(), roles, user.getId()));
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody @Valid RegisterRequest user) {
        UserEntity register = UserEntity.register(user.username(), user.password(), user.fullName());
        service.addUser(register);
        return ResponseEntity.ok().build();
    }
}


