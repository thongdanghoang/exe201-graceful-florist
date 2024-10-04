package id.vn.thongdanghoang.graceful.mappers;

import id.vn.thongdanghoang.graceful.dtos.orders.OrderDTO;
import id.vn.thongdanghoang.graceful.dtos.orders.OrderItemDTO;
import id.vn.thongdanghoang.graceful.dtos.payments.PaymentDTO;
import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.entities.OrderItemEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
@DecoratedWith(OrderMapperDecorator.class)
public interface OrderMapper {

    @Mapping(target = "product", source = "product", ignore = true)
    OrderItemDTO toOrderItemDTO(OrderItemEntity orderItemEntity);

    @Mapping(target = "user", source = "user", ignore = true)
    @Mapping(target = "orderItems", source = "orderItems", ignore = true)
    OrderDTO toOrderDTO(OrderEntity orderEntity);

    List<OrderDTO> toOrderDTOs(List<OrderEntity> orderEntities);

    @Mapping(target = "senderName", source = "paymentDTO.sender.fullName")
    @Mapping(target = "senderPhone", source = "paymentDTO.sender.phone")
    @Mapping(target = "recipientName", source = "paymentDTO.recipient.fullName")
    @Mapping(target = "recipientPhone", source = "paymentDTO.recipient.phone")
    @Mapping(target = "recipientAddress", source = "paymentDTO", qualifiedByName = "recipientAddress")
    @Mapping(target = "deliveryDate", source = "deliveryDateTime.deliveryDate")
    @Mapping(target = "deliveryTimeFrom", source = "deliveryDateTime.deliveryTimeFrom")
    @Mapping(target = "deliveryTimeTo", source = "deliveryDateTime.deliveryTimeTo")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    OrderEntity payment(PaymentDTO paymentDTO);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "version", source = "version")
    @Mapping(target = "recipient.district", source = "recipientAddress", qualifiedByName = "district")
    @Mapping(target = "recipient.ward", source = "recipientAddress", qualifiedByName = "ward")
    @Mapping(target = "recipient.addressDetail" , source = "recipientAddress", qualifiedByName = "addressDetail")
    @InheritInverseConfiguration
    PaymentDTO toPaymentDTO(OrderEntity orderEntity);

    @Named("recipientAddress")
    default String recipientAddress(PaymentDTO paymentDTO) {
        return "%s, %s, %s".formatted(
            paymentDTO.getRecipient().getAddressDetail(),
            paymentDTO.getRecipient().getWard(),
            paymentDTO.getRecipient().getDistrict()
        ) ;
    }

    @Named("district")
    default String district(String recipientAddress) {
        return recipientAddress.split(",")[2].strip();
    }

    @Named("ward")
    default String ward(String recipientAddress) {
        return recipientAddress.split(",")[1].strip();
    }

    @Named("addressDetail")
    default String addressDetail(String recipientAddress) {
        return recipientAddress.split(",")[0].strip();
    }

}
