package com.ricepot.salesforce.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public final class ConfigReader {

    private static final Properties PROPERTIES = new Properties();

    static {
        try (InputStream stream = ConfigReader.class
                .getClassLoader()
                .getResourceAsStream("config.properties")) {
            if (stream == null) {
                throw new RuntimeException("config.properties not found on classpath");
            }
            PROPERTIES.load(stream);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load config.properties", e);
        }
    }

    private ConfigReader() {}

    public static String get(String key) {
        String value = PROPERTIES.getProperty(key);
        if (value == null || value.isBlank()) {
            throw new RuntimeException("Missing required config key: " + key);
        }
        return value.trim();
    }

    public static int getInt(String key) {
        return Integer.parseInt(get(key));
    }
}
