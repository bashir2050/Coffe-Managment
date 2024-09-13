package cofe.in.restImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cofe.in.POJO.Bill;
import cofe.in.constant.CafeConstants;
import cofe.in.rest.BillRest;
import cofe.in.service.BillService;
import cofe.in.utilities.CafeUtils;

@RestController
public class BillRestImpl implements BillRest {
	
	@Autowired
	
	BillService billService;

	@Override
	public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {

		try {
			return billService.generateReport(requestMap);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	@Override	
public ResponseEntity<List<Bill>> getBills(){
	
	try {
		return billService.getBills();
		
	}catch (Exception e) {
		e.printStackTrace();
	}
	return null;
	}
	
	@Override
	public ResponseEntity<byte[]> getPdf(@RequestBody Map<String, Object> requestMap){
		
		try {
			return billService.getPdf(requestMap);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return null;
		
	}
	@Override
	public ResponseEntity<String> deleteBill(@PathVariable Integer id){
		
		try {
			return billService.deleteBill(id);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
		
		
	}
		
	}



