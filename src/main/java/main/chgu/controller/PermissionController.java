package main.chgu.controller;

import main.chgu.dto.response.ApiReponse;
import main.chgu.dto.request.PermissionRequest;
import main.chgu.dto.response.PermissionResponse;
import main.chgu.service.PermissionService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/permissions")
public class PermissionController {
    private PermissionService permissionService;

    @PostMapping
    private ApiReponse<PermissionResponse> createPermission(@RequestBody PermissionRequest request){
        return ApiReponse.<PermissionResponse>builder()
                .result(permissionService.createPermission(request))
                .build();
    }

    @GetMapping
    private ApiReponse<List<PermissionResponse>> getAll(){
        return ApiReponse.<List<PermissionResponse>>builder()
                .result(permissionService.getAll())
                .build();
    }

    @DeleteMapping
    private ApiReponse<Void> delete(@PathVariable String permission){
        permissionService.delete(permission);
        return ApiReponse.<Void>builder().build();
    }
}
