package com.app.jobTS.sign.auth.model;


public enum Role {
    ADMIN("ADMIN"),
    USER("KULLANICI"),
    MANAGER("MÜDÜR"),
    PASSIVE("PASİF"),
    DELETED("SİlİNMİŞ");


    private String value;
    public String getValue() {
        return this.value;
    }
    Role(String value) {
        this.value = value;
    }

}