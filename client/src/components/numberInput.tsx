import React from "react";

interface NumericInputWithStringValueProps {
    className?: string;
    id?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    onlyAllowIntegers?: boolean;
    value: string;
    setValue: (value: string) => void;
    disabled?: boolean;
}

export const NumericInputWithStringValue = React.forwardRef<
    HTMLInputElement,
    NumericInputWithStringValueProps
>(
    (
        {
            className,
            id,
            placeholder = "0",
            min = Number.MIN_SAFE_INTEGER,
            max = Number.MAX_SAFE_INTEGER,
            onlyAllowIntegers = false,
            value,
            setValue,
            disabled = false,
        },
        ref,
    ) => {
        function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
            let newVal = e.target.value.trim();

            if (disabled) {
                return;
            }

            if (newVal === "") {
                setValue("");
                return;
            }

            if (newVal === "-" && min < 0) {
                setValue("-");
                return;
            }

            if (newVal.startsWith(".")) {
                newVal = "0" + newVal;
            }

            if (newVal.split(".").length > 2) {
                return;
            }

            if (onlyAllowIntegers) {
                if (newVal.includes(".")) {
                    newVal = newVal.split(".")[0];
                }
            }

            if (newVal.endsWith(".") || newVal.endsWith("0")) {
                setValue(newVal);
                return;
            }

            if (newVal !== "" && isNaN(Number(newVal)) && !newVal.endsWith(".")) {
                return;
            }

            let parsedNum = parseFloat(newVal);

            parsedNum = Math.min(max, parsedNum);
            parsedNum = Math.max(min, parsedNum);

            setValue(parsedNum.toString());
        }

        return (
            <input
                id={id}
                ref={ref}
                className={className}
                value={value}
                onChange={inputChangeHandler}
                placeholder={placeholder}
                disabled={disabled}
            />
        );
    },
);

interface NumericInputWithNumberValueProps {
    className?: string;
    id?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    onlyAllowIntegers?: boolean;
    value: number;
    setValue: (value: number) => void;
    disabled?: boolean;
}

export const NumericInputWithNumberValue = React.forwardRef<
    HTMLInputElement,
    NumericInputWithNumberValueProps
>(
    (
        {
            className,
            id,
            placeholder = "0",
            min = Number.MIN_SAFE_INTEGER,
            max = Number.MAX_SAFE_INTEGER,
            onlyAllowIntegers = false,
            value,
            setValue,
            disabled = false,
        },
        ref,
    ) => {
        const [inputValue, setInputValue] = React.useState<string>(value.toString());

        React.useEffect(() => {
            setInputValue(isNaN(value) ? "" : value.toString());
        }, [value]);

        function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
            let newVal = e.target.value.trim();

            if (disabled) {
                return;
            }
            if (newVal === "") {
                setInputValue("");
                setValue(NaN);
                return;
            }
            if (newVal === "-" && min < 0) {
                setInputValue("-");
                setValue(NaN);
                return;
            }
            if (newVal === "." && !onlyAllowIntegers) {
                setInputValue("0.");
                setValue(NaN);
                return;
            }
            if (newVal.split(".").length > 2) {
                return;
            }
            if (onlyAllowIntegers) {
                newVal = newVal.replace(/\..*/, "");
            }
            if (newVal.endsWith(".") || newVal === "-") {
                setInputValue(newVal);
                return;
            }

            if (isNaN(Number(newVal))) {
                return;
            }

            let parsedNum = parseFloat(newVal);

            if (!isNaN(parsedNum)) {
                parsedNum = Math.min(max, parsedNum);
                parsedNum = Math.max(min, parsedNum);
                setValue(parsedNum);
            }

            setInputValue(newVal);
        }

        return (
            <input
                id={id}
                ref={ref}
                className={className}
                value={inputValue}
                onChange={inputChangeHandler}
                placeholder={placeholder}
                disabled={disabled}
            />
        );
    },
);
