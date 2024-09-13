package cofe.in.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.in.wrapper.UserWrapper;

public interface UserService {
	
	ResponseEntity<String> signUp(Map<String,String> requestMap);
	ResponseEntity<String> login(Map<String,String> requestMap);
    ResponseEntity<List<UserWrapper>> getAllUser() ;
    ResponseEntity<String> update(Map<String,String> requestMap);
    ResponseEntity<String> checkToken();
    
    ResponseEntity<String> changePassword(Map<String, String> requestMap);
    
    ResponseEntity<String> forgetPassword(Map<String,String> requestMap);
    
}
		
    	
		
