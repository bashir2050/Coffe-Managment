package cofe.in.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import cofe.in.POJO.Product;
import com.in.wrapper.*;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
	
	List<ProductWrapper> getAllProduct();
	
	@Modifying
	@Transactional
	
	Integer updateProductStatus(@Param("status") String status, @Param("id") Integer id);
	
	List<ProductWrapper> getProductByCategory(@Param("id") Integer id);
	
	ProductWrapper getProductById(@Param("id") Integer id);
			

}
