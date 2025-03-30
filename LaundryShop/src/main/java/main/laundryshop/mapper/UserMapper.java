package main.laundryshop.mapper;

import main.laundryshop.dto.request.UserCreationRequest;
import main.laundryshop.dto.request.UserUpdateRequest;
import main.laundryshop.dto.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import main.laundryshop.models.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
