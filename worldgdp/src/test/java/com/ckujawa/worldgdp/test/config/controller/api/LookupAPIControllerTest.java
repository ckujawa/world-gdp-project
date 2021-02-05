package com.ckujawa.worldgdp.test.config.controller.api;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.ckujawa.worldgdp.AppConfiguration;
import com.ckujawa.worldgdp.dao.LookupDAO;

@RunWith(SpringRunner.class)
@SpringJUnitWebConfig(classes= {AppConfiguration.class})
public class LookupAPIControllerTest {
	
	@Autowired
	private WebApplicationContext wac;
	private MockMvc mockMvc;

	@Autowired LookupDAO lookupDao;
	
	@Before
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
	}
	
	@Test
	public void testGetContinents() throws Exception{
		this.mockMvc.perform(get("/api/lookup/continents")
		.accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
		.andExpect(status().isOk())
		.andExpect(content().contentType("application/json;charset=UTF-8"))
		.andExpect(jsonPath("$").isArray())
		.andExpect(jsonPath("$.length()", is(7)))
		.andExpect(jsonPath("$[0]", is ("Asia")));
	}
	
	@Test
	public void testGetRegions() throws Exception{
		this.mockMvc.perform(get("/api/lookup/regions")
		.accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
		.andExpect(status().isOk())
		.andExpect(content().contentType("application/json;charset=UTF-8"))
		.andExpect(jsonPath("$").isArray())
		.andExpect(jsonPath("$.length()", is(25)))
		.andExpect(jsonPath("$[0]", is ("Antarctica")));
	}
	
	@Test
	public void testGetHeadsOfState() throws Exception{
		this.mockMvc.perform(get("/api/lookup/headsOfState")
				.accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
				.andExpect(status().isOk())
				.andExpect(content().contentType("application/json;charset=UTF-8"))
				.andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$.length()", is(178)))
				.andExpect(jsonPath("$[0]", is ("Abdelaziz Bouteflika")));
	}
	
	@Test
	public void testGetGovernmentTypes() throws Exception{
		this.mockMvc.perform(get("/api/lookup/government")
				.accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
				.andExpect(status().isOk())
				.andExpect(content().contentType("application/json;charset=UTF-8"))
				.andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$.length()", is(35)))
				.andExpect(jsonPath("$[0]", is ("Administrated by the UN")));
	}
}
