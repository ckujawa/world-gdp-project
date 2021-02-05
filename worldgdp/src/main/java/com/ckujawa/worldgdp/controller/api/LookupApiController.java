package com.ckujawa.worldgdp.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ckujawa.worldgdp.dao.LookupDAO;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/lookup")
@Slf4j
public class LookupApiController {

	@Autowired private LookupDAO dao;
	
	@GetMapping(value="/continents")
	public ResponseEntity<?> getContinents(){
		try {
			List<String> continents = dao.getContinents();
			return ResponseEntity.ok(continents);
		} catch (Exception e) {
			log.error("An error occurred when retrieving the list of continents.", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred when retrieving the list of continents.");
		}
		
	}
	
	@GetMapping(value="/regions")
	public ResponseEntity<?> getRegions(){
		try {
			List<String> regions = dao.getRegions();
			return ResponseEntity.ok(regions);
		} catch(Exception e) {
			log.error("An error occurred when retrieving regions.", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("We were unable to retrieve the regions.");
		}
	}
	
	@GetMapping(value="/headsOfState")
	public ResponseEntity<?> getHeadsOfState() {
		try {
			List<String> heads = dao.getHeadOfStates();
			return ResponseEntity.ok(heads);
		} catch(Exception e) {
			log.error("An error occurred when retrieving heads of state.", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("We were unable to retrieve the heads of state...or OFF WITH THEIR HEADS!");
		}
	}
	
	@GetMapping(value="/government")
	public ResponseEntity<?> getGovernments(){
		try {
			List<String> governments = dao.getGovernmentTypes();
			return ResponseEntity.ok(governments);
		} catch(Exception e) {
			log.error("An error occurred when retrieving governments.", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("We were unable to retrieve the governments.");
		}
	}
}
