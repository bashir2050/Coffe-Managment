package cofe.in.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cofe.in.POJO.Bill;

@Repository
public interface BillDao extends JpaRepository<Bill, Integer> {

	List<Bill> getAllBills();

	List<Bill> getBillByName(@Param("username") String username);

}
