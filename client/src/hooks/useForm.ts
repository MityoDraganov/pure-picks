import { ChangeEvent, useState } from 'react';

const useFormData = <T extends {}>(
    initialValues: T
): [T, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { id: string, value: string } | FileList) => void] => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { id: string, value: string } | FileList) => {
        if ('target' in e) {
            const { id, value, type } = e.target;
            if (type === 'file') {
                // Handle file input
                const files = (e.target as HTMLInputElement).files;
                setFormData(prevState => ({
                    ...prevState,
                    [id]: files ? files[0] : null, // Only take the first file
                }));
            } else {
                // Handle other inputs
                setFormData(prevState => ({
                    ...prevState,
                    [id]: value,
                }));
            }
        } else {
            // Handle direct assignment (when called programmatically)
            const files = e as FileList;
            setFormData(prevState => ({
                ...prevState,
                file: files[0] || null,
            }));
        }
    };

    return [formData, handleChange];
};

export default useFormData;
