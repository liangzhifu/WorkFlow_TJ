package com.success.system.holiday.service.impl;

import com.success.system.holiday.dao.SystemHolidayDao;
import com.success.system.holiday.domain.SystemHoliday;
import com.success.system.holiday.query.SystemHolidayQuery;
import com.success.system.holiday.service.SystemHolidayService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @author lzf
 **/
@Service("systemHolidayService")
public class SystemHolidayServiceImpl implements SystemHolidayService {

    @Resource(name = "systemHolidayDao")
    private SystemHolidayDao systemHolidayDao;

    @Override
    public Integer deleteSystemHoliday(SystemHoliday systemHoliday) {
        return this.systemHolidayDao.deleteSystemHoliday(systemHoliday);
    }

    @Override
    public Integer addSystemHoliday(SystemHoliday systemHoliday) {
        return this.systemHolidayDao.insertSystemHoliday(systemHoliday);
    }

    @Override
    public List<SystemHoliday> listSystemHolidayPage(SystemHolidayQuery systemHolidayQuery) throws Exception {
        return this.systemHolidayDao.selectSystemHolidayPageList(systemHolidayQuery);
    }

    @Override
    public Integer countSystemHoliday(SystemHolidayQuery systemHolidayQuery) throws Exception {
        return this.systemHolidayDao.selectSystemHolidayCount(systemHolidayQuery);
    }

    @Override
    public List<SystemHoliday> listSystemHoliday(SystemHolidayQuery systemHolidayQuery) throws Exception {
        return this.systemHolidayDao.selectSystemHolidayList(systemHolidayQuery);
    }
}
