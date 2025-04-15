package com.teca.core.utility;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class TimeUtil {

    private static final String pattern = "yyyyMMddHHmmss";

    private TimeUtil() {
    }

    public static Long now() {
        return convertInstantToLong(Instant.now());
    }

    public static String convertInstantToString(Instant time) {
        var formatter = DateTimeFormatter.ofPattern(pattern).withZone(ZoneId.systemDefault());
        return formatter.format(time);
    }

    public static String convertInstantToString(Instant time, String pattern) {
        var formatter = DateTimeFormatter.ofPattern(pattern).withZone(ZoneId.systemDefault());
        return formatter.format(time);
    }

    public static Long convertInstantToLong(Instant time) {
        return Long.valueOf(convertInstantToString(time));
    }

    public static Long convertInstantToLong(Instant time, String pattern) {
        return Long.valueOf(convertInstantToString(time, pattern));
    }

    public static Instant convertStringToInstant(String time) {
        var formatter = DateTimeFormatter.ofPattern(pattern).withZone(ZoneId.systemDefault());
        var dateTime = LocalDateTime.parse(time, formatter);
        return dateTime.atZone(ZoneId.systemDefault()).toInstant();
    }

    public static Instant convertLongToInstant(Long time) {
        return convertStringToInstant(String.valueOf(time));
    }

    public static String convertDate(Long time) {
        var dateStr = time.toString();
        var year = dateStr.substring(0, 4);
        var month = dateStr.substring(4, 6);
        var date = dateStr.substring(6);
        return date + "/" + month + "/" + year;
    }

    public static String convertStringToDate(String time) {
        var year = time.substring(0, 4);
        var month = time.substring(5, 7);
        var date = time.substring(8, 10);
        return date + "/" + month + "/" + year;
    }
}
