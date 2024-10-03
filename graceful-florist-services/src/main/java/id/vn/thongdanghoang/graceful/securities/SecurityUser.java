package id.vn.thongdanghoang.graceful.securities;

import id.vn.thongdanghoang.graceful.entities.AuthorityEntity;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class SecurityUser implements UserDetails {

    private final UserEntity userEntity;
    private final String username;
    private final String password;
    private final List<GrantedAuthority> authorities;

    public SecurityUser(UserEntity userEntity) {
        this.userEntity = userEntity;
        this.username = userEntity.getUsername(); // Assuming 'name' is used as 'username'
        this.password = userEntity.getPassword();
        this.authorities = userEntity.getAuthorities()
                .stream()
                .map(this::toGrantedAuthority)
                .collect(Collectors.toList());
    }

    private SimpleGrantedAuthority toGrantedAuthority(AuthorityEntity authority) {
        return new SimpleGrantedAuthority(authority.getName());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Implement your logic if you need this
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Implement your logic if you need this
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Implement your logic if you need this
    }

    @Override
    public boolean isEnabled() {
        return true; // Implement your logic if you need this
    }
}

