const REGEX = {
  // 8-32 characters, small, capital letter, digit and special character
  PASSWORD: {
    ALL: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$",
    LENGTH: "^[A-Za-z\\d@$!%*?&]{8,32}$",
    LOWERCASE: "(.*[a-z].*)",
    UPPERCASE: "(.*[A-Z].*)",
    NUMBER: "(.*\\d.*)",
    SPECIAL_CHAR: "(.*[@$!%*?&].*)",
  },
};

export default REGEX;
