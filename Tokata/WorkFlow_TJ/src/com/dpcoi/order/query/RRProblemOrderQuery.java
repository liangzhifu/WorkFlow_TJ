package com.dpcoi.order.query;/**
 * Created by liangzhifu
 * DATE:2017/6/29.
 */

/**
 *
 * @author lzf
 * @create 2017-06-29
 **/

public class RRProblemOrderQuery {

    private Integer start;

    private Integer size;

    private String badContent;

    private String problemProgress;

    private String speedOfProgress;

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

    public String getBadContent() {
        return badContent;
    }

    public void setBadContent(String badContent) {
        this.badContent = badContent;
    }

    public String getProblemProgress() {
        return problemProgress;
    }

    public void setProblemProgress(String problemProgress) {
        this.problemProgress = problemProgress;
    }

    public String getSpeedOfProgress() {
        return speedOfProgress;
    }

    public void setSpeedOfProgress(String speedOfProgress) {
        this.speedOfProgress = speedOfProgress;
    }
}
