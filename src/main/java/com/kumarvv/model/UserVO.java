package com.kumarvv.model;

import org.apache.commons.lang3.StringUtils;

public class UserVO {
    String name;
    String lower;
    String upper;

    public UserVO(String name) {
        this.name = name;
        if (StringUtils.isNoneBlank(name)) {
            this.lower = name.toLowerCase();
            this.upper = name.toUpperCase();
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLower() {
        return lower;
    }

    public void setLower(String lower) {
        this.lower = lower;
    }

    public String getUpper() {
        return upper;
    }

    public void setUpper(String upper) {
        this.upper = upper;
    }
}
