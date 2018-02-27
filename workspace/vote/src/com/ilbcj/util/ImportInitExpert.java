package com.ilbcj.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ilbcj.dao.ExpertDAO;
import com.ilbcj.dao.MajorDAO;
import com.ilbcj.dao.UnitDAO;
import com.ilbcj.dao.impl.ExpertDAOImpl;
import com.ilbcj.dao.impl.MajorDAOImpl;
import com.ilbcj.dao.impl.UnitDAOImpl;
import com.ilbcj.model.Expert;
import com.ilbcj.model.ExpertMajorType;
import com.ilbcj.model.MajorType;
import com.ilbcj.model.Unit;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

public class ImportInitExpert {
	
	public void importBattleResult() throws Exception {
		File inData = new File("E:\\work\\vote\\doc\\Expert_CC.xlsx");
		InputStream in=new FileInputStream(inData);
        Workbook workbook = WorkbookFactory.create(in);
        
        int sheetCount = workbook.getNumberOfSheets();  //Sheet的数量  
        for (int s = 0; s < sheetCount; s++) {
        	Sheet sheet = workbook.getSheetAt(s);
            String sheetName = sheet.getSheetName();
            if( sheetName.equals("长春专家") ) {
            	parseRecord(sheet);
            }
        }
        
        in.close();
	}

	private void parseRecord(Sheet sheet) throws Exception {
		int rowCount = sheet.getPhysicalNumberOfRows(); //获取总行数
		Map<String, Integer> idx = new HashMap<String, Integer>();

		ExpertDAO edao = new ExpertDAOImpl();
		MajorDAO mdao = new MajorDAOImpl();
		List<MajorType> mts = mdao.GetAllMajorTypes();
		Map<String, MajorType> majorMap = new HashMap<String, MajorType>();
		for(MajorType mt : mts) {
			majorMap.put(mt.getName(), mt);
		}
		
		UnitDAO udao = new UnitDAOImpl();
		List<Unit> units = udao.GetAllUnits();
		Map<String, Unit> unitMap = new HashMap<String, Unit>();
		for(Unit unit : units) {
			unitMap.put(unit.getName(), unit);
		}
		String name = "";
		String nameTemp = "";
		String major = "";
		String unit = "";
		String tel = "";
		String idsn = "";
		Expert expert = null;
		
		//遍历每一行  
        for (int r = 0; r < rowCount; r++) {
        	
        	Row row = sheet.getRow(r);
        	if(row == null) {
        		continue;
        	}
        	
        	int cellCount = row.getLastCellNum(); //获取总列数 
        	//遍历每一列  
            for (int c = 0; c < cellCount; c++) {
            	Cell cell = row.getCell(c);
            	String cellValue = getCellValue(cell);

            	if(r == 0) {
            		if ( "专家姓名".equals(cellValue) ) {
            			idx.put("专家姓名", c);
            		} else if ( "专业".equals(cellValue) ) {
            			idx.put("专业", c);
            		} else if ( "单位名称".equals(cellValue) ) {
            			idx.put("单位名称", c);
            		} else if ( "手机号".equals(cellValue) ) {
            			idx.put("手机号", c);
            		} else if ( "身份证号".equals(cellValue) ) {
            			idx.put("身份证号", c);
            		} 
            	} else if(r>0){
            		if(idx.size() == 0) {
            			throw new Exception("导入数据文件格式不正确!");
            		}
            		if( c == idx.get("专家姓名") ) {
            			if( cellValue != null && cellValue.length() > 0 ) {
            				name = cellValue;
            			}
            		} else if ( c == idx.get("专业") ) {
            			if( cellValue != null && cellValue.length() > 0 ) {
            				major = cellValue;
            			}
            		} else if ( c== idx.get("单位名称") ) {
            			if( cellValue != null && cellValue.length() > 0 ) {
            				unit = cellValue;
            			}
            		} else if ( c== idx.get("手机号") ) {
            			if( cellValue != null && cellValue.length() > 0 ) {
            				tel = cellValue;
            			}
            		} else if ( c== idx.get("身份证号") ) {
            			if( cellValue != null && cellValue.length() > 0 ) {
            				idsn = cellValue;
            			}
            		}
            	}
            }
            
//          String name = "";
//    		String nameTemp = "";
//    		String major = "";
//    		String unit = "";
//    		String tel = "";
//    		String idsn = "";    		
            if( r > 0 ) {
            	Unit u = unitMap.get(unit);
        		MajorType m = majorMap.get(major);
            	if ( !nameTemp.equals(name) ) {
            		if(name.length() == 0 || major.length() == 0 || unit.length() == 0 || tel.length() == 0 || idsn.length() == 0) {
            			System.out.println("数据格式不正确[name:" + name + "]");
            			continue;
            		}
            		if( u == null) {
            			System.out.println("单位数据缺失[name:" + name + ", unit:" + unit + "]");
            			continue;
            		}
            		if( m == null ) {
            			System.out.println("专业数据缺失[name:" + name + ", majorType:" + major + "]");
            			continue;
            		}
            		nameTemp = name;
            		expert = new Expert();
            		expert.setName(name);
            		expert.setCity("长春");
            		expert.setTel(tel);
            		expert.setIdsn(idsn);
            		expert.setUnitId(u.getId());
            		expert.setStatus(Expert.STATUS_USING);
            		expert = edao.AddExpert(expert);
            	}
            	
            	ExpertMajorType emt = new ExpertMajorType();
        		emt.setExpertId(expert.getId());
        		emt.setMajorId(m.getId());
        		emt = mdao.AddExpertMajorType(emt);
            }
        }
        return;
	}
	
	private String getCellValue(Cell cell) {
		if(cell == null) {
			return "";
		}
		int cellType = cell.getCellType();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String cellValue = null;  
        switch(cellType) {
            case Cell.CELL_TYPE_STRING: //文本  
                cellValue = cell.getStringCellValue();  
                break;  
            case Cell.CELL_TYPE_NUMERIC: //数字、日期  
                if(DateUtil.isCellDateFormatted(cell)) {  
                    cellValue = sdf.format(cell.getDateCellValue()); //日期型  
                }  
                else {  
                    cellValue = String.valueOf(cell.getNumericCellValue()); //数字  
                    if(cellValue.contains(".")) {
                    	cellValue = cellValue.substring(0, cellValue.indexOf('.'));
                    }
                }  
                break;  
            case Cell.CELL_TYPE_BOOLEAN: //布尔型  
                cellValue = String.valueOf(cell.getBooleanCellValue());  
                break;  
            case Cell.CELL_TYPE_BLANK: //空白  
                cellValue = cell.getStringCellValue();  
                break;  
            case Cell.CELL_TYPE_ERROR: //错误  
                cellValue = "错误";  
                break;  
            case Cell.CELL_TYPE_FORMULA: //公式  
                cellValue = "错误";  
                break;  
            default:  
                cellValue = "错误";  
        }
        cellValue = cellValue.trim();
        return cellValue;
	}
	
	public static void main(String[] args) {
		try{
			ImportInitExpert test = new ImportInitExpert();
			test.importBattleResult();
			System.out.println("finish.");
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return;
	}
}
