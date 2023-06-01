export function validPassword(p: string) {
    // Ensuring p arg is of type "string".
    if (typeof p !== "string") {
      return false;
    }
  
    // Password less than 8 chars
    if (p.length < 8) {
      return false;
    }
  
    // (Regex testing -> returns true if test passes)
  
    // Testing for lowercase char(s).
    let pattern = /(?=.*[a-z])/;
    if (!pattern.test(p)) {
      return false;
    }
  
    // Checking for uppercase char(s).
    pattern = /(?=.*[A-Z])/;
    if (!pattern.test(p)) {
      return false;
    }
  
    // Checking for at least one num.
    pattern = /(?=.*[0-9])/;
    if (!pattern.test(p)) {
      return false;
    }
  
    // Checking for at least one special char.
    pattern = /(?=.*?[#?!@$%^&*-])/;
    if (!pattern.test(p)) {
      return false;
    }
  
    // If all the above checks do not fail, password is to be considerd valid.
    return true;
  }
  
  export function passwordsMatch(p1: string, p2: string) {
    if (p1 === p2) {
      return true;
    }
    return false;
  }
  