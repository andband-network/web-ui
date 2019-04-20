package com.andband.ui;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UiController {

    @GetMapping({"/*", "/**/{static:[^\\\\.]*}"})
    public String index(Model model, @Value("${andband.api-gateway.endpoint}") String apiUri, @Value("${andband.images.uri}") String imagesUri) {
        model.addAttribute("apiUri", apiUri);
        model.addAttribute("imagesUri", imagesUri);
        return "index";
    }

}
