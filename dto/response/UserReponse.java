package main.chgu.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import main.chgu.models.Role;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserReponse {
    private String id;
    private String name;
    private String email;
    private String phone;
    private String address;

    //@ElementCollection
    private Set<Role> roles;

}