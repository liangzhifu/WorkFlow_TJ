package com.dpcoi.quartz.service.serviceImpl;/**
 * Created by liangzhifu
 * DATE:2017/7/5.
 */

import com.dpcoi.rr.domain.RRProblem;
import com.dpcoi.rr.service.RRProblemService;
import com.success.sys.email.dao.TimeTaskDao;
import com.success.sys.email.domain.TimeTask;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 *
 * @author lzf
 * @create 2017-07-05
 **/

@Component("updateRRProblemSpeedOfProgress")
public class UpdateRRProblemSpeedOfProgress {

    @Resource(name="timeTaskDao")
    private TimeTaskDao timeTaskDao;

    @Resource(name = "rRProblemService")
    private RRProblemService rRProblemService;

    @Scheduled(cron = "0 30 2 * * ?")
    public void job() {
        try {
            List<RRProblem> rrProblemList = this.rRProblemService.queryJobRRProblemList();
            for (RRProblem rrProblem : rrProblemList){
                this.rRProblemService.updateSpeedOfProgress(rrProblem);
                String speedOfProgress = rrProblem.getSpeedOfProgress();
                if("delay".equals(speedOfProgress)){
                    TimeTask timeTask = new TimeTask();
                    timeTask.setNoticeType(38);
                    StringBuffer comment = new StringBuffer();
                    comment.append("状态:").append(rrProblem.getProblemStatus())
                            .append("<br>").append("问题编号:").append(rrProblem.getProblemNo())
                            .append("<br>").append("问题类型:").append(rrProblem.getProblemType())
                            .append("<br>").append("工程:").append(rrProblem.getEngineering())
                            .append("<br>").append("客户:").append(rrProblem.getCustomer())
                            .append("<br>").append("车型:").append(rrProblem.getVehicle())
                            .append("<br>").append("品名:").append(rrProblem.getProductNo())
                            .append("<br>").append("不良内容:").append(rrProblem.getBadContent())
                            .append("<br>").append("生产线:").append(rrProblem.getProductLine())
                            .append("<br>").append("严重度:").append(rrProblem.getSeverity())
                            .append("<br>").append("根本原因:").append(rrProblem.getRootCause())
                            .append("<br>").append("永久对策:").append(rrProblem.getPermanentGame());
                    timeTask.setComment(comment.toString());
                    String emailUser = this.rRProblemService.queryDelayEmails(rrProblem);
                    timeTask.setUserEmail(emailUser);
                    timeTask.setDeleteState(0);
                    this.timeTaskDao.insertTimeTask(timeTask);
                }
                this.rRProblemService.updateRRProblem(rrProblem);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
