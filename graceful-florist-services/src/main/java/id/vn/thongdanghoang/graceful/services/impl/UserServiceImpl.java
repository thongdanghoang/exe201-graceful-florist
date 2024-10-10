package id.vn.thongdanghoang.graceful.services.impl;

import id.vn.thongdanghoang.graceful.entities.UserEntity;
import id.vn.thongdanghoang.graceful.repositories.UserRepository;
import id.vn.thongdanghoang.graceful.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(rollbackOn = Throwable.class)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Page<UserEntity> getStaffs(Pageable pageable) {
        return userRepository.findAllStaffs(pageable);
    }

    @Override
    public Optional<UserEntity> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteStaff(UUID id) {
        userRepository.deleteById(id);
    }
}
