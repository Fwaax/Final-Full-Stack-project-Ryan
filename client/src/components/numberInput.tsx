import React from "react";

interface NumberInputProps {
    className?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    onlyAllowIntegers?: boolean;
    value: string;
    setValue: (value: string) => void;
}

// Forward ref to the input element
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            className,
            placeholder = "0",
            min = Number.MIN_SAFE_INTEGER,
            max = Number.MAX_SAFE_INTEGER,
            onlyAllowIntegers = false,
            value,
            setValue,
        },
        ref,
    ) => {
        function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
            let newVal = e.target.value.trim();

            // Allow empty input to clear the value
            // **Potential Problem Without Fix:**
            // If we don't handle empty inputs, users might not be able to clear the input field properly.
            if (newVal === "") {
                setValue("");
                return;
            }

            // Automatically convert inputs like ".5" to "0.5"
            // **Potential Problem Without Fix:**
            // If we don't handle inputs starting with ".", users would be unable to input numbers like ".5".
            // For example, typing ".5" would not be interpreted as "0.5", resulting in a poor user experience.
            if (newVal.startsWith(".")) {
                newVal = "0" + newVal;
            }

            // Prevent multiple dots in the input
            // **Potential Problem Without Fix:**
            // Allowing multiple dots would result in invalid number formats like "5.5.5" or "12..34",
            // which cannot be parsed as valid numbers. This would lead to incorrect or rejected inputs.
            if (newVal.split(".").length > 2) {
                return; // If there are two or more periods, reject the input
            }

            // Handle cases where only integers are allowed
            // **Potential Problem Without Fix:**
            // If `onlyAllowIntegers` is `true` but we don't handle decimal points correctly,
            // users could input decimals (e.g., "5.5"), which should be prevented. This fix ensures that
            // any decimal part is removed when only integers are allowed.
            if (onlyAllowIntegers) {
                if (newVal.includes(".")) {
                    newVal = newVal.split(".")[0]; // Take only the integer part
                }
            }

            // Allow intermediate states that end with a dot (like "5." or "0.")
            // **Potential Problem Without Fix:**
            // Without this fix, users who are in the middle of typing (e.g., "5.") might find their input
            // being rejected prematurely. This would prevent users from completing their input and result
            // in a frustrating experience. Allowing intermediate states ensures users can type and complete
            // their input without immediate validation errors.
            // We also allow numbers ending with "0" to handle cases like "0.00" and "5.000".
            if (newVal.endsWith(".") || newVal.endsWith("0")) {
                setValue(newVal);
                return; // Skip further validation to allow intermediate states
            }

            // Validate if the input is a valid number
            // **Potential Problem Without Fix:**
            // Without checking if the input is a valid number, users might enter invalid formats that
            // cannot be parsed, such as "abc" or "5..5". This fix ensures that only valid numbers are
            // accepted, improving the accuracy of the input field.
            // Intermediate states ending with a dot are allowed to ensure users can continue typing.
            if (newVal !== "" && isNaN(Number(newVal)) && !newVal.endsWith(".")) {
                return; // If it's not a valid number and does not end with a dot, reject the input
            }

            // Parse the number and clamp it between min and max
            // **Potential Problem Without Fix:**
            // Without clamping, users might input numbers outside the allowed range, leading to
            // invalid values being accepted. This fix ensures that the number is within the specified
            // range, avoiding errors or unexpected behavior in the application.
            let parsedNum = parseFloat(newVal);

            // Ensure that the number is within the specified range
            parsedNum = Math.min(max, parsedNum);
            parsedNum = Math.max(min, parsedNum);

            // Update the state with the valid number
            // **Potential Problem Without Fix:**
            // If we don't update the state correctly, the displayed value might be incorrect or outdated,
            // leading to inconsistencies between the input field and the internal state.
            setValue(parsedNum.toString());
        }

        return (
            <input
                ref={ref} // Forward the ref here
                className={className}
                value={value}
                onChange={inputChangeHandler}
                placeholder={placeholder}
            />
        );
    },
);

export default NumberInput;
