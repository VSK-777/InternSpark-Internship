package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.SignupRequest;
import com.example.demo.dto.JwtResponse;
import com.example.demo.dto.TokenRefreshRequest;
import com.example.demo.dto.TokenRefreshResponse;
import com.example.demo.entity.RefreshToken;
import com.example.demo.entity.User;
import com.example.demo.exception.TokenRefreshException;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtils;
import com.example.demo.security.UserDetailsImpl;
import com.example.demo.service.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        System.out.println("1. Request reaches controller. POST /api/auth/login");
        System.out.println("2. Request DTO values: email=" + loginRequest.getEmail());
        
        try {
            System.out.println("3. Invoking AuthenticationManager...");
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            
            System.out.println("4. AuthenticationManager result: Success");
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            System.out.println("5. User lookup result: Found user ID " + userDetails.getId());
            
            String jwt = jwtUtils.generateJwtToken(userDetails);
            System.out.println("6. JWT generation successful.");
            
            System.out.println("7. Attempting to generate RefreshToken in DB...");
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());
            System.out.println("8. RefreshToken generated successfully.");

            System.out.println("9. Returning HTTP 200 OK");
            return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken(), userDetails.getId(),
                    userDetails.getEmail(), userDetails.getFirstName(), userDetails.getLastName()));
        } catch (Exception e) {
            System.out.println("EXCEPTION IN LOGIN FLOW:");
            System.out.println("- Exception type: " + e.getClass().getName());
            System.out.println("- Message: " + e.getMessage());
            e.printStackTrace();
            throw e; // rethrow to let GlobalExceptionHandler handle it
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error: Email is already in use!");
            return ResponseEntity.status(org.springframework.http.HttpStatus.CONFLICT).body(response);
        }

        User user = User.builder()
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .build();

        userRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getEmail());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Log out successful!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String, Object> response = new HashMap<>();
        response.put("id", userDetails.getId());
        response.put("email", userDetails.getEmail());
        response.put("firstName", userDetails.getFirstName());
        response.put("lastName", userDetails.getLastName());
        return ResponseEntity.ok(response);
    }
}
