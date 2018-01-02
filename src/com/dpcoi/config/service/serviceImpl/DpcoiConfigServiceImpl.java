package com.dpcoi.config.service.serviceImpl;/**
 * Created by liangzhifu
 * DATE:2017/6/17.
 */

import com.dpcoi.config.dao.DpcoiConfigCodeDao;
import com.dpcoi.config.dao.DpcoiConfigDao;
import com.dpcoi.config.domain.DpcoiConfig;
import com.dpcoi.config.domain.DpcoiConfigCode;
import com.dpcoi.config.query.DpcoiConfigQuery;
import com.dpcoi.config.service.DpcoiConfigService;
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
@Service("dpcoiConfigService")
public class DpcoiConfigServiceImpl implements DpcoiConfigService {

    @Resource(name="dpcoiConfigDao")
    private DpcoiConfigDao dpcoiConfigDao;

    @Resource(name = "dpcoiConfigCodeDao")
    private DpcoiConfigCodeDao dpcoiConfigCodeDao;

    @Override
    public Integer addDpcoiConfig(DpcoiConfig dpcoiConfig) throws ServiceException {
        return this.dpcoiConfigDao.insertDpcoiConfig(dpcoiConfig);
    }

    @Override
    public Integer deleteDpcoiConfig(DpcoiConfig dpcoiConfig) throws ServiceException {
        dpcoiConfig.setDeleteState("1");
        return this.dpcoiConfigDao.updateDpcoiConfig(dpcoiConfig);
    }

    @Override
    public List<Map<String, Object>> queryDpcoiConfigList(DpcoiConfigQuery dpcoiConfigQuery) throws ServiceException {
        return this.dpcoiConfigDao.selectDpcoiConfigList(dpcoiConfigQuery);
    }

    @Override
    public List<Map<String, Object>> queryDpcoiConfigPageList(DpcoiConfigQuery dpcoiConfigQuery) throws ServiceException {
        return this.dpcoiConfigDao.selectDpcoiConfigListPage(dpcoiConfigQuery);
    }

    @Override
    public Integer queryDpcoiConfigCount(DpcoiConfigQuery dpcoiConfigQuery) throws ServiceException {
        return this.dpcoiConfigDao.selectDpcoiConfigCount(dpcoiConfigQuery);
    }

    @Override
    public void addUploadFile(HSSFWorkbook wb) throws ServiceException {
        if(wb != null){
            //得到第一个工作薄
            HSSFSheet sheet = wb.getSheetAt(0);
            if(sheet.getLastRowNum() <= 0){
                throw new ServiceException("excel为空文件无法导入!");
            }

            //处理文件头
            HSSFRow firstRow=sheet.getRow(0);
            for(int index = 0; index < firstRow.getLastCellNum(); index++){
                HSSFCell cell= firstRow.getCell(index);
                if(cell == null||"".equals(cell.getStringCellValue())){
                    throw new ServiceException("上传文件第["+(index+1)+"]列标题为空，请重新下载报表模板，在进行上传!");
                }
            }

            List<DpcoiConfigCode> dpcoiConfigCodeList = this.dpcoiConfigCodeDao.selectDpcoiConfigCodeList();
            List<DpcoiConfig> dpcoiConfigList = new LinkedList<DpcoiConfig>();
            //处理数据
            for(int index = 1; index < sheet.getLastRowNum()+1; index++){
                HSSFRow row = sheet.getRow(index);
                HSSFCell cell0 = row.getCell(0);
                if(cell0 == null){
                    throw new ServiceException("上传文件第1列[下拉菜单类型]为必填字段，请检查第"+(index+1)+"行是否有空值！");
                }
                String configCodeName = cell0.getStringCellValue();
                if(configCodeName == null || "".equals(configCodeName)){
                    throw new ServiceException("上传文件第1列[下拉菜单类型]为必填字段，请检查第"+(index+1)+"行是否有空值！");
                }
                HSSFCell cell1 = row.getCell(1);
                if(cell1 == null){
                    throw new ServiceException("上传文件第2列[下拉菜单选项]为必填字段，请检查第"+(index+1)+"行是否有空值！");
                }
                String configValue = cell1.getStringCellValue();
                if(configValue == null || "".equals(configValue)){
                    throw new ServiceException("上传文件第2列[下拉菜单选项]为必填字段，请检查第"+(index+1)+"行是否有空值！");
                }
                DpcoiConfig dpcoiConfig = new DpcoiConfig();
                boolean flag = false;
                for(DpcoiConfigCode dpcoiConfigCode : dpcoiConfigCodeList){
                    if(dpcoiConfigCode.getConfigCodeName().equals(configCodeName)){
                        flag = true;
                        dpcoiConfig.setConfigCodeId(dpcoiConfigCode.getConfigCodeId());
                    }
                }
                if(flag){
                    dpcoiConfig.setConfigValue(configValue);
                    dpcoiConfig.setDeleteState("0");
                    dpcoiConfigList.add(dpcoiConfig);
                }else {
                    throw new ServiceException("上传文件第1列[下拉菜单类型]不存在，请检查第"+(index+1)+"行值！");
                }
            }

            //插入数据库
            for(DpcoiConfig dpcoiConfig : dpcoiConfigList){
                this.dpcoiConfigDao.insertDpcoiConfig(dpcoiConfig);
            }
        }
    }
}
