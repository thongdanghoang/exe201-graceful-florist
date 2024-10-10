package id.vn.thongdanghoang.graceful.enums;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
public enum UserRole {
    ROLE_USER(RoleNameConstant.USER),
    ROLE_ADMIN(RoleNameConstant.ADMIN),
    ROLE_STAFF(RoleNameConstant.STAFF);

    private final String roleValue;

    public static UserRole fromValue(String value) {
        return Arrays.stream(UserRole.values())
                .filter(role -> StringUtils.equals(role.getRoleValue(), value))
                .findAny()
                .orElse(null);
    }

    public static final class RoleNameConstant {
        public static final String USER = "USER";
        public static final String ADMIN = "ADMIN";
        public static final String STAFF = "STAFF";

        private RoleNameConstant() {
        }
    }
}
