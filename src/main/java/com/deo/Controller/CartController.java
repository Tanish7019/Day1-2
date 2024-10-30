package com.deo.Controller;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public List<Cart> getCartItems(@AuthenticationPrincipal User user) {
        return cartService.getCartItems(user);
    }

    @PostMapping
    public Cart addToCart(@AuthenticationPrincipal User user, @RequestBody Cart cart) {
        return cartService.addToCart(user, cart);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
    }
}
