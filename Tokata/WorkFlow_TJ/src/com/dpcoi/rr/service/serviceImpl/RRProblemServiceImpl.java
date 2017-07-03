package com.dpcoi.rr.service.serviceImpl;/**
 * Created by liangzhifu
 * DATE:2017/6/28.
 */

import com.dpcoi.config.dao.DpcoiConfigVehicleDao;
import com.dpcoi.config.query.DpcoiConfigVehicleQuery;
import com.dpcoi.holiday.dao.HolidayDao;
import com.dpcoi.rr.domain.RRProblem;
import com.dpcoi.rr.dao.RRProblemDao;
import com.dpcoi.rr.query.RRProblemQuery;
import com.dpcoi.rr.service.RRProblemService;
import com.success.sys.user.dao.UserDao;
import com.success.sys.user.domain.User;
import com.success.web.framework.exception.ServiceException;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 *
 * @author lzf
 * @create 2017-06-28
 **/
@Service("rRProblemService")
public class RRProblemServiceImpl implements RRProblemService {

    @Resource(name = "rRProblemDao")
    private RRProblemDao rRProblemDao;

    @Resource(name = "holidayDao")
    private HolidayDao holidayDao;

    @Resource(name = "userDao")
    private UserDao userDao;

    @Resource(name = "dpcoiConfigVehicleDao")
    private DpcoiConfigVehicleDao dpcoiConfigVehicleDao;

    @Override
    public Integer addRRProblem(RRProblem rrProblem) throws ServiceException {
        rrProblem.setState(1);
        //获得问题编号
        String problemType = rrProblem.getProblemType();
        String problemNo = "";
        Date nowDate = new Date();
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        String shortYear = String.valueOf(year).substring(2);
        cal.setTime(nowDate);
        if("客诉".equals(problemType)){
            problemNo = "TT-KS-"+shortYear+"-";
        }else if("内诉（全检）".equals(problemType)) {
            problemNo = "TT-NS-"+shortYear+"-";
        }else if("内诉（抽检）".equals(problemType)) {
            problemNo = "TT-NS-"+shortYear+"-";
        }else if("工程".equals(problemType)) {
            problemNo = "TT-GC-"+shortYear+"-";
        }else if("市场投诉".equals(problemType)) {
            problemNo = "TT-SC-"+shortYear+"-";
        }else{
            throw new ServiceException("问题类型不存在！");
        }
        Integer max = this.rRProblemDao.selectProblemNoMax(problemNo);
        if(max == null){
            problemNo += "001";
        }else {
            max += 1;
            if(max < 10){
                problemNo += "00" + max;
            }else if(max < 100){
                problemNo += "0" + max;
            }else{
                problemNo += "" + max;
            }
        }
        rrProblem.setProblemNo(problemNo);

        //获取客户
        DpcoiConfigVehicleQuery dpcoiConfigVehicleQuery = new DpcoiConfigVehicleQuery();
        dpcoiConfigVehicleQuery.setConfigVehicleValue(rrProblem.getVehicle());
        List<Map<String, Object>> mapList = this.dpcoiConfigVehicleDao.selectDpcoiConfigVehicle(dpcoiConfigVehicleQuery);
        if(mapList == null || mapList.size() == 0){
            throw new ServiceException("车型不存在！");
        }else if(mapList.size() > 1){
            throw new ServiceException("车型存在多个！");
        }else {
            Map<String, Object> map = mapList.get(0);
            rrProblem.setCustomer((String)map.get("configValue"));
        }

        List<Calendar> calendarList = this.queryHolidayList();
        //第一次
        Date date = this.calculationWorkingDay(nowDate, 2, calendarList);
        rrProblem.setFirstDate(date);

        //第二次
        date = this.calculationWorkingDay(nowDate, 14, calendarList);
        rrProblem.setSecondDate(date);

        //第三次
        date = this.calculationWorkingDay(nowDate, 34, calendarList);
        rrProblem.setThirdDate(date);

        //第四次
        date = this.calculationWorkingDay(nowDate, 40, calendarList);
        rrProblem.setFourthDate(date);

        //问题进度
        rrProblem.setSpeedOfProgress("follow");

        return this.rRProblemDao.insertRRProblem(rrProblem);
    }

    @Override
    public Integer updateRRProblem(RRProblem rrProblem) throws ServiceException {
        return this.rRProblemDao.updateRRProblem(rrProblem);
    }

    @Override
    public List<Map<String, Object>> queryRRProblemPageList(RRProblemQuery rrProblemQuery) throws ServiceException {
        return this.rRProblemDao.selectRRProblemListPage(rrProblemQuery);
    }

    @Override
    public Integer queryRRProblemCount(RRProblemQuery rrProblemQuery) throws ServiceException {
        return this.rRProblemDao.selectRRProblemCount(rrProblemQuery);
    }

    @Override
    public Map<String, Object> getHappenDateRandom() throws ServiceException {
        Map<String, Object> map = new HashedMap();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date nowDate = new Date();
        map.put("endDate", formatter.format(nowDate));
        Calendar cal = Calendar.getInstance();
        cal.setTime(nowDate);
        cal.add(Calendar.DAY_OF_MONTH, -1);
        int weekDay = cal.get(Calendar.DAY_OF_WEEK);
        while(Calendar.SATURDAY == weekDay || Calendar.SUNDAY == weekDay){
            cal.add(Calendar.DAY_OF_MONTH, -1);
            weekDay = cal.get(Calendar.DAY_OF_WEEK);
        }
        nowDate = cal.getTime();
        map.put("startDate", formatter.format(nowDate));
        return map;
    }

    @Override
    public List<Map<String, Object>> queryPersionLiableList() throws ServiceException {
        return this.rRProblemDao.selectPersionLiableList();
    }

    @Override
    public RRProblem queryRRProblem(RRProblem rrProblem) throws ServiceException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        rrProblem = this.rRProblemDao.selectRRProblem(rrProblem);
        rrProblem.setHappenDateStr(formatter.format(rrProblem.getHappenDate()));
        rrProblem.setReportDateStr(formatter.format(rrProblem.getReportDate()));
        rrProblem.setFirstDateStr(formatter.format(rrProblem.getFirstDate()));
        rrProblem.setSecondDateStr(formatter.format(rrProblem.getSecondDate()));
        rrProblem.setThirdDateStr(formatter.format(rrProblem.getThirdDate()));
        rrProblem.setFourthDateStr(formatter.format(rrProblem.getFourthDate()));
        return rrProblem;
    }

    @Override
    public Integer queryMinisterJurisdiction(User user) throws ServiceException {
        return this.userDao.selectMinisterJurisdiction(user);
    }


    /**
     * 计算公式
     * @param startDay 开始日期
     * @param IntervalDays 间隔天数
     */
    private Date calculationWorkingDay(Date startDay, Integer IntervalDays, List<Calendar> holidayList){
        Calendar src = Calendar.getInstance();
        src.setTime(startDay);

        boolean holidayFlag;
        for (int i = 0; i < IntervalDays; i++) {
            //把源日期加一天
            src.add(Calendar.DAY_OF_MONTH, 1);
            holidayFlag =checkHoliday(src, holidayList);
            if(holidayFlag) {
                i--;
            }
        }

        return src.getTime();
    }

    /**
     * 校验指定的日期是否在节日列表中
     * 具体节日包含哪些,可以在HolidayMap中修改
     * @param src 要检验的日期
     */
    private boolean checkHoliday(Calendar src, List<Calendar> holidayList){
        boolean result = false;

        if (holidayList == null) {
            return false;
        }

        for (Calendar c : holidayList) {
            if (src.get(Calendar.MONTH) == c.get(Calendar.MONTH)
                    && src.get(Calendar.DAY_OF_MONTH) == c.get(Calendar.DAY_OF_MONTH)
                    && src.get(Calendar.YEAR) == c.get(Calendar.YEAR)) {
                result = true;
            }
        }

        return result;
    }

    /**
     * 获取所有的节假日
     * @return 返回结果
     */
    private List<Calendar> queryHolidayList(){
        List<Calendar> calendarList = new LinkedList<Calendar>();
        List<Date> dateList = this.holidayDao.selectHolidayList();
        for(Date date : dateList){
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            calendarList.add(cal);
        }
        return calendarList;
    }
}
