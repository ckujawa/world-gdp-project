package com.ckujawa.worldgdp.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class LookupDAO {

	@Autowired 
	NamedParameterJdbcTemplate namedParamJdbcTemplate;
	
	public List<String> getContinents(Map<String, Object> params){
		return namedParamJdbcTemplate.queryForList("SELECT DISTINCT continent FROM country "
				+ (StringUtils.hasText((String)params.get("region")) 
						? "where region = :region" 
						: " ORDER BY continent"), 
				params, String.class);
	}
	
	public List<String> getContinentForRegion(String region){
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("region", region);
		return namedParamJdbcTemplate.queryForList("SELECT DISTINCT continent FROM country " +
				"WHERE region = :region", params, String.class);
	}
	
	public List<String> getRegions(Map<String, Object> params){
		return namedParamJdbcTemplate.queryForList("SELECT DISTINCT region FROM country "
				+ (StringUtils.hasText((String)params.get("continent")) ? 
					" where continent = :continent" : 
					" ORDER BY region"), 
				params, String.class);
	}
	
	public List<String> getHeadOfStates(){
		MapSqlParameterSource params = new MapSqlParameterSource();
		return namedParamJdbcTemplate.queryForList("SELECT DISTINCT headofstate FROM country where headofstate is not null and headofstate != \"\""
				+ " ORDER BY headofstate", 
				params, String.class);
	}
	
	public List<String> getGovernmentTypes(){
		MapSqlParameterSource params = new MapSqlParameterSource();
		return namedParamJdbcTemplate.queryForList("SELECT DISTINCT governmentform FROM country "
				+ " ORDER BY governmentform", 
				params, String.class);
	}
	
	
}
