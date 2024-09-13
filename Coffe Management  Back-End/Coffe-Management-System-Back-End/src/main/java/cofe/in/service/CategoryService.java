package cofe.in.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import cofe.in.POJO.Category;

public interface CategoryService {
	
	ResponseEntity<String> addNewCategory(Map<String,String> requestMap);
	public ResponseEntity<List<Category>> getAllCategory(String filterValue);
	public ResponseEntity<String> updateCategory(Map<String,String> requestMap);
	
	
	

}
