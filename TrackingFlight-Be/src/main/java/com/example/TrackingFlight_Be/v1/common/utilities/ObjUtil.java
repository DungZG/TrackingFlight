package com.teca.application.common.utilities;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import javax.persistence.Tuple;
import java.lang.reflect.AccessibleObject;
import java.util.HashMap;
import java.util.Objects;

public class ObjUtil {

    private ObjUtil() {
    }

    public static void patchValue(Object obj, Object value) {
        var mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        mapper.map(value, obj);
    }

    public static <T> T mapFromTuple(Tuple source, T destination) {
        var mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        var fields = new HashMap<>();

        source.getElements().forEach(
                e -> fields.put(StringUtil.snakeToCamel(e.getAlias().toLowerCase()), source.get(e.getAlias())));

        mapper.map(fields, destination);

        return destination;
    }

    public static ObjectNode getDifferences(Object obj1, Object obj2) {
        var objectMapper = new ObjectMapper();
        var oldObj = objectMapper.createObjectNode();
        var newObj = objectMapper.createObjectNode();
        var clazz = obj1.getClass();

        for (var field : clazz.getDeclaredFields()) {
            AccessibleObject.setAccessible(new AccessibleObject[] { field }, true);
            try {
                var value1 = field.get(obj1);
                var value2 = field.get(obj2);
                if (!Objects.equals(value1, value2)) {
                    oldObj.put(field.getName(), String.valueOf(value1));
                    newObj.put(field.getName(), String.valueOf(value2));
                }
            } catch (IllegalAccessException e) {
                // Handle exception
            }
        }
        var rootNode = objectMapper.createObjectNode();
        rootNode.set("old", oldObj);
        rootNode.set("new", newObj);
        return rootNode;
    }

    public static <T> T clone(T obj) {
        obj.getClass();
        var objectMapper = new ObjectMapper();
        try {
            var json = objectMapper.writeValueAsString(obj);
            return objectMapper.readValue(json, (Class<T>) obj.getClass());
        } catch (Exception e) {
        }
        return null;
    }

}
