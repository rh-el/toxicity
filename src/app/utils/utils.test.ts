import { isValidEmail, isValidUsernamePassword } from "./utils"


// test isValidEmail
{
  test('a valid email address', () => {
      expect(isValidEmail("avalidemail@email.com")).toBe(true);
  });
  
  test('an invalid address email: missing .smthg', () => {
    expect(isValidEmail('anotvalid@dada')).toBe(false)
  })
  
  test('an invalid address email: missing @', () => {
    expect(isValidEmail('anotvaliddad.da')).toBe(false)
  })
  
  test('an invalid address email: ...@', () => {
    expect(isValidEmail('@ff.da')).toBe(false)
  })
  
  test('an invalid address email: ', () => {
    expect(isValidEmail('')).toBe(false)
  })
  
  test('an invalid address email: only numbers', () => {
    expect(isValidEmail(48451)).toBe(false)
  })
  
  test('an invalid address email: special chars', () => {
    expect(isValidEmail('\\/!?;:^$t')).toBe(false)
  })
}

// test isValidUsernamePassword
{
  test('a valid username: 3 letters', () => {
    expect(isValidUsernamePassword("ddd")).toBe(true);
  });
  
  test('a valid username: more than 3 letters', () => {
    expect(isValidUsernamePassword("dddqdqdq")).toBe(true);
  });
  
  test('an ivalid username: 2 letters', () => {
    expect(isValidUsernamePassword("dé")).toBe(false);
  });
  
  test('an ivalid username: ', () => {
    expect(isValidUsernamePassword("")).toBe(false);
  });
  
  test('an ivalid username: numbers', () => {
    expect(isValidUsernamePassword(2492)).toBe(false);
  });
  
  test('an ivalid username: special chars', () => {
    expect(isValidUsernamePassword('/;:$$\\^ù')).toBe(true);
  });
}
