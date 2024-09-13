package com.in.wrapper;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import cofe.in.POJO.Category;
import lombok.Data;

@Data
public class ProductWrapper {
	
	private Integer id;
	
	private String name;
	
	private Category category;
	
	private String description;

	private Integer price;
	

	private String status;
	

	private Integer categoryId;
	
	private String categoryName;
	
	public ProductWrapper() {
		
	}

	public ProductWrapper(Integer id, String name, String description, Integer price, String status,
			Integer categoryId, String categoryName) {
	
		this.id = id;
		this.name = name;
		
		this.description = description;
		this.price = price;
		this.status = status;
		this.categoryId = categoryId;
		this.categoryName = categoryName;
	}
	
/*public ProductWrapper(Integer id,String Name,String description,Integer price,String status,Integer categoryId,String categoryName) {
		
	}*/
	
	public ProductWrapper(Integer id, String name) {
		this.id = id;
		this.name = name;
		
	}
	
	public ProductWrapper(Integer id, String name, String description, Integer price) {
		
		this.id = id;
		this.name = name;
	
		this.description = description;
		this.price = price;
		
	}


}
