package cofe.in.dao;

import cofe.in.POJO.User;
import com.in.wrapper.UserWrapper;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserDao extends JpaRepository<User, Integer> {
	
	User findByEmail(@Param("email") String email);
List<UserWrapper> getAllUser();
List<String> getAllAdmin();

@Transactional
@Modifying
Integer updateStatus(@Param("status") String status, @Param("id") Integer id);

//User findByEmail(String email);

}
