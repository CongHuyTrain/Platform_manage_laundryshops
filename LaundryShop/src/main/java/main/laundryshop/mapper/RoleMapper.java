package main.laundryshop.mapper;

import main.laundryshop.dto.request.RoleRequest;
import main.laundryshop.dto.response.RoleResponse;
import main.laundryshop.models.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}
