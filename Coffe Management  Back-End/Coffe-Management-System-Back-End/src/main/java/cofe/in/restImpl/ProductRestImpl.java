package cofe.in.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cofe.in.constant.CafeConstants;
import cofe.in.rest.ProductRest;
import cofe.in.service.ProductService;
import cofe.in.utilities.CafeUtils;
import com.in.wrapper.ProductWrapper;

@RestController
public class ProductRestImpl implements ProductRest {
	
	@Autowired
	
	ProductService productService;

	@Override
	public ResponseEntity<String> addNewProduct(Map<String, String> requestMap) {
		try {
			return productService.addNewProduct(requestMap);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
		
		
	
	}

	@Override
	public ResponseEntity<List<ProductWrapper>> getAllProduct() {
		try {
			return productService.getAllProduct();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
		
		
	
	}
	@Override
	public ResponseEntity<String> updateProduct(@RequestBody Map<String,String> requestMap){
		
		try {
			return productService.updateProduct(requestMap);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	@Override
	public ResponseEntity<String> deleteProduct(@PathVariable Integer id){
		
		try {
			return productService.deleteProduct(id);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	@Override
	public ResponseEntity<String> updateStatus(@RequestBody Map<String,String> requestMap){
		
		try {
			return productService.updateStatus(requestMap);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
		
		
	}
	@Override
	public ResponseEntity<List<ProductWrapper>> getByCategory(@PathVariable Integer id){
	
		
		try {
			return productService.getByCategory(id);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@Override
	public ResponseEntity<ProductWrapper> getProductById(@PathVariable Integer id){
		
		try {
			return productService.getProductById(id);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ProductWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
		
	}
	
	

