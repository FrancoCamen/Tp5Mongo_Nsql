package com.example.marvel_api.repository;

import com.example.marvel_api.model.Character;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CharacterRepository extends MongoRepository<Character, String> {
}
