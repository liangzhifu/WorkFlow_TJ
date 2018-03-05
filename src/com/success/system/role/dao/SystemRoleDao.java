package com.success.system.role.dao;

import com.success.system.role.domain.SystemRole;
import com.success.system.role.query.SystemRoleQuery;
import com.success.system.user.query.SystemUserRoleQuery;
import com.success.web.framework.mybatis.BaseDao;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author lzf
 **/
@Repository
public class SystemRoleDao extends BaseDao {

    /**
     * 新增角色
     * @param systemRole 角色实体信息
     * @return 返回结果
     */
    public Integer insertSystemRole(SystemRole systemRole) {
        return this.sqlSession.insert("SystemRoleMapper.insertSystemRole", systemRole);
    }

    /**
     * 修改角色信息
     * @param systemRole 角色实体信息
     * @return 返回结果
     */
    public Integer updateSystemRole(SystemRole systemRole) {
        return this.sqlSession.update("SystemRoleMapper.updateSystemRole", systemRole);
    }

    /**
     * 查询角色管理页面列表
     * @param systemRoleQuery 查询条件
     * @return 返回列表数据
     */
    public List<SystemRole> selectSystemRolePageList(SystemRoleQuery systemRoleQuery){
        return this.sqlSession.selectList("SystemRoleMapper.selectSystemRolePageList", systemRoleQuery);
    }

    /**
     * 查询角色管理页面总数
     * @param systemRoleQuery 查询条件
     * @return 返回总数
     */
    public Integer selectSystemRoleCount(SystemRoleQuery systemRoleQuery){
        return this.sqlSession.selectOne("SystemRoleMapper.selectSystemRoleCount", systemRoleQuery);
    }

    /**
     * 查询角色管理页面列表
     * @param systemUserRoleQuery 查询条件
     * @return 返回列表数据
     */
    public List<SystemRole> selectAddSystemRoleList(SystemUserRoleQuery systemUserRoleQuery){
        return this.sqlSession.selectList("SystemRoleMapper.selectAddSystemRoleList", systemUserRoleQuery);
    }

}
