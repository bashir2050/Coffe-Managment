package cofe.in.restImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import cofe.in.rest.DashboardRest;
import cofe.in.service.DashboardService;

@RestController
public class DashboardRestImpl implements DashboardRest {
	
	@Autowired
	DashboardService dashboardService;

	@Override
	public ResponseEntity<Map<String, Object>> getCount() {
		// TODO Auto-generated method stub
		return dashboardService.getCount();
	}

}
