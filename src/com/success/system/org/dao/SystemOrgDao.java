package com.success.system.org.dao;

import com.success.system.org.domain.SystemOrg;
import com.success.web.framework.mybatis.BaseDao;
import com.success.system.org.query.SystemOrgQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author lzf
 **/
@Repository
public class SystemOrgDao extends BaseDao {

    /**
     * 根据组织ID，查询组织
     * @param systemOrg 组织实体信息
     * @return 返回结果
     */
    public SystemOrg selectByPrimaryKey(SystemOrg systemOrg) {
        return this.sqlSession.selectOne("SystemOrgMapper.selectByPrimaryKey", systemOrg);
    }

    /**
     * 新增组织
     * @param systemOrg 组织实体信息
     * @return 返回结果
     */
    public Integer insertSystemOrg(SystemOrg systemOrg) {
        return this.sqlSession.insert("SystemOrgMapper.insertSelective", systemOrg);
    }

    /**
     * 修改组织信息
     * @param systemOrg 组织实体信息
     * @return 返回结果
     */
    public Integer updateSystemOrg(SystemOrg systemOrg) {
        return this.sqlSession.update("SystemOrgMapper.updateByPrimaryKeySelective", systemOrg);
    }

    /**
     * 查询组织管理页面列表
     * @param systemOrgQuery 查询条件
     * @return 返回列表数据
     */
    public List<SystemOrg> selectSystemOrgList(SystemOrgQuery systemOrgQuery){
        return this.sqlSession.selectList("SystemOrgMapper.selectSystemOrgList", systemOrgQuery);
    }

}
