package cofe.in.utilities;

import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailUtils {
	
	@Autowired
	private JavaMailSender emailSender;
   public void sendSimpleMessage(String to, String subject, String text, List<String> list) {
        // MimeMessage object.
        SimpleMailMessage message = new SimpleMailMessage();

        // Set From Field: adding senders email to from field.
        message.setFrom("bashkey2050@gmail.com");

      message.setTo(to);

        // Set Subject: subject of the email
        message.setSubject(subject);

        // set body of the email.
        message.setText(text);
        if(list!=null && list.size()>0)
        	
        	message.setCc(getCcArray(list));
        
        emailSender.send(message);
   }
       private String[] getCcArray(List<String> ccList) {
    	   String[] cc = new String[ccList.size()];
    	   for(int i=0; i<ccList.size(); i++) {
    		   cc[i] = ccList.get(i);
    	   }
    	   return cc;
    	   }
       
       public void forgetMail(String to,String subject,String password) throws MessagingException{
    	   MimeMessage message = emailSender.createMimeMessage();
    	   MimeMessageHelper helper = new MimeMessageHelper(message, true);
    	   helper.setFrom("bashkey2050@gmail.com");
    	   helper.setTo(to);
    	   helper.setSubject(subject);
    	   String htmlsg = "<p><b> Your Login details for Cafe Management System </b><br><b>Email:</b>"+to+"<br><b>Password:</b>"+password+"<br><a href=\"http://localhost:4200/\">Click here to login</a></p>";
    	   message.setContent(htmlsg,"text/html");
    	   emailSender.send(message);
       }
       
    	   
       

}
