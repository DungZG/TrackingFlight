package com.example.TrackingFlight_Be.v1.controllers;

import com.example.TrackingFlight_Be.v1.entity.Item;
import com.example.TrackingFlight_Be.v1.repositories.ItemRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/api/items")
    public Page<Item> getItemsWithPagination(@RequestParam int page, @RequestParam int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size); // Spring Data Page bắt đầu từ trang 0
        return itemRepository.findAll(pageRequest);
    }
}
