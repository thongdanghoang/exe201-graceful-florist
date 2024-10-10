package id.vn.thongdanghoang.graceful.web;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/staffs")
@PreAuthorize("hasRole('STAFF')")
@RestController
@RequiredArgsConstructor
public class StaffController {

}
