package id.vn.thongdanghoang.graceful.mappers;

import id.vn.thongdanghoang.graceful.dtos.admin.StaffDTO;
import id.vn.thongdanghoang.graceful.dtos.users.UserDTO;
import id.vn.thongdanghoang.graceful.dtos.users.UserDetailDTO;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserDTO toUserDto(UserEntity orderEntity);

    @Mapping(target = "password", ignore = true)
    StaffDTO toStaffDto(UserEntity orderEntity);

    UserDetailDTO toUserDetail(UserEntity orderEntity);
}
