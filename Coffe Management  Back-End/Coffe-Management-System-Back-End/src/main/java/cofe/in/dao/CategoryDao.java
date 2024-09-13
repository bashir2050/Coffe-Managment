package cofe.in.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cofe.in.POJO.Category;

@Repository
public interface CategoryDao extends JpaRepository<Category, Integer> {
	
	List<Category> getAllCategory();

}
