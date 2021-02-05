package com.ckujawa.worldgdp.controller.view;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ckujawa.worldgdp.dao.CityDAO;
import com.ckujawa.worldgdp.dao.CountryDAO;
import com.ckujawa.worldgdp.dao.LookupDAO;

@Controller
@RequestMapping("/")
public class ViewController {

	@Autowired CountryDAO countryDao;
	@Autowired LookupDAO lookupDao;
	@Autowired CityDAO cityDao;
	
	@GetMapping({"/countries", "/"})
	public String countries(Model model, @RequestParam Map<String, Object> params) {
		
		return "countries";
	}
	
	@GetMapping("/countries/{code}")
	public String countryDetail(@PathVariable String code, Model model) {
		
		return "country";
	}
	
	@GetMapping("/countries/{code}/form")
	public String editCountry(@PathVariable String code,
			Model model) {
		
		return "country-form";
	}
}
