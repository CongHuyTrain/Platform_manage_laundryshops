package main.laundryshop.mapper;

import main.laundryshop.dto.request.PermissionRequest;
import main.laundryshop.dto.response.PermissionResponse;
import main.laundryshop.models.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);
    PermissionResponse toPermissionResponse(Permission permission);
}
