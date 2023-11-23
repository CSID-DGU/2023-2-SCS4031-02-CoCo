package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Inquiry;
import trizzle.trizzlebackend.service.InquiryService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;
    @Value("${jwt.secret}")
    private String secretKey;

    @PostMapping("/")
    public ResponseEntity postInquiry(@RequestBody Inquiry inquiry) {
        inquiryService.insertInquiry(inquiry);
        String message = "success";
        return ResponseEntity.ok().body("{\"message\": \"" + message + "\"}");
    };

    @GetMapping("/")
    public ResponseEntity getInquiries() {
        List<Inquiry> inquiries = inquiryService.findAllInquiry();
        return ResponseEntity.ok().body(inquiries);
    }

}
