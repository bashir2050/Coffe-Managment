package cofe.in.POJO;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NamedQuery(name="Product.getAllProduct",query="select new com.in.wrapper.ProductWrapper(p.id,p.name,p.description,p.price,p.status,p.category.id,p.category.name) from Product p")

@NamedQuery(name="Product.updateProductStatus", query="update Product p set p.status=:status where p.id=:id")

@NamedQuery(name="Product.getProductByCategory", query="select new com.in.wrapper.ProductWrapper(p.id,p.name) from Product p where p.category.id=:id and p.status='true'")

@NamedQuery(name="Product.getProductById", query="select new com.in.wrapper.ProductWrapper(p.id,p.name,p.description,p.price) from Product p where p.id=:id")



@Data
@Entity
@DynamicUpdate
@DynamicInsert

@Table(name="product")
public class Product implements java.io.Serializable  {
	
	private static final long seralVersionUID=1L;
		@Id		
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name="id")
		private Integer id;
		@Column(name="name")
		private String name;
		
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "category_fk", nullable = false)
		private Category category;
		
		@Column(name="description")
		private String description;
		
		@Column(name="price")
		private Integer price;
		@Column(name="status")
		private String status;

}
