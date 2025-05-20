package com.example.marvel_api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Data
@Document(collection = "characters")
public class Character {

    @Id
    private String id;

    @NotBlank(message = "El nombre del superhéroe es obligatorio")
    private String name; // Nombre del superhéroe (ej. "Iron Man")

    private String realName; // Nombre real del personaje (opcional, ej. "Tony Stark")

    @NotNull(message = "El año de aparición es obligatorio")
    private Integer debutYear; // Año de aparición (ej. 1963)

    @NotBlank(message = "La casa a la que pertenece es obligatoria")
    private String house; // Casa a la que pertenece (ej. "Marvel")

    @NotBlank(message = "La biografía es obligatoria")
    private String biography; // Breve biografía

    private String equipment; // Equipamiento (opcional, ej. "Powered armor")

    @NotNull(message = "La lista de imágenes es obligatoria")
    private List<String> imageIds; // Lista de IDs de imágenes en GridFS (mínimo 1)
}