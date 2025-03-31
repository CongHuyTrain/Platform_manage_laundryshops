package main.laundryshop.controllers;

import lombok.RequiredArgsConstructor;
import main.laundryshop.dto.request.ApiResponse;
import main.laundryshop.dto.request.PermissionRequest;
import main.laundryshop.dto.request.RoleRequest;
import main.laundryshop.dto.response.PermissionResponse;
import main.laundryshop.dto.response.RoleResponse;
import main.laundryshop.service.PermissionService;
import main.laundryshop.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {
    @Autowired
    private RoleService roleService;

    @PostMapping
    public ApiResponse<RoleResponse> create(@RequestBody RoleRequest request){
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.create(request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<RoleResponse>> getAll(){
        return ApiResponse.<List<RoleResponse>>builder()
                .result(roleService.getAll())
                .build();
    }

    @DeleteMapping("/{role}")
    public ApiResponse<Void> delete(@PathVariable String role){
        roleService.delete(role);
        return ApiResponse.<Void>builder().build();
    }
}