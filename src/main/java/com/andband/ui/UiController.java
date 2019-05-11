package com.andband.ui;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UiController {

    @Value("${andband.api-gateway.endpoint}")
    private String apiUri;

    @Value("${andband.images.uri}")
    private String imagesUri;

    @Value("${google.recaptcha-api.site-key}")
    private String recaptchaKey;

    @Value("${google.maps-api.key}")
    private String googleMapsKey;

    @GetMapping({"/*", "/**/{static:[^\\\\.]*}"})
    public String index(Model model) {
        model.addAttribute("apiUri", apiUri);
        model.addAttribute("imagesUri", imagesUri);
        model.addAttribute("recaptchaKey", recaptchaKey);
        model.addAttribute("googleMapsKey", googleMapsKey);
        return "index";
    }

}
