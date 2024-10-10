package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.SearchCriteriaDto;
import id.vn.thongdanghoang.graceful.dtos.SearchResultDto;
import id.vn.thongdanghoang.graceful.dtos.admin.ReportDTO;
import id.vn.thongdanghoang.graceful.dtos.admin.StaffDTO;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import id.vn.thongdanghoang.graceful.mappers.CommonMapper;
import id.vn.thongdanghoang.graceful.mappers.UserMapper;
import id.vn.thongdanghoang.graceful.securities.services.UserSecurityService;
import id.vn.thongdanghoang.graceful.services.OrderService;
import id.vn.thongdanghoang.graceful.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.UUID;

@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequiredArgsConstructor
public class AdminController {

    private final OrderService orderService;
    private final UserService userService;
    private final UserSecurityService userSecurityService;
    private final UserMapper userMapper;
    private final CommonMapper commonMapper;

    @GetMapping("/reports")
    public ResponseEntity<ReportDTO> reports() {
        return ResponseEntity.ok(ReportDTO.builder()
                .totalRevenue(orderService.totalRevenue())
                .totalRevenueLastWeek(orderService.totalRevenueLastWeek())
                .thisMonthRevenue(orderService.thisMonthRevenue())
                .thisYearRevenue(orderService.thisYearRevenue())
                .totalOrders(orderService.totalOrders())
                .totalOrdersLastWeek(orderService.totalOrdersLastWeek())
                .totalOrdersPendingLastWeek(orderService.totalOrdersPendingLastWeek())
                .totalOrdersPending(orderService.totalOrdersPending())
                .build());
    }

    @PostMapping("/users")
    public ResponseEntity<SearchResultDto<StaffDTO>> users(@RequestBody SearchCriteriaDto<Void> searchCriteriaDto) {
        var pageable = commonMapper
                .toPageable(searchCriteriaDto.getPage(), searchCriteriaDto.getSort());
        var users = userService.getStaffs(pageable);
        var results = users
                .getContent().stream()
                .map(userMapper::toStaffDto)
                .toList();
        var totalElements = users.getTotalElements();
        return ResponseEntity.ok(
                SearchResultDto.of(results, totalElements));
    }

    @PutMapping("/users")
    public ResponseEntity<StaffDTO> saveOrUpdate(@RequestBody StaffDTO userDTO) {
        if(Objects.nonNull(userDTO.getId())){
            var user = userService
                    .getUserById(userDTO.getId());
            if(user.isEmpty()){
                return ResponseEntity.notFound().build();
            }
            var userEntity = user.get();
            userEntity.setFirstName(userDTO.getFirstName());
            userEntity.setLastName(userDTO.getLastName());
            userEntity.setPassword(userDTO.getPassword());
            var persistedUser = userSecurityService.saveOrUpdateStaff(userEntity);
            return ResponseEntity.ok(userMapper.toStaffDto(persistedUser));
        }
        var user = UserEntity.register(
                userDTO.getUsername(),
                userDTO.getPassword(),
                "%s %s".formatted(userDTO.getFirstName(), userDTO.getLastName())
        );
        var persistedUser = userSecurityService.saveOrUpdateStaff(user);
        return ResponseEntity.ok(userMapper.toStaffDto(persistedUser));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        var user = userService.getUserById(id);
        if(user.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        userService.deleteStaff(user.get().getId());
        return ResponseEntity.noContent().build();
    }

}
