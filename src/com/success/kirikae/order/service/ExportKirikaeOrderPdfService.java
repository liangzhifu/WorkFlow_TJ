package com.success.kirikae.order.service;

public interface ExportKirikaeOrderPdfService {

    /**
     * 导出确认书PDF
     * @param orderId 切替单ID
     * @param path 路径
     * @return 返回结果
     * @throws Exception 异常
     */
    public String exportConfirmBook(Integer orderId, String path) throws Exception;

    /**
     * 导出手配书PDF
     * @param orderId 切替单ID
     * @param path  路径
     * @return  返回结果
     * @throws Exception  异常
     */
    public String exportHandMatch(Integer orderId, String path) throws Exception;

}
