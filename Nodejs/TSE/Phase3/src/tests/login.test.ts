import { findUser, login } from "../jest";

import { describe, it, expect } from "@jest/globals";

describe("User Authentication", () => {
    describe("findUser", () => {
      it("should find a user by username", () => {
        expect(findUser("gyan")).toEqual({
          username: "gyan",
          password: "secure123",
        });
        expect(findUser("mami")).toEqual({
          username: "mami",
          password: "helloWorld",
        });
        expect(findUser("nonexistent")).toBeUndefined();
      });
    });
  
    describe("login", () => {
      it("should return true for valid credentials", () => {
        expect(login("gyan", "secure123")).toBe(true);
        expect(login("mami", "helloWorld")).toBe(true);
      });
      it("should return false for invalid credentials", () => {
        expect(login("gyan", "wrongPassword")).toBe(false);
        expect(login("mami", "wrongPassword")).toBe(false);
        expect(login("nonexistent", "password")).toBe(false);
      });
      it("should return false for non-existent user", () => {
        expect(login("nonexistent", "password")).toBe(false);
      });
      it("should return false for empty username and password", () => {
        expect(login("", "")).toBe(false);
      });
    });
  });
  