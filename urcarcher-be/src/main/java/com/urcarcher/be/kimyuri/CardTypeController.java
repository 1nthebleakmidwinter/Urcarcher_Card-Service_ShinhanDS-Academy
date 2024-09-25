package com.urcarcher.be.kimyuri;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/cards")
public class CardTypeController {
	@Autowired
    private CardTypeService cardTypeService;

    @GetMapping
    public List<CardTypeDTO> readAll() {
        return cardTypeService.readAll();
    }
}
