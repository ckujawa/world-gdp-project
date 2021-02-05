package com.ckujawa.worldgdp.controller.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ckujawa.worldgdp.dao.CountryDAO;
import com.ckujawa.worldgdp.external.WorldBankApiClient;
import com.ckujawa.worldgdp.model.Country;
import com.ckujawa.worldgdp.model.CountryGDP;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/countries")
@Slf4j
public class CountryAPIController {

	@Autowired CountryDAO countryDao;
	@Autowired WorldBankApiClient worldBankApiClient;
	
	@GetMapping
	public ResponseEntity<?> getCountries(
			@RequestParam(name="search", required = false) String searchTerm,
		    @RequestParam(name="continent", required = false) String continent,
		    @RequestParam(name="region", required = false) String region,
		    @RequestParam(name="pageNo", required = false) Integer pageNo
			){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("search", searchTerm);
		params.put("continent", continent);
		params.put("region", region);
		if (pageNo != null) {
			params.put("pageNo", pageNo.toString());
		}
		try {
			List<Country> countries = countryDao.getCountries(params);
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("list", countries);
			response.put("count", countryDao.getCountriesCount(params));
			return ResponseEntity.ok(response);
		} catch(Exception e) {
			log.error("An error occurred while retrieving countries: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("we\'re sorry. we were unable to retrieve the countries for you--but we're working on it! Please try again later.");
		}
	}
	
	@GetMapping(value="/count")
	public ResponseEntity<?> countCountries(
				@RequestParam(name="search") String searchClause,
				@RequestParam(name="continent") String continent,
				@RequestParam(name="region") String region
			) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (searchClause != null && !searchClause.isEmpty()) {
			params.put("search", searchClause);
		}
		
		if (continent != null && !continent.isEmpty()) {
			params.put("continent", continent);
		}
		
		if (region != null && !region.isEmpty()) {
			params.put("region", region);
		}
		try {
			int count = countryDao.getCountriesCount(params);
			return ResponseEntity.ok(count);
		} catch (Exception e) {
			log.error("Unable to get the country count using: " + params.toString(), e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("We were unable to count the countries for you.");
		}
	}
	
	
	@PostMapping(value="/{countryCode}",
			consumes = {MediaType.APPLICATION_JSON_VALUE} )
	public ResponseEntity<?> editCountry(@PathVariable String countryCode, 
			@Valid @RequestBody Country country)
	{
		try {
			countryDao.editCountryDetail(countryCode, country);
			Country updated = countryDao.getCountryDetail(countryCode);
			
			return ResponseEntity.ok(updated);
		} catch (Exception e) {
			log.error("An error occurred when editing country: {} with data: {}",
					countryCode, country, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred when editing your country. Please try again later");
		}
	}
	
	@GetMapping("/{countryCode}/gdp")
	public ResponseEntity<?> getGDP(@PathVariable String countryCode){
		try {
			List<CountryGDP> gdpResult = worldBankApiClient.getGDP(countryCode);
			
			return ResponseEntity.ok(gdpResult);
		} catch (ParseException e) {
			log.error("An error occurred when retrieving GDP data for {} from the World Bank API", countryCode, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred when retrieving the GDP Information for " + countryCode + " from the World Bank.");
		}
	}
	
}
