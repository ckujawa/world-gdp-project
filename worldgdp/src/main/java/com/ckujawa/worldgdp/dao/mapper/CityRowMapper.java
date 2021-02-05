package com.ckujawa.worldgdp.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.ckujawa.worldgdp.model.City;

public class CityRowMapper implements RowMapper<City> {

	public City mapRow(ResultSet rs, int rowNum) throws SQLException{
		City city = new City();
	    city.setCountryCode(rs.getString("countrycode"));
	    city.setDistrict(rs.getString("district"));
	    city.setId(rs.getLong("id"));
	    city.setName(rs.getString("name"));
	    city.setPopulation(rs.getLong("population"));
	    return city;
	}
}
