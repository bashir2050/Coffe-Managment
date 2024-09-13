package cofe.in.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.in.wrapper.ProductWrapper;

public interface ProductService {
	
	public ResponseEntity<String> addNewProduct(Map<String, String> requestMap);
	public ResponseEntity<List<ProductWrapper>> getAllProduct();
	public ResponseEntity<String> updateProduct(Map<String,String> requestMap);
	
	public ResponseEntity<String> deleteProduct(Integer id);
	
	ResponseEntity<String> updateStatus(Map<String,String> requestMap);
	
	public ResponseEntity<List<ProductWrapper>> getByCategory(Integer id);
	
	public ResponseEntity<ProductWrapper> getProductById(Integer id);
		
		
		
		
		

}
