package id.vn.thongdanghoang.graceful.dtos.orders;

import java.util.List;
import java.util.UUID;

public record OrderRatingDTO(
        int rating,
        boolean anonymous,
        String description,
        List<UUID> images
) {
}
