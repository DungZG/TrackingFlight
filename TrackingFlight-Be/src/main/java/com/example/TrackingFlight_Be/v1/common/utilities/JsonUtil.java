package com.example.TrackingFlight_Be.v1.common.utilities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {

    public static String objToStr(Object value) {
        try {
            return new ObjectMapper().writer().writeValueAsString(value);
        } catch (JsonProcessingException e) {
        }
        return null;
    }

    public static Object strToObj(String value) {
        return JsonUtil.parse(value, Object.class);
    }

    public static <T> T parse(String value, Class<T> valueType) {
        try {
            return new ObjectMapper().readValue(value, valueType);
        } catch (JsonProcessingException e) {
        }
        return null;
    }

}
