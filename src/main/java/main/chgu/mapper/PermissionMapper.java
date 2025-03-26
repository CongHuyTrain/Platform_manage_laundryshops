package main.chgu.mapper;

import main.chgu.dto.request.PermissionRequest;
import main.chgu.dto.response.PermissionResponse;
import main.chgu.models.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);
    PermissionResponse toPermissionResponse(Permission permission);
}
