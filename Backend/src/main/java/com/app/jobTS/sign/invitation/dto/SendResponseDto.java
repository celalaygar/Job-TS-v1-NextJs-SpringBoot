package com.app.jobTS.sign.invitation.dto;

import org.springframework.http.HttpStatus;

public class SendResponseDto {

    private String key;
    private String value;
    private HttpStatus httpStatus;


    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
