# Capacity Gap Business Rule

## 1. Purpose

The Capacity Gap rule determines whether the actual capacity is enough to satisfy the required capacity.

The rule returns either:

- A shortage amount when actual capacity is lower than required capacity.
- A sufficient result when actual capacity is equal to or greater than required capacity.
- A missing-data result when required information is not available.
- An invalid-input result when one or more capacity values are negative.

---

## 2. Input

The rule accepts two values:

- `requiredCapacity`: The required capacity.
- `actualCapacity`: The currently available capacity.

Both values must be non-negative numbers when provided.

---

## 3. Business Rule

The calculation follows this order:

1. Check for missing values.
2. Check for invalid negative values.
3. Compare actual capacity with required capacity.
4. Calculate the shortage if actual capacity is lower.
5. Return zero shortage when capacity is sufficient.

### Calculation

When:

```text
actualCapacity < requiredCapacity
```

The shortage is:

```text
requiredCapacity - actualCapacity
```

When:

```text
actualCapacity >= requiredCapacity
```

The shortage is:

```text
0
```

---

## 4. Missing Data Behavior

Missing data is not treated as zero.

If `requiredCapacity` or `actualCapacity` is missing, the rule returns:

```text
MISSING_DATA
```

and identifies the missing field or fields.

This prevents the system from making assumptions about unavailable data.

---

## 5. Invalid Data Behavior

Negative capacity values are considered invalid.

For example:

```text
requiredCapacity = -100
```

returns:

```text
INVALID_INPUT
```

The result identifies which field contains the invalid value.

---

## 6. Examples

### Shortage

Input:

```json
{
  "requiredCapacity": 1000,
  "actualCapacity": 800
}
```

Result:

```json
{
  "status": "SHORTAGE",
  "gap": 200
}
```

### Sufficient Capacity

Input:

```json
{
  "requiredCapacity": 1000,
  "actualCapacity": 1200
}
```

Result:

```json
{
  "status": "SUFFICIENT",
  "gap": 0
}
```

### Missing Data

Input:

```json
{
  "requiredCapacity": 1000,
  "actualCapacity": null
}
```

Result:

```json
{
  "status": "MISSING_DATA",
  "missingFields": [
    "actualCapacity"
  ]
}
```

### Invalid Input

Input:

```json
{
  "requiredCapacity": -100,
  "actualCapacity": 800
}
```

Result:

```json
{
  "status": "INVALID_INPUT",
  "invalidFields": [
    "requiredCapacity"
  ]
}
```

---

## 7. Testing

The business rule includes edge-case tests covering:

* Actual capacity lower than required capacity.
* Actual capacity equal to required capacity.
* Actual capacity greater than required capacity.
* Missing required capacity.
* Missing actual capacity.
* Both values missing.
* Negative required capacity.
* Negative actual capacity.
* Both values negative.
* Zero capacity values.

All tests are expected to pass before the task is considered complete.

---

## 8. Implementation

The rule is implemented as an independent function:

```text
src/business-rules/capacity-gap/capacity-gap.ts
```

Tests are located at:

```text
src/business-rules/capacity-gap/capacity-gap.test.ts
```

The business rule does not depend directly on Express, MongoDB, authentication, or HTTP requests. This keeps the calculation isolated and easy to test.
