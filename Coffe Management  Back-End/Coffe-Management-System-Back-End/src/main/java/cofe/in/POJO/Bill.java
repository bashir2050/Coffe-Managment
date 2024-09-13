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

@NamedQuery(name="Bill.getAllBills",query="select b from Bill b order by b.id desc")

@NamedQuery(name="Bill.getBillByUserName",query="select b from Bill b where b.createdBy=:username order by b.id desc")



@Data
@Entity
@DynamicUpdate
@DynamicInsert

@Table(name="bill")
public class Bill implements Serializable  {
	
	private static final long seralVersionUID=1L;
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name="id")
		private Integer id;
		@Column(name="uuid")
		private String uuid;
		
		@Column(name="name")
		private String name;
		
		@Column(name="email")
		private String email;
		
		@Column(name="contactNumber")
		private String contactNumber;
		
		@Column(name="paymentMethod")
		private String paymentMethod;
		
		@Column(name="total")
		private Integer total;
		
		@Column(name="productDetails", columnDefinition = "json")
		private String productDetails;
		
		@Column(name="createdby")
		private String createdBy;
}
