package com.ckujawa.worldgdp.test.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.junit4.SpringRunner;

import com.ckujawa.worldgdp.dao.LookupDAO;
import com.ckujawa.worldgdp.test.config.TestDbConfiguration;



@RunWith(SpringRunner.class)
@SpringJUnitConfig( classes = {TestDbConfiguration.class, LookupDAO.class})
public class LookupDAOTest {

	@Autowired LookupDAO lookupDao;
	
	@Test public void test_getContinents() {
		Map<String, Object> params = new HashMap<>();
		List<String> continents = lookupDao.getContinents(params);
		assertThat(continents).hasSize(7);
		assertThat(continents.get(0)).isEqualTo("Africa");
	}
	
	@Test public void test_getRegions() {
		Map<String, Object> params = new HashMap<>();
		List<String> regions = lookupDao.getRegions(params);
		assertThat(regions).hasSize(25);
		assertThat(regions.get(0)).isEqualTo("Antarctica");
	}
	
	@Test public void test_getContinentForRegion() {
		List<String> continents = lookupDao.getContinentForRegion("Caribbean");
		assertThat(continents).hasSize(1);
		assertThat(continents.get(0)).isEqualTo("North America");
	}
	
	@Test public void test_getRegionsForContinent() {
		Map<String, Object> params = new HashMap<>();
		params.put("continent", "Africa");
		List<String> regions = lookupDao.getRegions(params);
		assertThat(regions).hasSize(5);
		assertThat(regions).contains("Central Africa");
		assertThat(regions).contains("Northern Africa");
		assertThat(regions).contains("Eastern Africa");
		assertThat(regions).contains("Western Africa");
		assertThat(regions).contains("Southern Africa");
	}
}
