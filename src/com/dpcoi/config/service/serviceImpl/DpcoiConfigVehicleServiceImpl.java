package com.dpcoi.config.service.serviceImpl;/**
 * Created by liangzhifu
 * DATE:2017/6/17.
 */

import com.dpcoi.config.dao.DpcoiConfigDao;
import com.dpcoi.config.dao.DpcoiConfigVehicleDao;
import com.dpcoi.config.domain.DpcoiConfig;
import com.dpcoi.config.domain.DpcoiConfigCode;
import com.dpcoi.config.domain.DpcoiConfigVehicle;
import com.dpcoi.config.query.DpcoiConfigQuery;
import com.dpcoi.config.query.DpcoiConfigVehicleQuery;
import com.dpcoi.config.service.DpcoiConfigVehicleService;
import com.success.web.framework.exception.ServiceException;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author lzf
 * @create 2017-06-17
 **/
@Service("dpcoiConfigVehicleService")
public class DpcoiConfigVehicleServiceImpl implements DpcoiConfigVehicleService {

    @Resource(name="dpcoiConfigVehicleDao")
    private DpcoiConfigVehicleDao dpcoiConfigVehicleDao;

    @Resource(name = "dpcoiConfigDao")
    private DpcoiConfigDao dpcoiConfigDao;

    @Override
    public Integer addDpcoiConfigVehicle(DpcoiConfigVehicle dpcoiConfigVehicle) throws ServiceException {
        return this.dpcoiConfigVehicleDao.insertDpcoiConfigVehicle(dpcoiConfigVehicle);
    }

    @Override
    public Integer deleteDpcoiConfigVehicle(DpcoiConfigVehicle dpcoiConfigVehicle) throws ServiceException {
        dpcoiConfigVehicle.setDeleteState("1");
        return this.dpcoiConfigVehicleDao.updateDpcoiConfigVehicle(dpcoiConfigVehicle);
    }

    @Override
    public List<Map<String, Object>> queryDpcoiConfigVehicleList(DpcoiConfigVehicleQuery dpcoiConfigVehicleQuery) throws ServiceException {
        return this.dpcoiConfigVehicleDao.selectDpcoiConfigVehicleList(dpcoiConfigVehicleQuery);
    }

    @Override
    public List<Map<String, Object>> queryDpcoiConfigVehiclePageList(DpcoiConfigVehicleQuery dpcoiConfigVehicleQuery) throws ServiceException {
        return this.dpcoiConfigVehicleDao.selectDpcoiConfigVehicleListPage(dpcoiConfigVehicleQuery);
    }

    @Override
    public Integer queryDpcoiConfigVehicleCount(DpcoiConfigVehicleQuery dpcoiConfigVehicleQuery) throws ServiceException {
        return this.dpcoiConfigVehicleDao.selectDpcoiConfigVehicleCount(dpcoiConfigVehicleQuery);
    }

    @Override
    public void addUploadFile(HSSFWorkbook wb) throws ServiceException {
        if (wb != null) {
            //得到第一个工作薄
            HSSFSheet sheet = wb.getSheetAt(0);
            if (sheet.getLastRowNum() <= 0) {
                throw new ServiceException("excel为空文件无法导入!");
            }

            //处理文件头
            HSSFRow firstRow = sheet.getRow(0);
            for (int index = 0; index < firstRow.getLastCellNum(); index++) {
                HSSFCell cell= firstRow.getCell(index);
                if (cell == null || "".equals(cell.getStringCellValue())) {
                    throw new ServiceException("上传文件第[" + (index + 1) + "]列标题为空，请重新下载报表模板，在进行上传!");
                }
            }

            List<DpcoiConfig> dpcoiConfigList = this.dpcoiConfigDao.selectDpcoiCustomerConfigList();
            List<DpcoiConfigVehicle> dpcoiConfigVehicleList = new LinkedList<DpcoiConfigVehicle>();
            //处理数据
            for (int index = 1; index < sheet.getLastRowNum() + 1; index++) {
                HSSFRow row = sheet.getRow(index);
                HSSFCell cell0 = row.getCell(0);
                if (cell0 == null) {
                    throw new ServiceException("上传文件第1列[客户]为必填字段，请检查第" + (index + 1) + "行是否有空值！");
                }
                String configValue = cell0.getStringCellValue();
                configValue = configValue.trim();
                if (configValue == null || "".equals(configValue)) {
                    throw new ServiceException("上传文件第1列[客户]为必填字段，请检查第" + (index + 1) + "行是否有空值！");
                }
                HSSFCell cell1 = row.getCell(1);
                if (cell1 == null) {
                    throw new ServiceException("上传文件第2列[车型]为必填字段，请检查第" + (index + 1) + "行是否有空值！");
                }
                String configVehicleValue = cell1.getStringCellValue();
                if (configVehicleValue == null || "".equals(configVehicleValue)) {
                    throw new ServiceException("上传文件第2列[车型]为必填字段，请检查第" + (index + 1) + "行是否有空值！");
                }
                DpcoiConfigVehicle dpcoiConfigVehicle = new DpcoiConfigVehicle();
                boolean flag = false;
                for (DpcoiConfig dpcoiConfig : dpcoiConfigList) {
                    if (dpcoiConfig.getConfigValue().equals(configValue)) {
                        flag = true;
                        dpcoiConfigVehicle.setConfigId(dpcoiConfig.getConfigId());
                    }
                }
                if (flag) {
                    dpcoiConfigVehicle.setConfigVehicleValue(configVehicleValue);
                    dpcoiConfigVehicle.setDeleteState("0");
                    dpcoiConfigVehicleList.add(dpcoiConfigVehicle);
                } else {
                    throw new ServiceException("上传文件第1列[客户]不存在，请检查第" + ( index + 1) + "行值！");
                }
            }

            //插入数据库
            for (DpcoiConfigVehicle dpcoiConfigVehicle : dpcoiConfigVehicleList) {
                this.dpcoiConfigVehicleDao.insertDpcoiConfigVehicle(dpcoiConfigVehicle);
            }
        }
    }
}
