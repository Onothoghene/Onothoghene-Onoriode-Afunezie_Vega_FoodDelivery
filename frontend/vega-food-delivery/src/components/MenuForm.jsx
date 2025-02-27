import React, { useEffect, useRef, useState } from 'react'
import { convertFileToBase64, extractFileExtension, extractFileName } from '../utils/FileUtil';
import MenuService from '../services/MenuService';
import toast from 'react-hot-toast';

const MenuForm = ({ selectedItem, onFormSubmit }) => {
    const fileInputRef = useRef();
    const [uploadType, setUploadType] = useState('file');
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        price: '',
        categoryId: 0,
        description: '',
        imageURL: '',
        fileBinary: null,
        fileFormat: '',
        fileName: '',
    });

    useEffect(() => {
        if (selectedItem) {
            setFormData({
                id: selectedItem.id,
                name: selectedItem.name || '',
                price: selectedItem.price || '',
                categoryId: selectedItem.categoryId || 0,
                description: selectedItem.description || '',
                imageURL: selectedItem.images?.imageURL || '',
                fileBinary: selectedItem.images?.fileBinary || null,
                fileFormat: selectedItem.images?.fileFormat || '',
                fileName: selectedItem.images?.fileName || '',
            });
        } else {
            setFormData({
                id: 0,
                name: '',
                price: '',
                categoryId: 0,
                description: '',
                imageURL: '',
                fileBinary: null,
                fileFormat: '',
                fileName: '',
            });
        }
    }, [selectedItem]);

    const handleChange = async (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file' && files.length > 0) {
            const file = files[0];
            try {
                const base64String = await convertFileToBase64(file);
                setFormData((prev) => ({
                    ...prev,
                    fileBinary: base64String,
                    fileName: extractFileName(file),
                    fileFormat: extractFileExtension(file),
                }));
            } catch (error) {
                toast.error("Error processing file.");
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            price: formData.price,
            description: formData.description,
            // imageURL: formData.fileBinary ? '' : formData.imageURL,
            // fileBinary: formData.fileBinary,
            // fileName: formData.fileName,
            // fileFormat: formData.fileFormat,
            imageURL: uploadType === 'link' ? formData.imageURL : '',
            fileBinary: uploadType === 'file' ? formData.fileBinary : null,
            fileName: uploadType === 'file' ? formData.fileName : '',
            fileFormat: uploadType === 'file' ? formData.fileFormat : '', 
        };

        try {
            await MenuService.saveMenuItem(formData);
            toast.success(`Menu item ${formData.id ? 'updated' : 'added'} successfully!`);

            // Clear form after submission
            setFormData({
                id: 0,
                name: '',
                price: '',
                categoryId: 0,
                description: '',
                imageURL: '',
                fileBinary: null,
                fileFormat: '',
                fileName: '',
            });

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            // e.target.reset(); // Reset the file input field manually
            // document.getElementById('fileInput').value = ''; // Clear file input
            // Notify parent to refresh menu
            onFormSubmit();
        } catch (error) {
            toast.error("Error saving menu item.");
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64String = await convertFileToBase64(file);
                setFormData((prev) => ({
                    ...prev,
                    fileBinary: base64String,
                    fileName: extractFileName(file),
                    fileFormat: extractFileExtension(file),
                    imageURL: '', // Clear URL input when a file is selected
                }));
            } catch (error) {
                toast.error("Error processing file.");
            }
        }
    };

    useEffect(() => {
        if (uploadType === 'file') {
            setFormData((prev) => ({
                ...prev,
                imageURL: '', // Clear image URL when switching to file upload
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                fileBinary: null,
                fileName: '',
                fileFormat: '',
            }));
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear file input field
            }
        }
    }, [uploadType]);
    


    return (
        <div className="container mt-4">
            <h2>Add Menu Item</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded">
                <div className="mb-3">
                    <input type="text" name="name" className="form-control"
                        placeholder="Item Name" onChange={handleChange} value={formData.name} required />
                </div>
                <div className="mb-3">
                    <input type="number" name="price" className="form-control"
                        placeholder="Price" onChange={handleChange} value={formData.price} required />
                </div>
                <div className="mb-3">
                    <input type="text" name="description" className="form-control"
                        placeholder="Description" onChange={handleChange} value={formData.description} required />
                </div>
                {/* <div className="mb-3">
                    <input type="text" name="imageURL" className="form-control"
                        placeholder="Link (optional)" onChange={handleChange} value={formData.imageURL} />
                </div>
                <div className="mb-3"> */}
                {/* <input type="file" name="file" className="form-control" id="fileInput" accept="image/*"
                        onChange={handleChange} value={formData.file} /> */}
                {/* <input type="file" ref={fileInputRef} name="file" className="form-control" id="fileInput" accept="image/*"
    onChange={handleFileChange} />

                </div> */}

                <div className="mb-3">
                    <label>Choose Image Type:</label>
                    <div>
                        <input
                            type="radio"
                            id="fileUpload"
                            name="uploadType"
                            value="file"
                            checked={uploadType === 'file'}
                            onChange={() => setUploadType('file')}
                        />
                        <label htmlFor="fileUpload">File Upload</label>

                        <input
                            type="radio"
                            id="linkUpload"
                            name="uploadType"
                            value="imageURL"
                            checked={uploadType === 'link'}
                            onChange={() => setUploadType('link')}
                            style={{ marginLeft: '10px' }}
                        />
                        <label htmlFor="linkUpload">Image URL</label>
                    </div>
                </div>

                {/* Conditional Rendering for File or URL */}
                {uploadType === 'file' ? (
                    <div className="mb-3">
                        <input type="file" 
                        ref={fileInputRef} name="file" 
                        className="form-control" id="fileInput" accept="image/*"
                            onChange={handleFileChange} />
                    </div>
                ) : (
                    <div className="mb-3">
                        <input type="text" name="imageURL" className="form-control"
                            placeholder="Enter Image URL" 
                            onChange={handleChange} 
                            value={formData.imageURL || ''} />
                    </div>
                )}

                {formData.fileBinary && (
                    <img
                        src={`data:${formData.fileFormat};base64,${formData.fileBinary}`}
                        alt="Preview"
                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                    />
                )}

                <button type="submit" className="btn btn-primary w-100">Add Item</button>
            </form>
        </div>
    );
};


export default MenuForm