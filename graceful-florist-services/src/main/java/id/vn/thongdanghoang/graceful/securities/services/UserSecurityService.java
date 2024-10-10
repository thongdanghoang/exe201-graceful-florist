package id.vn.thongdanghoang.graceful.securities.services;

import id.vn.thongdanghoang.graceful.entities.AuthorityEntity;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import id.vn.thongdanghoang.graceful.enums.UserRole;
import id.vn.thongdanghoang.graceful.repositories.UserRepository;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackOn = Throwable.class)
public class UserSecurityService implements UserDetailsService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;

    @Override
    public SecurityUser loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> userDetail = repository.findByUsernameWithAuthorities(username);

        // Converting UserInfo to UserDetails
        return userDetail
                .map(SecurityUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public void addUser(UserEntity userEntity) {
        Optional<AuthorityEntity> roleUser = repository
                .findUserRoleByRoleName(UserRole.ROLE_USER.name());
        roleUser.ifPresent(userEntity::addAuthority);
        // Encode password before saving the user
        userEntity.setPassword(encoder.encode(userEntity.getPassword()));
        repository.save(userEntity);
    }

    public UserEntity saveOrUpdateStaff(UserEntity userEntity) {
        if (Objects.isNull(userEntity.getId())) {
            var staffRole = repository
                    .findUserRoleByRoleName(UserRole.ROLE_STAFF.name());
            staffRole.ifPresent(userEntity::addAuthority);
        }
        // Encode password before saving the user
        userEntity.setPassword(encoder.encode(userEntity.getPassword()));
        return repository.save(userEntity);
    }
}

