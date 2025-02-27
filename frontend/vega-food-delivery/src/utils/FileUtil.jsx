export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.split(',')[1]; // Extract Base64 without metadata
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
    });
};

export const extractFileName = (file) => {
    // return file ? file.name.split('.').slice(0, -1).join('.') : '';
    return file ? file.name : '';
};

export const extractFileExtension = (file) => {
    return file ? file.name.split('.').pop() : '';
};

export const convertBase64ToFile = (base64String, fileName, fileType) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], fileName, { type: fileType });

    return file;
};

