package cofe.in.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.google.common.base.Strings;

import cofe.in.POJO.Category;
import cofe.in.POJO.Product;
import cofe.in.constant.CafeConstants;
import cofe.in.dao.ProductDao;
import cofe.in.jwt.JwtFilter;
import cofe.in.service.ProductService;
import cofe.in.utilities.CafeUtils;
import com.in.wrapper.*;
@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	ProductDao productDao;
	
	@Autowired
	JwtFilter jwtFilter;
	
	@Override
	public ResponseEntity<String> addNewProduct(Map<String, String> requestMap) {
		// TODO Auto-generated method stub
		try {
			if(jwtFilter.isAdmin()) {
		if(validateCategoryMap(requestMap,false)) {
			productDao.save(getProductFromMap(requestMap, false));
		
				return CafeUtils.getResponseEntity("Category Added Successfully", HttpStatus.OK);
				
			}
			return CafeUtils.getResponseEntity("Category Added Successfully", HttpStatus.OK);
			
			
		
		}else {
			return CafeUtils.getResponseEntity(CafeConstants.UNAUTHORIZED_ACCESS, HttpStatus.BAD_REQUEST);
		}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	
	}
	
	public boolean validateCategoryMap(Map<String, String> requestMap, boolean validateId) {
		// TODO Auto-generated method stub
		if(requestMap.containsKey("name")) {
			if(requestMap.containsKey("id") && validateId){
			
			return true;
		}else if(!validateId){
			return true;
		}
		}
		return false;
		
}
	
	
private Product getProductFromMap(Map<String, String> requestMap, Boolean isAdd) {
		
		Category category = new Category();
		category.setId(Integer.parseInt(requestMap.get("categoryid")));
		
		Product product =new Product();
		
		if(isAdd) {
			product.setId(Integer.parseInt(requestMap.get("id")));
		} else {
			product.setStatus("true");
		}
		
		product.setCategory(category);
		product.setName(requestMap.get("name"));
		product.setDescription(requestMap.get("description"));
		product.setPrice(Integer.parseInt(requestMap.get("price")));
		return product;
	}
@Override
public ResponseEntity<List<ProductWrapper>> getAllProduct(){
	
	try {
	
			
			return new ResponseEntity<>(productDao.getAllProduct(), HttpStatus.OK);
			
	}catch (Exception e) {
		e.printStackTrace();
	}
	return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	
}
@Override
public ResponseEntity<String> updateProduct(Map<String,String> requestMap){
	
	try {
		if(jwtFilter.isAdmin()) {
			if(validateCategoryMap(requestMap,true)) {
				Optional<Product> optional =productDao.findById(Integer.parseInt(requestMap.get("id")));
			if(!optional.isEmpty()) {
				Product product = getProductFromMap(requestMap, true);
				product.setStatus(optional.get().getStatus());
				productDao.save(product);
				//productDao.save(getProductFromMap(requestMap, true));
				return CafeUtils.getResponseEntity("Category Updated Successfully", HttpStatus.OK);
				
			
				
		}else {
			return CafeUtils.getResponseEntity("Product id doesnt exist", HttpStatus.OK);
			
		}
			}
			}else {
				return CafeUtils.getResponseEntity(CafeConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
				
	}}catch (Exception e) {
		e.printStackTrace();
	}
	return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	
}

@Override
public ResponseEntity<String> deleteProduct(Integer id){
	try {
		if(jwtFilter.isAdmin()) {
				Optional optional =productDao.findById(id);
			if(!optional.isEmpty()) {
				productDao.deleteById(id);;
				//productDao.save(getProductFromMap(requestMap, true));
				return CafeUtils.getResponseEntity("Product deleted Successfully", HttpStatus.OK);
				
			
				
		}else {
			return CafeUtils.getResponseEntity("Product id doesnt exist", HttpStatus.OK);
			
		}
			
			}else {
				return CafeUtils.getResponseEntity(CafeConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
				
	}}catch (Exception e) {
		e.printStackTrace();
	}
	return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	
	
}

public ResponseEntity<String> updateStatus(@RequestBody Map<String,String> requestMap){
	
	
	try {
		if(jwtFilter.isAdmin()) {
			Optional optional =productDao.findById(Integer.parseInt(requestMap.get("id")));
			if(!optional.isEmpty()) {
			productDao.updateProductStatus(requestMap.get("status"),Integer.parseInt(requestMap.get("id")));
			//productDao.save(getProductFromMap(requestMap, true));
			return CafeUtils.getResponseEntity("Product Status Updated Successfully", HttpStatus.OK);
		
			
				
		}else {
			return CafeUtils.getResponseEntity("Product id doesnt exist", HttpStatus.OK);
			
		}
			
			}else {
				return CafeUtils.getResponseEntity(CafeConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
				
	}}catch (Exception e) {
		e.printStackTrace();
	}
	return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	

}

public ResponseEntity<List<ProductWrapper>> getByCategory(Integer id){
	
	try {
		
		
		return new ResponseEntity<>(productDao.getProductByCategory(id), HttpStatus.OK);
		
}catch (Exception e) {
	e.printStackTrace();
}
return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);

	
}


public ResponseEntity<ProductWrapper> getProductById(Integer id){
	
try {
		
		
		return new ResponseEntity<>(productDao.getProductById(id), HttpStatus.OK);
		
}catch (Exception e) {
	e.printStackTrace();
}
return new ResponseEntity<>(new ProductWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);

}

}
	

