package com.teca.core.utility;

import java.util.Collection;

public class CollectionUtil {

    private CollectionUtil() {
    }

    public static boolean isNullOrEmpty(final Collection<?> collection) {
        return collection == null || collection.isEmpty();
    }
}
