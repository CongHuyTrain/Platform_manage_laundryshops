package main.chgu.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCreationRequest {
    private String name;
    @Size(min = 8, message = "Password must be at least 8 charactera")
    private String password;
    private String email;
    private String phone;
    private String address;
}
