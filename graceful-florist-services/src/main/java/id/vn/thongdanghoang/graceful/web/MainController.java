package id.vn.thongdanghoang.graceful.web;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class MainController {

    @GetMapping
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

}
