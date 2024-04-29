import { ChangeEvent, useState } from 'react';

const useFormData = <T extends {}>(
    initialValues: T
): [T, (e: ChangeEvent<HTMLInputElement>) => void] => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [id]: value,
        }));
    };

    return [formData, handleChange];
};

export default useFormData;