package com.dpcoi.rr.controller;/**
 * Created by liangzhifu
 * DATE:2017/6/28.
 */

import com.dpcoi.order.domain.DpcoiOrder;
import com.dpcoi.order.service.DpcoiOrderService;
import com.dpcoi.rr.domain.RRProblem;
import com.dpcoi.rr.query.RRProblemQuery;
import com.dpcoi.rr.service.RRProblemService;
import com.success.common.Constant;
import com.success.sys.user.domain.User;
import com.success.web.framework.util.AjaxUtil;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author lzf
 * @create 2017-06-28
 **/
@Controller
@RequestMapping("/rrProblem")
public class RRProblemController {

    @Resource(name = "rRProblemService")
    private RRProblemService rRProblemService;

    @Resource(name = "dpcoiOrderService")
    private DpcoiOrderService dpcoiOrderService;

    @RequestMapping("/getRRProblemAddDlg.do")
    public String getRRProblemAddDlg(Map<String, Object> model) throws Exception{
        model.put("action", "add");
        Map<String, Object> map = this.rRProblemService.getHappenDateRandom();
        model.put("startDate", map.get("startDate"));
        model.put("endDate", map.get("endDate"));
        return "dpcoi/rrProblemEdit";
    }

    @RequestMapping("/getRRProblemEditDlg.do")
    public String getRRProblemEditDlg(Map<String, Object> model, RRProblem rrProblem) throws Exception{
        model.put("action", "edit");
        Map<String, Object> map = this.rRProblemService.getHappenDateRandom();
        model.put("startDate", map.get("startDate"));
        model.put("endDate", map.get("endDate"));
        model.put("rrProblemId", rrProblem.getId());
        return "dpcoi/rrProblemEdit";
    }

    @RequestMapping("/getRRProblemListDlg.do")
    public String getRRProblemListDlg() throws Exception{
        return "dpcoi/rrProblemList";
    }

    /**
     * 查询RR问题点选项列表--分页
     * @param response 参数
     * @param rrProblemQuery 查询条件
     */
    @RequestMapping("/getRRProblemListPage.do")
    public void getRRProblemListPage(HttpServletResponse response, RRProblemQuery rrProblemQuery){
        Map<String, Object> map = new HashMap<String, Object>();
        try{
            List<Map<String, Object>> rrProblemList = this.rRProblemService.queryRRProblemPageList(rrProblemQuery);
            Integer rrProblemCount = this.rRProblemService.queryRRProblemCount(rrProblemQuery);
            Integer pageCount = rrProblemCount / rrProblemQuery.getSize() + (rrProblemCount % rrProblemQuery.getSize() > 0 ? 1 : 0);
            map.put("rrProblemList", rrProblemList);
            map.put("rrProblemCount", rrProblemCount);
            map.put("pageCount", pageCount);
            map.put("success", true);
        }catch (Exception e){
            e.printStackTrace();
            map.put("success", false);
            map.put("message", e.getMessage());
        }
        AjaxUtil.ajaxResponse(response, new JSONObject(map).toString(), AjaxUtil.RESPONCE_TYPE_JSON);
    }

    /**
     * 查询RR问题点
     * @param response 参数
     * @param rrProblem 查询条件
     */
    @RequestMapping("/getRRProblem.do")
    public void getRRProblemListPage(HttpServletResponse response, RRProblem rrProblem){
        Map<String, Object> map = new HashMap<String, Object>();
        try{
            rrProblem = this.rRProblemService.queryRRProblem(rrProblem);
            map.put("rrProblem", rrProblem);
            map.put("success", true);
        }catch (Exception e){
            e.printStackTrace();
            map.put("success", false);
            map.put("message", e.getMessage());
        }
        AjaxUtil.ajaxResponse(response, new JSONObject(map).toString(), AjaxUtil.RESPONCE_TYPE_JSON);
    }

    /**
     * 新增RR问题点选项
     * @param response 参数
     * @param rrProblem RR问题点选项
     */
    @RequestMapping("/addRRProblem.do")
    public void addRRProblem(HttpServletRequest request, HttpServletResponse response, @ModelAttribute RRProblem rrProblem){
        Map<String, Object> map = new HashMap<String, Object>();
        try{
            map.put("success", true);
            String changePoint = rrProblem.getChangePoint();
            if(changePoint == null || "".equals(changePoint)){
                map.put("success", false);
                map.put("message", "变化点管理不能为空！");
            }else if("N/A".equals(changePoint)){
                this.rRProblemService.addRRProblem(rrProblem);
                User user = (User)request.getSession().getAttribute(Constant.STAFF_KEY);
                this.dpcoiOrderService.addDpcoiOrder(rrProblem, user);
            }else {
                DpcoiOrder dpcoiOrder = this.dpcoiOrderService.quereyDpcoiOrderOfTaskOrderNo(changePoint);
                if(dpcoiOrder == null){
                    map.put("success", false);
                    map.put("message", "变化点管理不存在！");
                }else {
                    this.rRProblemService.addRRProblem(rrProblem);
                    dpcoiOrder.setRrProblemId(rrProblem.getId());
                    this.dpcoiOrderService.updateDpcoiOrder(dpcoiOrder);
                }
            }

        }catch (Exception e){
            e.printStackTrace();
            map.put("success", false);
            map.put("message", e.getMessage());
        }
        AjaxUtil.ajaxResponse(response, new JSONObject(map).toString(), AjaxUtil.RESPONCE_TYPE_JSON);
    }

    /**
     * 更新RR问题点选项
     * @param response 参数
     * @param rrProblem RR问题点选项
     */
    @RequestMapping("updateRRProblem.do")
    public void updateRRProblem(HttpServletResponse response, RRProblem rrProblem){
        Map<String, Object> map = new HashMap<String, Object>();
        try{
            this.rRProblemService.updateRRProblem(rrProblem);
            map.put("success", true);
        }catch (Exception e){
            e.printStackTrace();
            map.put("success", false);
            map.put("message", e.getMessage());
        }
        AjaxUtil.ajaxResponse(response, new JSONObject(map).toString(), AjaxUtil.RESPONCE_TYPE_JSON);
    }

    /**
     * 查询责任人列表
     * @param response 参数
     */
    @RequestMapping("/getPersionLiableList.do")
    public void getPersionLiableList(HttpServletResponse response){
        Map<String, Object> map = new HashMap<String, Object>();
        try{
            List<Map<String, Object>> persionLiableList = this.rRProblemService.queryPersionLiableList();
            map.put("persionLiableList", persionLiableList);
            map.put("success", true);
        }catch (Exception e){
            e.printStackTrace();
            map.put("success", false);
            map.put("message", e.getMessage());
        }
        AjaxUtil.ajaxResponse(response, new JSONObject(map).toString(), AjaxUtil.RESPONCE_TYPE_JSON);
    }
}
