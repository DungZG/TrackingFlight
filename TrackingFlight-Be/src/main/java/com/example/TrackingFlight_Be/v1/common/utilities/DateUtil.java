package com.teca.application.common.utilities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class DateUtil {
  private DateUtil() {
  }

  public static Long nowToMillisecond() {
    return formatMillisecondLong(Instant.now());
  }

  public static Long now() {
    return formatDateTimeLong(Instant.now());
  }

  public static String format(Instant instant, String format) {
    return DateTimeFormatter.ofPattern(format).withZone(ZoneId.systemDefault()).format(instant);
  }

  public static String formatDate(Instant instant) {
    return DateUtil.format(instant, "yyyyMMdd");
  }

  public static Instant parseDate(Integer date) {
    var format = new SimpleDateFormat("yyyyMMdd");
    try {
      return format.parse(date.toString()).toInstant();
    } catch (ParseException e) {
    }
    return null;
  }

  public static LocalDate parseLocalDate(Integer date) {
    var format = new SimpleDateFormat("yyyyMMdd");
    try {
      return format.parse(date.toString()).toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    } catch (ParseException e) {
    }
    return null;
  }

  public static Integer formatDateInt(Instant instant) {
    return Integer.parseInt(formatDate(instant));
  }

  public static Integer formatTimeInt(Instant instant) {
    return Integer.parseInt(formatTime(instant));
  }

  public static String formatTime(Instant instant) {
    return DateUtil.format(instant, "HHmmss");
  }

  public static String formatMillisecond(Instant instant) {
    return DateUtil.format(instant, "yyyyMMddHHmmssSSS");
  }

  public static String formatDateTime(Instant instant) {
    return DateUtil.format(instant, "yyyyMMddHHmmss");
  }

  public static Instant parseDateTime(Long datetime) {
    var format = new SimpleDateFormat("yyyyMMddHHmmss");
    try {
      return format.parse(datetime.toString()).toInstant();
    } catch (ParseException e) {
    }
    return null;
  }

  public static Instant parseDate(Long datetime) {
    var format = new SimpleDateFormat("yyyyMMdd");
    try {
      return format.parse(datetime.toString()).toInstant();
    } catch (ParseException e) {
    }
    return null;
  }

  public static String convertLongToDate(Long datetime) {
    try {
      // Chuyển đổi Long thành chuỗi và tạo đối tượng Date
      var format = new SimpleDateFormat("yyyyMMddHHmmss");
      Date date = format.parse(datetime.toString());

      // Định dạng lại Date thành chuỗi ngày dd/MM/yyyy
      var outputFormat = new SimpleDateFormat("dd/MM/yyyy");
      return outputFormat.format(date);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  public static String convertStringToDate(String inputDate) {
    // Định dạng ngày đầu vào
    DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");

    // Định dạng ngày đầu ra
    DateTimeFormatter outputFormatter = new DateTimeFormatterBuilder()
      .appendPattern("dd-MMM-yy")
      .toFormatter()
      .withLocale(Locale.US);

    // Chuyển đổi ngày đầu vào thành LocalDate
    LocalDate date = LocalDate.parse(inputDate, inputFormatter);

    return date.format(outputFormatter);
  }

  public static LocalDateTime parseLongToLocalDateTime(long timestamp) {
    return LocalDateTime.ofInstant(Instant.ofEpochMilli(timestamp), ZoneId.systemDefault());
  }

  public static Long formatMillisecondLong(Instant instant) {
    return Long.parseLong(formatMillisecond(instant));
  }

  public static Long formatDateTimeLong(Instant instant) {
    return Long.parseLong(formatDateTime(instant));
  }

  public static String formatIntToDate(Integer value) {
    return DateUtil.format(DateUtil.parseDate(value), "dd/MM/yyyy");
  }

  public static Long parseToDateLong(String value) {
    try {
      var instant = new SimpleDateFormat("dd/MM/yyyy").parse(value).toInstant();
      return DateUtil.formatDateTimeLong(instant);
    } catch (ParseException e) {
      return null;
    }
  }

  public static Long parseToDateVneidLong(String value) {
    try {
      var instant = new SimpleDateFormat("dd-MM-yyyy").parse(value).toInstant();
      return DateUtil.formatDateTimeLong(instant);
    } catch (ParseException e) {
      return null;
    }
  }

  public static String parseLongToDateSQL(Long date) {
    var dateFormat = new SimpleDateFormat("yyyyMMdd");
    var outputFormat = new SimpleDateFormat("dd-MMM-yy", Locale.ENGLISH);
    try {
      Date parsedDate = dateFormat.parse(date.toString());
      return outputFormat.format(parsedDate).toUpperCase();
    } catch (ParseException e) {
      e.printStackTrace();
    }
    return null;
  }

  public static Date parseLongToDate(Long date) {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
    try {
      Date parsedDate = dateFormat.parse(date.toString());
      return parsedDate;
    } catch (ParseException e) {
      e.printStackTrace();
      return null;
    }
  }

  public static Date setEndOfDay(Date date) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    calendar.set(Calendar.HOUR_OF_DAY, 23);
    calendar.set(Calendar.MINUTE, 59);
    calendar.set(Calendar.SECOND, 59);
    calendar.set(Calendar.MILLISECOND, 999);
    return calendar.getTime();
  }

  public static Instant formatDaeTimeString(String value) {
    try {
      return new SimpleDateFormat("dd/MM/yyyy hh:mm:ss").parse(value).toInstant();
    } catch (ParseException e) {
      return null;
    }
  }

  public static Integer formatDateString(String value) {
    try {
      var instant = new SimpleDateFormat("dd/MM/yyyy").parse(value).toInstant();
      return DateUtil.formatDateInt(instant);
    } catch (ParseException e) {
      return null;
    }
  }

  public static Long formatDateStringtoLong(String value) {
    try {
      var instant = new SimpleDateFormat("dd/MM/yyyy").parse(value).toInstant();
      return DateUtil.formatDateTimeLong(instant);
    } catch (ParseException e) {
      return null;
    }
  }


}
