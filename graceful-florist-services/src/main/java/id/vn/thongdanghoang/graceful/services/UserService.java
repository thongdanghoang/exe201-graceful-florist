package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.entities.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;

public interface UserService {

    Page<UserEntity> getStaffs(Pageable pageable);

    Optional<UserEntity> getUserById(UUID id);

    void deleteStaff(UUID id);

}
