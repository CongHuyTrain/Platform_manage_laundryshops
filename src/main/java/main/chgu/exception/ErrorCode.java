package main.chgu.exception;

public enum ErrorCode {
    USER_EXISTED(1001, "User exited"),
    USER_NOT_EXISTED(1005,"User not exited"),
    ERROR(999, "Error"),
    UNAUTHENTICATED(1002, "Unauthenticated"),

    ;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    private int code;
    private String message;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
