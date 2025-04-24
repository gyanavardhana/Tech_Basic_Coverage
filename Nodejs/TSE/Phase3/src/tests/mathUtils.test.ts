import { add, subtract, multiply, divide,  } from "../jest";
import { describe, it, expect } from "@jest/globals";

describe("Math Utils", () => {
  describe("add", () => {
    it("should add two numbers correctly", () => {
      expect(add(1, 2)).toBe(3);
      expect(add(-1, -1)).toBe(-2);
      expect(add(0, 0)).toBe(0);
    });
  });

  describe("subtract", () => {
    it("should subtract two numbers correctly", () => {
      expect(subtract(2, 1)).toBe(1);
      expect(subtract(-1, -1)).toBe(0);
      expect(subtract(0, 0)).toBe(0);
    });
  });

  describe("multiply", () => {
    it("should multiply two numbers correctly", () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(-1, -1)).toBe(1);
      expect(multiply(0, 5)).toBe(0);
    });
  });

  describe("divide", () => {
    it("should divide two numbers correctly", () => {
      expect(divide(6, 3)).toBe(2);
      expect(divide(-6, -3)).toBe(2);
      expect(divide(0, 5)).toBe(0);
    });

    it("should throw an error when dividing by zero", () => {
      expect(() => divide(5, 0)).toThrow("Cannot divide by zero");
    });
  });
});

