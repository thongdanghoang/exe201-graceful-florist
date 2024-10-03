package id.vn.thongdanghoang.graceful.dtos;

import jakarta.validation.constraints.NotNull;

public record AuthRequest(
        @NotNull String username,
        @NotNull String password
) {
}
