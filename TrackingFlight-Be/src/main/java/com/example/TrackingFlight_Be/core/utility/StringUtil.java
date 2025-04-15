package com.teca.core.utility;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.Normalizer;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

public class StringUtil {

    private StringUtil() {
    }

    public static String uuid() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public static boolean isNullOrEmpty(final String str) {
        return str == null || str.trim().isEmpty();
    }

    public static String camelToSnakeCase(String str) {
        var regex = "([a-z])([A-Z]+)";

        var replacement = "$1_$2";

        return str.replaceAll(regex, replacement).toLowerCase();
    }

    public static String snakeToCamelCase(String str) {
        var regex = "_[a-zA-Z]";

        while (str.contains("_")) {
            str = str.replaceFirst(
                    regex,
                    String.valueOf(Character.toUpperCase(str.charAt(str.indexOf("_") + 1))));
        }

        return str;
    }

    public static String removeAccent(String s) {
        var temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        var pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        temp = pattern.matcher(temp).replaceAll("");
        return temp;
    }

    public static String removeExtraSpaces(String s) {
        return s.trim().replaceAll("//s+", " ");
    }

    public static String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hash = password.getBytes();

        for (int i = 0; i < 5; i++) {
            md.update(hash);
            hash = md.digest();
        }

        return DatatypeConverter.printHexBinary(hash).toUpperCase();
    }

    public static boolean checkPassword(String inputPassword, String storedHash) throws NoSuchAlgorithmException {
        String hashedInputPassword = hashPassword(inputPassword);
        return hashedInputPassword.equals(storedHash);
    }

    public static List<String> slitToList(String str) {
        return Arrays.asList(str.split(","));
    }
    public static String removeSpecialLetter(String input) {
        if (input != null) {
            return input.replaceAll("[^a-zA-Z0-9]", "");
        }
        return "";
    }

    public static String removeByRegex(String input, String regex) {
        if (input != null) {
            return input.replaceAll(regex, "");
        }
        return "";
    }

    public static boolean validateNumber(String input) {
        if (input != null) {
            return input.matches("[0-9]+");
        }
        return false;
    }

    public static String removeAccentLower(String s) {
        return removeAccent(s).toLowerCase();
    }
    public static String removeAccentUpper(String s) {
        return removeAccent(s).toUpperCase();
    }



    public static String camelToSnake(String str) {

        var regex = "([a-z])([A-Z]+)";

        var replacement = "$1_$2";

        return str.replaceAll(regex, replacement).toLowerCase();
    }

    public static String snakeToCamel(String str) {
        var regex = "_[a-zA-Z0-9]";

        while (str.contains("_")) {
            str = str.replaceFirst(
                    regex,
                    String.valueOf(Character.toUpperCase(str.charAt(str.indexOf("_") + 1))));
        }

        return str;
    }

    public static String decodeBase64(String value) {
        return new String(Base64.getDecoder().decode(value), StandardCharsets.UTF_8);
    }

}
