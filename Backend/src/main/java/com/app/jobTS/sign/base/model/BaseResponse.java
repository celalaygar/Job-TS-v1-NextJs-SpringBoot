package com.app.jobTS.sign.base.model;


import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.Collection;

@Data
public class BaseResponse<T> {

    private boolean success;
    private String resultCode;
    private String resultCodeValue;
    private String message;
    private HttpStatus httpStatus;
    private T data;

    public BaseResponse() {
    }

    public BaseResponse(boolean success,
                        HttpStatus httpStatus,
                        T data,
                        String resultCode,
                        String resultCodeValue) {
        this.success = success;
        this.resultCode = resultCode;
        this.httpStatus = httpStatus;
        this.resultCodeValue = resultCodeValue;
        this.message = resultCodeValue;
        this.data = data;
    }

    public BaseResponse(boolean success, HttpStatus httpStatus,T data, String resultCodeValue) {
        this.success = success;
        this.httpStatus = httpStatus;
        this.resultCodeValue = resultCodeValue;
        this.message = resultCodeValue;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getResultCodeValue() {
        return resultCodeValue;
    }

    public void setResultCodeValue(String resultCodeValue) {
        this.resultCodeValue = resultCodeValue;
    }
}