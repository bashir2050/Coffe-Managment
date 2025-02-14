package cofe.in.jwt;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;



@Component
public class JwtFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	 @Autowired
	   CustomerUserDetailsService service;
	 
	 Claims claims=null;
	 
	 private String userName;

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain)
			throws ServletException, IOException {
		if(httpServletRequest.getServletPath().matches("/user/login|/user/forgotPassword")) {
			
			filterChain.doFilter(httpServletRequest,httpServletResponse);
		}else {
			 String authorizationHeader = httpServletRequest.getHeader("Authorization");
			 String token=null;
			 
			 if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
				 token = authorizationHeader.substring(7);
				 userName= jwtUtil.extractUsername(token);
				 claims = jwtUtil.exractAllClaims(token);
			 }
			 
			 if(userName !=null && SecurityContextHolder.getContext().getAuthentication()==null) {
				 UserDetails userDetails = service.loadUserByUsername(userName);
				 if(jwtUtil.validateToken(token, userDetails)) {
					 UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
							 new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
					 usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest)
					 );
					 SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				 }
				 
			 }
			 filterChain.doFilter(httpServletRequest,httpServletResponse);
				
			 
		}
			 
			/* public Boolean validateToken(String token, UserDetails userDetails) {
				 final String username= extractUsername(token);
				 return (username.equals(userDetails.getUsername() && !isTokenExpired(token));
			 }*/
			 
			
		

	}
	public boolean isAdmin() {
		return "admin".equalsIgnoreCase((String) claims.get("role"));
	}
	
	public boolean isUser() {
		return "user".equalsIgnoreCase((String) claims.get("role"));
	}
    public String getCurrentUser() {
    	return userName;
    }
    
    
}
