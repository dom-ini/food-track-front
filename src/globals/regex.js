const REGEX = {
  // 8 do 32 znaków, mała, wielka litera, cyfra i znak specjalny
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
