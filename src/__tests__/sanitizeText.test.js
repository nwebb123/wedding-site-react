import { SanitizeText } from '../Utils/SanitizeText';

describe('sanitizeText', () => {
  it('trims whitespace and strips HTML and special characters', () => {
    const input = {
      firstName: " <b>John</b>! ",
      lastName: " Doe<script>alert(1)</script> "
    };

    const expected = {
      firstName: "John",
      lastName: "Doealert"
    };

    expect(SanitizeText(input.firstName, input.lastName)).toEqual(expected);
  });

  it("preserves letters, hyphens, and apostrophes", () => {
    const input = {
      firstName: "Jean-Paul ",
      lastName: "O'Connor"
    };

    const expected = {
      firstName: "Jean-Paul",
      lastName: "O'Connor"
    };

    expect(SanitizeText(input.firstName, input.lastName)).toEqual(expected);
  });
});