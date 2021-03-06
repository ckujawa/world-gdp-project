package com.ckujawa.worldgdp.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ckujawa.worldgdp.dao.mapper.CountryRowMapper;
import com.ckujawa.worldgdp.model.Country;

import lombok.Setter;

//@Slf4j
@Service
@Setter
public class CountryDAO {

	@Autowired NamedParameterJdbcTemplate namedParamJdbcTemplate;
	
	private static final String SELECT_CLAUSE = "SELECT "
			+ "  	c.Code, "
			+ "		c.Name, "
			+ "		c.Continent, "
			+ "		c.region, "
			+ "		c.SurfaceArea surface_area, "
			+ "		c.IndepYear indep_year, "
			+ "		c.Population, "
			+ "		c.LifeExpectancy life_expectancy, "
			+ "		c.GNP, "
			+ "		c.LocalName local_name, "
			+ "		c.GovernmentForm government_form, "
			+ "		c.HeadOfState head_of_state, "
			+ "		c.code2 ,"
			+ "		c.capital ,"
			+ "		cy.name capital_name "
			+ " FROM country c"
			+ " LEFT OUTER JOIN city cy ON cy.id = c.capital ";
	
	private static final String SEARCH_WHERE_CLAUSE = " AND ( LOWER(c.name) "
			+ "	LIKE CONCAT('%', LOWER(:search), '%') ) ";
	
	private static final String CONTINENT_WHERE_CLAUSE = 
			" AND c.continent = :continent ";
	private static final String REGION_WHERE_CLAUSE = 
			" AND c.region = :region ";
	private static final String PAGINATION_CLAUSE = " ORDER BY c.code "
			+ "  LIMIT :offset , :size ";
	
	private static final Integer PAGE_SIZE = 10;
	
	public List<Country> getCountries(Map<String, Object> hashMap){
		int pageNo = 1;
		if ( hashMap.containsKey("pageNo") ) {
			pageNo = Integer.parseInt(hashMap.get("pageNo").toString());
		}
		Integer offset = (pageNo - 1) * PAGE_SIZE;
		hashMap.put("offset", offset);
		hashMap.put("size", PAGE_SIZE);
		System.out.println("Params: {}"+ hashMap.toString());
		System.out.println(SELECT_CLAUSE
				+ " WHERE 1 = 1 "
				+ (StringUtils.hasText((String)hashMap.get("search")) ? SEARCH_WHERE_CLAUSE : "")
				+ (StringUtils.hasText((String)hashMap.get("continent")) ? CONTINENT_WHERE_CLAUSE : "")
				+ (StringUtils.hasText((String)hashMap.get("region")) ? REGION_WHERE_CLAUSE : "")
				+ " ORDER BY c.code "
				+ "  LIMIT :offset , :size ");
		return namedParamJdbcTemplate.query(SELECT_CLAUSE
				+ " WHERE 1 = 1 "
				+ (StringUtils.hasText((String)hashMap.get("search")) ? SEARCH_WHERE_CLAUSE : "")
				+ (StringUtils.hasText((String)hashMap.get("continent")) ? CONTINENT_WHERE_CLAUSE : "")
				+ (StringUtils.hasText((String)hashMap.get("region")) ? REGION_WHERE_CLAUSE : "")
				+ PAGINATION_CLAUSE,
				hashMap, new CountryRowMapper());
	}
	
	public int getCountriesCount(Map<String, Object> params) {
		return namedParamJdbcTemplate.queryForObject("SELECT COUNT(*) FROM country c" 
				+ " WHERE 1 = 1 "
				+ (StringUtils.hasText((String)params.get("search")) ? SEARCH_WHERE_CLAUSE : "")
				+ (StringUtils.hasText((String)params.get("continent")) ? CONTINENT_WHERE_CLAUSE : "")
				+ (StringUtils.hasText((String)params.get("region")) ? REGION_WHERE_CLAUSE : ""),
				params, Integer.class);
	}

	public Country getCountryDetail(String code) {
		Map<String, String> params = new HashMap<String, String>();
		params.put("code", code);
		
		return namedParamJdbcTemplate.queryForObject(SELECT_CLAUSE 
				+"	WHERE c.code = :code", params, 
				new CountryRowMapper());
	}
	
	public void editCountryDetail(String code, Country country) {
		namedParamJdbcTemplate.update(" UPDATE country SET "
				+ " name = :name, "
				+ " localname = :localName, "
				+ " capital = :capital, "
				+ " continent = :continent, "
				+ " region = :region, "
				+ " HeadOfState = :headOfState, "
				+ " GovernmentForm = :governmentForm, "
				+ " IndepYear = :indepYear, "
				+ " SurfaceArea = :surfaceArea, "
				+ " population = :population, "
				+ " LifeExpectancy = :lifeExpectancy "
				+ "WHERE Code = :code ", 
				getCountryAsMap(code, country));
	}
	
	private Map<String, Object> getCountryAsMap(String code, Country country){
		Map<String, Object> countryMap = new HashMap<String, Object>();
		countryMap.put("name", country.getName());
		countryMap.put("localName", country.getLocalName());
		countryMap.put("capital", country.getCapital().getId());
		countryMap.put("continent", country.getContinent());
		countryMap.put("region", country.getRegion());
		countryMap.put("headOfState", country.getHeadOfState());
		countryMap.put("governmentForm", country.getGovernmentForm());
		countryMap.put("indepYear", country.getIndepYear());
		countryMap.put("surfaceArea", country.getSurfaceArea());
		countryMap.put("population", country.getPopulation());
		countryMap.put("lifeExpectancy", country.getLifeExpectancy());
		countryMap.put("code", code);
		return countryMap;
	}
	
}