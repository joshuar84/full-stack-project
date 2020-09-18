const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
      <div>
        <ul>
          <!-- Content here -->
        </ul>
      </div>
    `;

    it("should return no <li>s for no categories", () => {
      // arrange
      const categories = [];
      // act
      const result = mergeCategories(template, categories, 'li')
      // assert
      expect(result).to.not.contain('<!-- Content here -->')
      expect(result).to.contain('<div>')
      expect(result).to.contain('</div>')
      expect(result).to.contain('<ul>')
      expect(result).to.contain('</ul>')
      expect(result).to.not.contain('<li>')
      expect(result).to.not.contain('</li>')
    });

    it("should return a single <li> for one category", () => {
      // arrange
      const categories = ['test'];
      // act
      const result = mergeCategories(template, categories, 'li')
      //assert
      expect(result).to.not.contain('<!-- Content here -->')
      expect(result).to.contain('<li>test</li>')
      expect(result).to.contain('<div>')
      expect(result).to.contain('</div>')
      expect(result).to.contain('<ul>')
      expect(result).to.contain('</ul>')
    });

    it("should return an <li> for each category", () => {
      const categories = ['test', 'test2', 'test3']

      const result = mergeCategories(template, categories, 'li')

      expect(result).to.not.contain('<!-- Content here -->')
      expect(result).to.contain( '<li>test3</li>','<li>test</li>', '<li>test2</li>')
      expect(result).to.contain('<div>')
      expect(result).to.contain('</div>')
      expect(result).to.contain('<ul>')
      expect(result).to.contain('</ul>')
    });
  });

  context("using <option> tags", () => {
    const template = `
      <div>
        <select>
          <!-- Content here -->
        </select>
      </div>
    `;

    it("should return no <option>s for no categories", () => {
      const categories = [];

      const result = mergeCategories(template, categories, 'option');

      expect(result).to.not.contain('<!-- Content here -->')
      expect(result).to.not.contain('<option>')
      expect(result).to.not.contain('</option>')
      expect(result).to.contain('<div>')
      expect(result).to.contain('</div>')
      expect(result).to.contain('<select>')
      expect(result).to.contain('</select>')
    });

    it("should return a single <option> for one category", () => {
      const categories = ['test'];

      const result = mergeCategories(template, categories, 'option');

      expect(result).to.not.contain('<!-- Content here -->')
      expect(result).to.contain('<option>test</option>')
      expect(result).to.contain('<div>')
      expect(result).to.contain('</div>')
      expect(result).to.contain('<select>')
      expect(result).to.contain('</select>')
    });

    it("should return an <option> for each category", () => {
      const categories = ['test', 'test2', 'test3']

      const result = mergeCategories(template, categories, 'option')


      expect(result).to.not.contain('<!-- Content here -->')
      expect(result).to.contain('<option>test3</option>','<option>test</option>', '<option>test2</option>')
      expect(result).to.contain('<div>')
      expect(result).to.contain('</div>')
      expect(result).to.contain('<select>')
      expect(result).to.contain('</select>')
    });
  });
});
