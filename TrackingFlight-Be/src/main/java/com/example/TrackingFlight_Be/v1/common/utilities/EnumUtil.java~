package com.teca.application.common.utilities;

public class EnumUtil {

    public static <T> String toLabel(Integer value, Class<T> en) {
        String label = null;
        for (var ec : en.getEnumConstants()) {
            try {
                var getValue = ec.getClass().getDeclaredMethod("getValue");
                if (getValue.invoke(ec).equals(value.intValue())) {
                    return ec.getClass().getDeclaredMethod("getLabel").invoke(ec).toString();
                }
            } catch (Exception ex) {
            }
        }
        return label;
    }

}
