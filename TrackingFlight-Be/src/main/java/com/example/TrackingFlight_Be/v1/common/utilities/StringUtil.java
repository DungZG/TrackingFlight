package com.teca.application.common.utilities;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

public class StringUtil {

    private StringUtil() {
    }

    public static String uuid() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.isEmpty();
    }

    public static boolean notNullOrEmpty(String str) {
        return !isNullOrEmpty(str);
    }

    public static List<String> slitToList(String str) {
        return Arrays.asList(str.split(","));
    }

    public static String removeAccent(String s) {
        var temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        var pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        temp = pattern.matcher(temp).replaceAll("");
        return temp;
    }

    public static String removeAccentLower(String s) {
        return removeAccent(s).toLowerCase();
    }

    public static String snakeToCamelCase(String source) {
        var words = source.split("[\\W_]+");

        var destination = new StringBuilder(words[0].toLowerCase());
        for (int i = 1; i < words.length; i++) {
            var word = words[i];
            destination.append(Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase());
        }

        return destination.toString();
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

    // Tên hợp lệ trả về TRUE
    public static boolean validateNameByUnicode(String name) {

        var regex = "^[a-zA-ZáàạảãÁÀẠẢÃăắằặẳẵĂẮẰẶẲẴâấầậẩẫÂẤẦẬẨẪđĐéèẹẻẽÉÈẸẺẼêếềệểễÊẾỀỆỂỄíìịỉĩÍÌỊỈĨóòọỏõÓÒỌỎÕôốồộổỗÔỐỒỘỔỖơớờợởỡƠỚỜỢỞỠúùụủũÚÙỤỦŨưứừựửữƯỨỪỰỬỮýỳỵỷỹÝỲỴỶỸ\\s']+$";

        return name.matches(regex);
    }

    public static String removeExtraSpaces(String s) {
        return s.trim().replaceAll("//s+", " ");
    }
}
