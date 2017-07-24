<%--
  Created by IntelliJ IDEA.
  User: liangzhifu
  Date: 2017/7/7
  Time: 10:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<html>
<head>
    <title>RR问题点屏幕显示</title>
    <%@include file="../public/js.jsp"%>
    <%@include file="../public/css.jsp"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <style type="text/css">
        .claasRed{
            background-color : red;
            color: #000000;!important;
        }

        .classGoldenRod{
            background-color : GoldenRod;
            color: #000000;!important;
        }

        .classYellow{
            background-color : yellow;
            color: #000000;!important;
        }

        .cassDeepSkyBlue{
            background-color : deepskyblue;
            color: #000000;!important;
        }
    </style>
</head>
<body>
    <div class="main-container container-fluid" style="padding-right: 1px;padding-left: 1px;">
        <div class="main-content" >
            <div class="page-content" >
                <div id="listTable" style="overflow:hidden;">
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th width="90px" class="x-grid3-header">问题类型</th>
                                <th width="35px" class="x-grid3-header">进展</th>
                                <th width="80px" class="x-grid3-header">发生日期</th>
                                <th width="70px" class="x-grid3-header">车型</th>
                                <th width="80px" class="x-grid3-header">品名</th>
                                <th class="x-grid3-header">不良内容</th>
                                <th width="90px" class="x-grid3-header">责任人</th>
                                <th width="90px" class="x-grid3-header">下次汇报时间</th>
                                <th width="50px" class="x-grid3-header">进度</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyList">
                            <c:forEach items="${mapList}" var="item">
                                <tr style="${item.backgroundColor}">
                                    <td style="white-space:normal;word-wrap:break-word;word-break:break-all;padding: 0px;display:table-cell; vertical-align:middle;">${item.problemType}</td>
                                    <td style="white-space:normal;word-wrap:break-word;word-break:break-all;padding: 0px;display:table-cell; vertical-align:middle;">${item.problemProgress}</td>
                                    <td style="white-space:normal;word-wrap:break-word;word-break:break-all;padding: 0px;display:table-cell; vertical-align:middle;">${item.happenDate}</td>
                                    <td style="white-space:normal;word-wrap:break-word;word-break:break-all;padding: 0px;display:table-cell; vertical-align:middle;">${item.vehicle}</td>
                                    <td style="white-space:normal;word-wrap:break-word;word-break:break-all;padding: 0px;display:table-cell; vertical-align:middle;">${item.productNo}</td>
                                    <td style="white-space:normal;word-wrap:break-word;word-break:break-all;padding: 0px;display:table-cell; vertical-align:middle;text-align: left;">${item.badContent}</td>
                                    <td style="white-space:normal;word-wrap:break-word;word-break:break-all;padding: 0px;display:table-cell; vertical-align:middle;">${item.persionLiable}</td>
                                    <td style="white-space:normal;word-wrap:break-word;word-break:break-all;padding: 0px;display:table-cell; vertical-align:middle;">${item.reportDate}</td>
                                    <td style="white-space:normal;word-wrap:break-word;word-break:break-all;padding: 0px;display:table-cell; vertical-align:middle;">${item.speedOfProgress}</td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
<script>
    var clientHeight = document.body.clientHeight;
    $("#listTable").css("height", clientHeight);

    $(document).ready(function() {
        setTimeout(autoScroll,2000);
    });

    function autoScroll() {
        var obj = $("#listTable").find("table:first");
        var height = obj.height();
        height = height - clientHeight;
        if(height < 0){
            toOtherJsp();
        }else {
            var speed = height * 100;
            obj.animate({marginTop:"-"+height+"px"},speed, function () {
                setTimeout(toOtherJsp,2000);
            });
        }
    }

    function toOtherJsp(){

    }
</script>
</html>
