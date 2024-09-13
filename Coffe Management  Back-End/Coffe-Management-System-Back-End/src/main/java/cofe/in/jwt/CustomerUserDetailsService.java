package cofe.in.jwt;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.*;


import cofe.in.dao.UserDao;

import lombok.extern.slf4j.Slf4j;

import java.util.Objects;

import net.bytebuddy.implementation.bytecode.collection.ArrayLength;

@Slf4j
@Service
public class CustomerUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao;
    
    private cofe.in.POJO.User userDetails;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("inside loadUserByUsername{)",username);
    	userDetails = userDao.findByEmail(username);
        if (!Objects.isNull(userDetails))
            return new User(userDetails.getEmail(),userDetails.getPassword(),new ArrayList<>());
            
            else
            	throw new UsernameNotFoundException("user not Found");
        }
       
    public cofe.in.POJO.User getUserDetails(){
    	return userDetails;
    }
    }
