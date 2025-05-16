import { useState } from 'react';

interface ValidationRules {
    [key: string]: (value: string) => string | null;
}

export default function useFormValidation(initialValues: Record<string, string>) {
    const [values, setValues] = useState<Record<string, string>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const validateField = (name: string, value: string, rules: ValidationRules): string | null => {
        if (rules[name]) {
            return rules[name](value);
        }
        return null;
    };

    const validateForm = (rules: ValidationRules): boolean => {
        const formErrors: Record<string, string> = {};
        let isValid = true;

        Object.keys(values).forEach(key => {
            const error = validateField(key, values[key], rules);
            if (error) {
                formErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(formErrors);
        return isValid;
    };

    return {
        values,
        errors,
        setValues,
        handleChange,
        validateForm
    };
} 