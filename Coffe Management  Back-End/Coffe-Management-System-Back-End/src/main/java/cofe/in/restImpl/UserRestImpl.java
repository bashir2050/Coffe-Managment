package cofe.in.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cofe.in.service.UserService;
import cofe.in.utilities.CafeUtils;
import com.in.wrapper.UserWrapper;
import cofe.in.POJO.User;
import cofe.in.constant.CafeConstants;
import cofe.in.rest.*;

@RestController
@CrossOrigin("*")
public class UserRestImpl implements UserRest {
	
	@Autowired
	UserService userService;
	
	
	@Override
	public ResponseEntity<String> signUp(Map<String,String> requestMap)
	 {
		
			 
		try {
			return userService.signUp(requestMap);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
		
		
	}



	@Override
	public ResponseEntity<String> login(Map<String, String> requestMap) {
		// TODO Auto-generated method stub
		try {
			
		
		return userService.login(requestMap);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	
	@Override
	public ResponseEntity<List<UserWrapper>> getAllUser() {
		// TODO Auto-generated method stub
		try {
			
		
		return userService.getAllUser();
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return new ResponseEntity<List<UserWrapper>>(new ArrayList(),HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@Override
	public ResponseEntity<String> update(Map<String,String> requestMap){
		try {
			
			
			return userService.update(requestMap);
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
				
	}
	@Override
	public ResponseEntity<String> checkToken(){
try {
			
			
			return userService.checkToken();
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
				
	}
	@Override
	public ResponseEntity<String> changePassword(@RequestBody Map<String,String> requestMap){
		
try {
			
			
			return userService.changePassword(requestMap);
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
				
		
	}
	
	@Override
	public ResponseEntity<String> forgetPassword(@RequestBody Map<String,String> requestMap){
		
		try {
		return userService.forgetPassword(requestMap);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
			
	
	}
	
	

	 }
