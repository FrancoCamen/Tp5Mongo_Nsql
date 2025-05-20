package com.example.marvel_api.service;

import com.example.marvel_api.model.Character;
import com.example.marvel_api.repository.CharacterRepository;
import com.example.marvel_api.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CharacterService {

    @Autowired
    private CharacterRepository characterRepository;

    public List<Character> getAllCharacters() {
        return characterRepository.findAll();
    }

    public Optional<Character> getCharacterById(String id) {
        return characterRepository.findById(id);
    }

    public Character createCharacter(Character character) {
        return characterRepository.save(character);
    }

    public Optional<Character> updateCharacter(String id, Character character) {
        if (characterRepository.existsById(id)) {
            character.setId(id);
            return Optional.of(characterRepository.save(character));
        }
        return Optional.empty();
    }

    public boolean deleteCharacter(String id) {
        if (characterRepository.existsById(id)) {
            characterRepository.deleteById(id);
            return true;
        }
        return false;
    }
}