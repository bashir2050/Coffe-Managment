package cofe.in.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig  extends WebSecurityConfigurerAdapter {

	   @Autowired
	   CustomerUserDetailsService customerUserDetailsService;
	   
	   @Autowired
	   JwtFilter jwtFilter;
	   
	   @Override
	   public void configure(AuthenticationManagerBuilder auth) throws Exception {
	      auth
	      .userDetailsService(customerUserDetailsService);
	         
	   }


public PasswordEncoder passwordEncoder() {
	return NoOpPasswordEncoder.getInstance();
}
@Bean(name= BeanIds.AUTHENTICATION_MANAGER)
@Override
public AuthenticationManager authenticationManagerBean() throws Exception{
	return super.authenticationManagerBean();
}

@Override
public void configure(HttpSecurity http) throws Exception{
	  http.cors().configurationSource(request-> new CorsConfiguration().applyPermitDefaultValues())
      .and()
      .csrf().disable()
      .authorizeRequests()
         .antMatchers("/user/login", "/user/signup","/user/forgotPassword")
         .permitAll()
         .anyRequest().authenticated()
         .and()
         .exceptionHandling()
         .and()
         .sessionManagement()
         .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
      
	  http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
}
	
}
