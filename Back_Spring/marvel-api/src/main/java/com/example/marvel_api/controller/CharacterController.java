package com.example.marvel_api.controller;

import com.example.marvel_api.model.Character;
import com.example.marvel_api.service.CharacterService;
import com.example.marvel_api.service.GridFsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/characters")
public class CharacterController {

    @Autowired
    private CharacterService characterService;

    @Autowired
    private GridFsService gridFsService;

    @GetMapping
    public List<Character> getAllCharacters() {
        return characterService.getAllCharacters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Character> getCharacterById(@PathVariable String id) {
        return characterService.getCharacterById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Character> createCharacter(@Valid @RequestBody Character character) {
        if (character.getImageIds() == null || character.getImageIds().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        Character createdCharacter = characterService.createCharacter(character);
        return ResponseEntity.ok(createdCharacter);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Character> updateCharacter(@PathVariable String id, @Valid @RequestBody Character character) {
        if (character.getImageIds() == null || character.getImageIds().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        return characterService.updateCharacter(id, character)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacter(@PathVariable String id) {
        if (characterService.deleteCharacter(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/upload-image/{characterId}")
    public ResponseEntity<String> uploadImage(@PathVariable String characterId, @RequestParam("file") MultipartFile file) throws IOException {
        Character character = characterService.getCharacterById(characterId)
                .orElseThrow(() -> new IllegalArgumentException("Character not found with id: " + characterId));
        String imageId = gridFsService.storeImage(file);
        character.getImageIds().add(imageId);
        characterService.updateCharacter(characterId, character);
        return ResponseEntity.ok(imageId);
    }

    @GetMapping("/image/{imageId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageId) throws IOException {
        byte[] imageBytes = gridFsService.getImage(imageId);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Ajusta según el tipo de imagen
                .body(imageBytes);
    }

    @DeleteMapping("/image/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable String imageId) {
        gridFsService.deleteImage(imageId);
        return ResponseEntity.ok().build();
    }
}
