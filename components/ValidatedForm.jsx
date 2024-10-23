import React, { useState } from 'react';

const ValidatedForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name should only contain letters and spaces';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone number should be 10 digits';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      setSubmittedData(formData); // Save the form data
      setShowPopup(true); // Show the popup
    } else {
      setErrors(newErrors);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-xl font-bold text-gray-800">Contact Form</h1>
          <p className="text-sm text-gray-500 mt-1">Please fill out all required fields</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded bg-white"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded bg-white"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded bg-white"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-600"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Popup modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Submitted Data</h2>
            <pre className="text-sm bg-gray-100 p-4 rounded">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidatedForm;
