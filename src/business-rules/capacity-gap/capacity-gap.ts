export interface CapacityGapInput {
  requiredCapacity: number | null | undefined;
  actualCapacity: number | null | undefined;
}

type CapacityField = "requiredCapacity" | "actualCapacity";

export type CapacityGapResult =
  | {
      status: "SHORTAGE";
      gap: number;
    }
  | {
      status: "SUFFICIENT";
      gap: 0;
    }
  | {
      status: "MISSING_DATA";
      missingFields: CapacityField[];
    }
  | {
      status: "INVALID_INPUT";
      invalidFields: CapacityField[];
    };

export function calculateCapacityGap(
  input: CapacityGapInput,
): CapacityGapResult {
  const { requiredCapacity, actualCapacity } = input;

  // Check for missing data
  const missingFields: CapacityField[] = [];

  if (requiredCapacity === null || requiredCapacity === undefined) {
    missingFields.push("requiredCapacity");
  }

  if (actualCapacity === null || actualCapacity === undefined) {
    missingFields.push("actualCapacity");
  }

  if (
    requiredCapacity === null ||
    requiredCapacity === undefined ||
    actualCapacity === null ||
    actualCapacity === undefined
  ) {
    return {
      status: "MISSING_DATA",
      missingFields,
    };
  }

  // Check for invalid data
  const invalidFields: CapacityField[] = [];

  if (requiredCapacity < 0) {
    invalidFields.push("requiredCapacity");
  }

  if (actualCapacity < 0) {
    invalidFields.push("actualCapacity");
  }

  if (invalidFields.length > 0) {
    return {
      status: "INVALID_INPUT",
      invalidFields,
    };
  }

  // Calculate capacity gap
  if (actualCapacity < requiredCapacity) {
    return {
      status: "SHORTAGE",
      gap: requiredCapacity - actualCapacity,
    };
  }

  // No shortage
  return {
    status: "SUFFICIENT",
    gap: 0,
  };
}