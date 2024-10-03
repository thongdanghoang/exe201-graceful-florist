package id.vn.thongdanghoang.graceful.dtos;

import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
        @NotNull String username,
        @NotNull String password,
        @NotNull String fullName
) {
}
