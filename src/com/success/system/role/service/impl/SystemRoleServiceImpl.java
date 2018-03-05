package com.success.system.role.service.impl;

import com.success.kirikae.constant.CommonEnum;
import com.success.sys.user.domain.User;
import com.success.system.role.dao.SystemRoleDao;
import com.success.system.role.domain.SystemRole;
import com.success.system.role.query.SystemRoleQuery;
import com.success.system.role.service.SystemRoleMenuService;
import com.success.system.role.service.SystemRolePermissionService;
import com.success.system.role.service.SystemRoleService;
import com.success.system.user.domain.SystemUserRole;
import com.success.system.user.query.SystemUserRoleQuery;
import com.success.system.user.service.SystemUserRoleService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author lzf
 **/
@Service("systemRoleService")
public class SystemRoleServiceImpl implements SystemRoleService {

    @Resource(name = "systemRoleDao")
    private SystemRoleDao systemRoleDao;

    @Resource(name = "systemUserRoleService")
    private SystemUserRoleService systemUserRoleService;

    @Resource(name = "systemRoleMenuService")
    private SystemRoleMenuService systemRoleMenuService;

    @Resource(name = "systemRolePermissionService")
    private SystemRolePermissionService systemRolePermissionService;

    @Override
    public Integer addSystemRole(SystemRole systemRole, User user) throws Exception {
        systemRole.setCreateBy(user.getUserId());
        systemRole.setCreateTime(new Date());
        systemRole.setUpdateBy(user.getUserId());
        systemRole.setUpdateTime(new Date());
        systemRole.setDeleteState(CommonEnum.DeleteStateEnum.DELETE_STATE_NO.getCode());
        Integer count = this.systemRoleDao.insertSystemRole(systemRole);
        if (count != 1){
            throw new Exception("添加角色异常！");
        }
        return count;
    }

    @Override
    public Integer editSystemRole(SystemRole systemRole, User user) throws Exception {
        systemRole.setUpdateBy(user.getUserId());
        systemRole.setUpdateTime(new Date());
        Integer count = this.systemRoleDao.updateSystemRole(systemRole);
        if (count != 1){
            throw new Exception("修改角色异常！");
        }
        return count;
    }

    @Override
    public Integer deleteSystemRole(SystemRole systemRole, User user) throws Exception {
        systemRole.setUpdateBy(user.getUserId());
        systemRole.setUpdateTime(new Date());
        systemRole.setDeleteState(CommonEnum.DeleteStateEnum.DELETE_STATE_YES.getCode());
        Integer count = this.systemRoleDao.updateSystemRole(systemRole);
        if (count != 1){
            throw new Exception("删除角色异常！");
        }

        //删除角色菜单关联
        this.systemRoleMenuService.deleteSystemRoleMenuByRole(systemRole.getId(), user);

        //删除角色权限关联
        this.systemRolePermissionService.deleteSystemPermissionByRole(systemRole.getId(), user);

        //删除用户角色关联
        this.systemUserRoleService.deleteSystemUserRoleByRole(systemRole.getId(), user);

        return count;
    }

    @Override
    public List<SystemRole> listSystemRolePage(SystemRoleQuery systemRoleQuery) throws Exception {
        return this.systemRoleDao.selectSystemRolePageList(systemRoleQuery);
    }

    @Override
    public Integer countSystemRole(SystemRoleQuery systemRoleQuery) throws Exception {
        return this.systemRoleDao.selectSystemRoleCount(systemRoleQuery);
    }

    @Override
    public List<SystemRole> listAddRole(SystemUserRoleQuery systemUserRoleQuery) throws Exception {
        return this.systemRoleDao.selectAddSystemRoleList(systemUserRoleQuery);
    }

}
