package com.ckujawa.worldgdp.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ckujawa.worldgdp.dao.CountryLanguageDAO;
import com.ckujawa.worldgdp.model.CountryLanguage;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/languages")
@Slf4j
public class CountryLanguageAPIController {

	@Autowired CountryLanguageDAO langDao;
	
	@GetMapping("/{countryCode}")
	public ResponseEntity<?> getLanguagesForCountry(@PathVariable String countryCode, 
			@RequestParam(name="pageNo", defaultValue="1") Integer pageNo){
		try {
			List<CountryLanguage> langs = langDao.getLanguages(countryCode, pageNo);
			return ResponseEntity.ok(langs);
		} catch (Exception e) {
			log.error("An error occurred when retrieving the languages for countryCode {}", countryCode, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred when retrieving the languages for countryCode " + countryCode);
		}
	}
	
	@PostMapping("/{countryCode}")
	public ResponseEntity<?> addLanguageForCountry(@PathVariable String countryCode, 
			@Valid @RequestBody CountryLanguage lang){
		try {
			if (langDao.languageExists(countryCode, lang.getLanguage())) {
				log.error("An attempt was made to insert language {} but it alredy exists for {}", lang.getLanguage(), countryCode);
				return ResponseEntity.badRequest().body(lang.getLanguage() + " alredy exists for " + countryCode);
			}
			langDao.addLanguage(countryCode, lang);
			return ResponseEntity.ok(lang.getLanguage() + " was successfully added for country " + countryCode);
		} catch (Exception e) {
			log.error("We were unable to add {} for country {}", lang.getLanguage(), countryCode, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("We're sorry. We were unable to add " + lang.getLanguage() + " to country " + countryCode);
		}
	}
	
	@DeleteMapping("/{countryCode}/language/{language}")
	public ResponseEntity<?> deleteLanguage(
			@PathVariable String countryCode,
			@PathVariable String language
			) {
		try {
			langDao.deleteLanguage(countryCode, language);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			log.error("An error occurred when deleting {} from {}", language, countryCode, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("We were unable to delete " + language + " from " + countryCode);
		}
	}
}
