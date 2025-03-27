package main.chgu.service;

import lombok.RequiredArgsConstructor;
import main.chgu.dto.request.PermissionRequest;
import main.chgu.dto.response.PermissionResponse;
import main.chgu.mapper.PermissionMapper;
import main.chgu.models.Permission;
import main.chgu.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;
    private PermissionMapper permissionMapper;

    public PermissionResponse createPermission(PermissionRequest request) {
        Permission permission = permissionMapper.toPermission(request);
        permission = permissionRepository.save(permission);
        return permissionMapper.toPermissionResponse(permission);
    }

    public List<PermissionResponse> getAll(){
        var permissions = permissionRepository.findAll();
        return permissions.stream().map(permissionMapper::toPermissionResponse).toList();
    }

    public void delete(String permission){
        permissionRepository.deleteById(permission);
    }
}
