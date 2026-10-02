import { describe, it, expect } from "@jest/globals";
import { calculateCapacityGap } from "./capacity-gap";

describe("Capacity Gap Business Rule", () => {
  it("should calculate the shortage when actual capacity is less than required capacity", () => {
    const result = calculateCapacityGap({
      requiredCapacity: 1000,
      actualCapacity: 800,
    });

    expect(result).toEqual({
      status: "SHORTAGE",
      gap: 200,
    });
  });

  it("should return sufficient when actual capacity equals required capacity", () => {
    const result = calculateCapacityGap({
      requiredCapacity: 1000,
      actualCapacity: 1000,
    });

    expect(result).toEqual({
      status: "SUFFICIENT",
      gap: 0,
    });
  });

  it("should return sufficient when actual capacity is greater than required capacity", () => {
    const result = calculateCapacityGap({
      requiredCapacity: 1000,
      actualCapacity: 1200,
    });

    expect(result).toEqual({
      status: "SUFFICIENT",
      gap: 0,
    });
  });

  it("should return missing data when required capacity is missing", () => {
    const result = calculateCapacityGap({
      requiredCapacity: null,
      actualCapacity: 800,
    });

    expect(result).toEqual({
      status: "MISSING_DATA",
      missingFields: ["requiredCapacity"],
    });
  });

  it("should return missing data when actual capacity is missing", () => {
    const result = calculateCapacityGap({
      requiredCapacity: 1000,
      actualCapacity: null,
    });

    expect(result).toEqual({
      status: "MISSING_DATA",
      missingFields: ["actualCapacity"],
    });
  });

  it("should return both fields when both capacities are missing", () => {
    const result = calculateCapacityGap({
      requiredCapacity: null,
      actualCapacity: undefined,
    });

    expect(result).toEqual({
      status: "MISSING_DATA",
      missingFields: ["requiredCapacity", "actualCapacity"],
    });
  });

  it("should return invalid input when required capacity is negative", () => {
    const result = calculateCapacityGap({
      requiredCapacity: -100,
      actualCapacity: 800,
    });

    expect(result).toEqual({
      status: "INVALID_INPUT",
      invalidFields: ["requiredCapacity"],
    });
  });

  it("should return invalid input when actual capacity is negative", () => {
    const result = calculateCapacityGap({
      requiredCapacity: 1000,
      actualCapacity: -100,
    });

    expect(result).toEqual({
      status: "INVALID_INPUT",
      invalidFields: ["actualCapacity"],
    });
  });

  it("should return invalid input when both capacities are negative", () => {
    const result = calculateCapacityGap({
      requiredCapacity: -1000,
      actualCapacity: -800,
    });

    expect(result).toEqual({
      status: "INVALID_INPUT",
      invalidFields: ["requiredCapacity", "actualCapacity"],
    });
  });

  it("should allow zero capacity values", () => {
    const result = calculateCapacityGap({
      requiredCapacity: 0,
      actualCapacity: 0,
    });

    expect(result).toEqual({
      status: "SUFFICIENT",
      gap: 0,
    });
  });
});
