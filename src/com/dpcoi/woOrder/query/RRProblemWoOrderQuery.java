package com.dpcoi.woOrder.query;/**
 * Created by liangzhifu
 * DATE:2017/6/30.
 */

/**
 *
 * @author lzf
 * @create 2017-06-30
 **/

public class RRProblemWoOrderQuery {

    private Integer start;

    private Integer size;

    private String badContent;

    private String problemProgress;

    private String speedOfProgress;

    private Integer dpcoiUserId;

    public Integer getDpcoiUserId() {
        return dpcoiUserId;
    }

    public void setDpcoiUserId(Integer dpcoiUserId) {
        this.dpcoiUserId = dpcoiUserId;
    }

    public String getSpeedOfProgress() {
        return speedOfProgress;
    }

    public void setSpeedOfProgress(String speedOfProgress) {
        this.speedOfProgress = speedOfProgress;
    }

    public String getProblemProgress() {
        return problemProgress;
    }

    public void setProblemProgress(String problemProgress) {
        this.problemProgress = problemProgress;
    }

    public String getBadContent() {
        return badContent;
    }

    public void setBadContent(String badContent) {
        this.badContent = badContent;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }
}
