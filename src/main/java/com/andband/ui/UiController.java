package com.andband.ui;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UiController {

    @GetMapping({"/*", "/**/{static:[^\\\\.]*}"})
    public String index(Model model, @Value("${andband.api-gateway.endpoint}") String apiUri) {
        model.addAttribute("apiUri", apiUri);
        return "index";
    }

}
