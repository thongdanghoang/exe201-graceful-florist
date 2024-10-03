package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.ShippingPriceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ShippingPriceRepository extends JpaRepository<ShippingPriceEntity, UUID> {

}

