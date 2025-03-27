package main.chgu.controller;

import main.chgu.dto.response.ApiReponse;
import main.chgu.dto.request.PermissionRequest;
import main.chgu.dto.response.PermissionResponse;
import main.chgu.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/permissions")
public class PermissionController {
    @Autowired
    private PermissionService permissionService;

    @PostMapping
    ApiReponse<PermissionResponse> create(@RequestBody PermissionRequest request){
        return ApiReponse.<PermissionResponse>builder()
                .result(permissionService.creat(request))
                .build();
    }

    @GetMapping
    ApiReponse<List<PermissionResponse>> getAll(){
        return ApiReponse.<List<PermissionResponse>>builder()
                .result(permissionService.getAll())
                .build();
    }

    @DeleteMapping("/{permission}")
    ApiReponse<Void> delete(@PathVariable String permission){
        permissionService.delete(permission);
        return ApiReponse.<Void>builder().build();
    }
}
