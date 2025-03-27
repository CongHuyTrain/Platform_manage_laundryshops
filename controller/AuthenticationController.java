package main.chgu.controller;

import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import main.chgu.dto.response.ApiReponse;
import main.chgu.dto.request.AuthenticationRequest;
import main.chgu.dto.request.IntrospectRequest;
import main.chgu.dto.response.AuthenticationResponse;
import main.chgu.dto.response.IntrospectResponse;
import main.chgu.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/token")
    ApiReponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        var result = authenticationService.authenticate(request);
        return ApiReponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/introspect")
    ApiReponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiReponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }



}
