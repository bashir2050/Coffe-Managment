package cofe.in.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import cofe.in.POJO.Category;
import cofe.in.constant.CafeConstants;
import cofe.in.rest.CategoryRest;
import cofe.in.service.CategoryService;
import cofe.in.utilities.CafeUtils;

@RestController
@CrossOrigin("*")
public class CategoryRestImpl implements CategoryRest {
	
	@Autowired
	CategoryService categoryService;
	
	@Override
	public ResponseEntity<String> addNewCategory(@RequestBody(required = true) Map<String,String> requestMap)
	{
		try {
			return categoryService.addNewCategory(requestMap);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
		
		
	
	}
	
	@Override
	public ResponseEntity<List<Category>> getAllCategory(String filterValue)
	{

		try {
			return categoryService.getAllCategory(filterValue);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	@Override
	public ResponseEntity<String> updateCategory(@RequestBody(required = true) Map<String,String> requestMap)
	{

		try {
			return categoryService.updateCategory(requestMap);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	

}
