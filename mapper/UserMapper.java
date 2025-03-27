package main.chgu.mapper;

import main.chgu.dto.request.UserCreationRequest;
import main.chgu.dto.request.UserUpdateRequest;
import main.chgu.dto.response.UserReponse;
import main.chgu.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserReponse toUserReponse(User user);

    void updateUser(@MappingTarget  User  user, UserUpdateRequest request);

}
