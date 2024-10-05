package id.vn.thongdanghoang.graceful.mappers;

import id.vn.thongdanghoang.graceful.dtos.SearchPageDto;
import id.vn.thongdanghoang.graceful.dtos.SortDto;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Objects;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommonMapper {

    default Pageable toPageable(SearchPageDto searchPageDto, SortDto sortDto) {
        var pageNumber = 0;
        var pageSize = 100;
        if (Objects.nonNull(searchPageDto)) {
            pageNumber = searchPageDto.getPageNumber();
            pageSize = searchPageDto.getPageSize();
        }
        if (Objects.nonNull(sortDto)
                && StringUtils.isNotBlank(sortDto.getColumn())
                && StringUtils.isNotBlank(sortDto.getDirection())) {
            var direction = StringUtils
                    .equalsIgnoreCase(sortDto.getDirection(), SortDto.ASC)
                    ? Sort.Direction.ASC
                    : Sort.Direction.DESC;
            return PageRequest.of(pageNumber, pageSize, Sort.by(direction, sortDto.getColumn()));
        }
        return PageRequest.of(pageNumber, pageSize);
    }

}
