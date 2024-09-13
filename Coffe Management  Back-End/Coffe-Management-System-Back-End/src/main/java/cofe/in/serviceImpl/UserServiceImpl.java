package cofe.in.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;

import cofe.in.dao.UserDao;
import cofe.in.jwt.CustomerUserDetailsService;
import cofe.in.jwt.JwtFilter;
import cofe.in.jwt.JwtUtil;
import cofe.in.service.UserService;
import cofe.in.utilities.CafeUtils;
import cofe.in.utilities.EmailUtils;
import lombok.extern.slf4j.Slf4j;
import com.in.wrapper.UserWrapper;
import cofe.in.POJO.Product;
import cofe.in.POJO.User;
import cofe.in.constant.CafeConstants;
import cofe.in.rest.*;

import com.fasterxml.jackson.databind.ser.std.ObjectArraySerializer;

import com.google.common.base.Strings;



@Slf4j
@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	AuthenticationManager authenticationManager; 
	@Autowired
	CustomerUserDetailsService customerUserDetailsService;
	
	@Autowired
	JwtUtil jwtutil;
	@Autowired
	JwtFilter jwtFilter;
    @Autowired
    EmailUtils emailutils;
	@Override
	public ResponseEntity<String> signUp(Map<String, String> requestMap) {
		// TODO Auto-generated method stub
				log.info("sigup)",requestMap);
				try {
				
				if(validateSignUpMap(requestMap)) {
					User user = userDao.findByEmail(requestMap.get("email"));
					if(Objects.isNull(user)) {
						userDao.save(getUserForMap(requestMap));
						return CafeUtils.getResponseEntity("sucessfully Registred",HttpStatus.OK);
						
					}else {
						return CafeUtils.getResponseEntity("Email already exist.",HttpStatus.BAD_REQUEST);
					}
					
				}else {
					return CafeUtils.getResponseEntity(CafeConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
				}
				}catch (Exception e) {
					e.printStackTrace();
				}
				return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
				
	}

	
	
	
	
	public boolean validateSignUpMap(Map<String, String> requestMap) {
		// TODO Auto-generated method stub
		if(requestMap.containsKey("name") && requestMap.containsKey("contactNumber")
		&& requestMap.containsKey("email") && requestMap.containsKey("password")) {
			
			return true;
		}
		return false;
		
	}
	
	private User getUserForMap(Map<String,String> requestMap) {
		
	         User user =new User();
		user.setName(requestMap.get("name"));
		user.setContactNumber(requestMap.get("contactName"));
		user.setEmail(requestMap.get("email"));
		user.setPassword(requestMap.get("password"));
		user.setStatus("false");
		user.setStatus("user");
		return user;
		
	}

	
	@Override
	public ResponseEntity<String> login(Map<String, String> requestMap) {
		
		
		// TODO Auto-generated method stub
		log.info("inside login(){}",requestMap);
		try {
			
			Authentication auth=authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(requestMap.get("email"),requestMap.get("password")));
		
			if(auth.isAuthenticated()) {
				if(customerUserDetailsService.getUserDetails().getStatus().equalsIgnoreCase("true")){
						return new ResponseEntity<String>("{\"token\":\""+ jwtutil.generateToken(customerUserDetailsService.getUserDetails().getEmail(),customerUserDetailsService.getUserDetails().getRole() +"\"}"), 
								HttpStatus.OK);
				
			}
			}else {
				return new ResponseEntity<String>("{\"message\""+ "Wait For admin Approvel."+"\"}",HttpStatus.BAD_REQUEST);
			}
			
	
		}catch (Exception e) {
			log.error("{}",e);
		}
		return new ResponseEntity<String>("{\"message\":\""+ "Bad Credentials"+"\"}",HttpStatus.BAD_REQUEST);
		
	}
	
	@Override
	public ResponseEntity<List<UserWrapper>> getAllUser() {
		try {
			
			if(jwtFilter.isAdmin()) {
				return new ResponseEntity<>(userDao.getAllUser(), HttpStatus.OK);
				
			}else {
				return new ResponseEntity<List<UserWrapper>>(new ArrayList(),HttpStatus.UNAUTHORIZED);
			}
			
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			return new ResponseEntity<List<UserWrapper>>(new ArrayList(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
	@Override
	public ResponseEntity<String> update(Map<String, String> requestMap) {
		// TODO Auto-generated method stub
				log.info("sigup)",requestMap);
			
					
				try {
					if(jwtFilter.isUser()) {
						Optional<User> optional=userDao.findById(Integer.parseInt(requestMap.get("id")));
						if(!optional.isEmpty()) {
							
							userDao.updateStatus(requestMap.get("status"), Integer.parseInt(requestMap.get("id")));
							
							sendMailToAllAdmin(requestMap.get("status"),optional.get().getEmail(), userDao.getAllAdmin());
							return CafeUtils.getResponseEntity("User Status Update Successfully.",HttpStatus.OK);
						}else {
							return CafeUtils.getResponseEntity("User id doesnt exist.",HttpStatus.OK);
						}
					}
					
				else {
					return CafeUtils.getResponseEntity("Email already exist.",HttpStatus.BAD_REQUEST);
					}
				}catch (Exception e) {
					e.printStackTrace();
				}
				return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
				}
	
	
	
	private void sendMailToAllAdmin(String status,String user, List<String> allAdmin) {
		allAdmin.remove(jwtFilter.getCurrentUser());
		if(status != null && status.equalsIgnoreCase("true")) {
			emailutils.sendSimpleMessage(jwtFilter.getCurrentUser(),"Account Approved","USER:- " + user + "\n is approved by \nADMIN:-" +jwtFilter.getCurrentUser(), allAdmin);
		
			emailutils.sendSimpleMessage(jwtFilter.getCurrentUser(),"Account Disabled","USER:-" + user + "\n is disabled by \n ADMIN:-" +jwtFilter.getCurrentUser(), allAdmin);
			
		}
		
	}
	
	@Override
	public ResponseEntity<String> checkToken(){
		
		return CafeUtils.getResponseEntity("tru", HttpStatus.OK);
		
		
	}
	
	@Override
	public ResponseEntity<String> changePassword(Map<String, String> requestMap){
		
try {
				
		User userObj = userDao.findByEmail(jwtFilter.getCurrentUser());
		if(! userObj.equals(null)) {
			if(userObj.getPassword().equals(requestMap.get("oldPassword"))) {
				userObj.getPassword().equals(requestMap.get("newPassword"));
				userDao.save(userObj);
				
			
			return CafeUtils.getResponseEntity("Password Updated Sucessfully",HttpStatus.OK);
			
			}
			return CafeUtils.getResponseEntity("Incorrect Old Password.",HttpStatus.BAD_REQUEST);
		}
		
	
		return CafeUtils.getResponseEntity(CafeConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
	
	}catch (Exception e) {
		e.printStackTrace();
	}
	return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	
	}
	
	@Override
	public ResponseEntity<String> forgetPassword(Map<String,String> requestMap){
		try {
		User userObj = userDao.findByEmail(jwtFilter.getCurrentUser());
		if(!Objects.isNull(userObj) && !Strings.isNullOrEmpty(userObj.getEmail()))
			
			emailutils.forgetMail(userObj.getEmail(), "Credential by Cafe Management System", userObj.getPassword());
			
			return CafeUtils.getResponseEntity("check your email Credential",HttpStatus.OK);

	}catch (Exception e) {
		e.printStackTrace();
	}
	return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	
	}
	
		
	}






	


