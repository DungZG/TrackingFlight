package com.example.TrackingFlight_Be.core.constant;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class Constants {

        private Constants() {
        }

        public static final List<Class<?>> JAVA_DATA_TYPES = Arrays.asList(
                        String.class, Integer.class, Long.class, Double.class, Float.class, Boolean.class);

        public static final int FIRST_PAGE = 1;
        public static final int MINIMUM_SIZE = 1;
        public static final int MAXIMUM_SIZE = 100;

        public static final Map<String, String> SQL_CONSTRAINT_EXCEPTION = Map.of(
                        "FK_DIM_LOCAL_LOCAL_TYPE_ID", "Loại địa bàn không tồn tại",
                        "UNIQUE_DIM_LOCAL_TYPE_CODE", "Mã loại địa bàn đã tồn tại",
                        "UNIQUE_DIM_LOCAL_CODE", "Mã địa bàn đã tồn tại");

        public static final String UNAUTHORIZED = "Unauthorized";

        public static final List<String> WHITE_LIST = List.of("/api-docs", "/api-docs/swagger-config",
                        "/third-party/get-list-local", "/third-party/get-list-local-police");
        public static final Map<String, String> AUTHORIZE_DICT = Map.of();

        public static final String SECRET_KEY = "Secret-Key";

        public static final String USER_INFO = "User-Info";
        public static final String FORMAT_DATE_TIME = "yyyy-MM-dd HH:mm";

        public static final String FORMAT_DATE = "yyyy-MM-dd";
        public static final String FORMAT_TIME = "HH:mm";

}
