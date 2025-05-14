import React, { useState } from 'react';
import axios from 'axios';

export default function AddCarProduct() {
  const [carData, setCarData] = useState({
    car_name: '',
    Model: '',
    FuelType: 'Petrol',
    Price: '',
    transmission: 'Automatic',
    Mileage: '',
    Color: '#000000',
    Car_img: null
  });

  console.log(carData);
  const [imagePreview, setImagePreview] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCarData(prev => ({ ...prev, Car_img: file }));

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(carData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post('http://localhost:8080/AddProduct', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSubmissionStatus({ success: true, message: 'Car added successfully!' });
      setCarData({
        car_name: '', Model: '', FuelType: 'Petrol', Price: '',
        transmission: 'Automatic', Mileage: '', Color: '#000000', Car_img: null
      });
      setImagePreview('');
    } catch (err) {
      setSubmissionStatus({
        success: false,
        message: err.response?.data?.message || 'Something went wrong while adding the car.'
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Add New Car</h1>

      {submissionStatus && (
        <div className={`p-3 mb-6 rounded text-sm ${submissionStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {submissionStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-gray-600 font-medium">Car Name*</label>
          <input type="text" name="car_name" value={carData.car_name} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" placeholder="e.g. Toyota Fortuner" />
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Model*</label>
          <input type="text" name="Model" value={carData.Model} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" placeholder="e.g. 2024 ZX" />
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Fuel Type*</label>
          <select name="FuelType" value={carData.FuelType} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-md">
            {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Transmission*</label>
          <select name="transmission" value={carData.transmission} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-md">
            {['Automatic', 'Manual', 'Semi-Automatic'].map(trans => (
              <option key={trans} value={trans}>{trans}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Price ($)*</label>
          <input type="text" name="Price" value={carData.Price} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" placeholder="e.g. 25000" />
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Mileage*</label>
          <input type="text" name="Mileage" value={carData.Mileage} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" placeholder="e.g. 15 km/l" />
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Color*</label>
          <input type="color" name="Color" value={carData.Color} onChange={handleChange}
            className="w-16 h-10 p-1 border rounded-md" />
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Upload Car Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md bg-white file:border-none file:bg-blue-600 file:text-white file:rounded file:px-4 file:py-1" />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-20 object-cover rounded-md border" />
          )}
        </div>

        <div className="md:col-span-2">
          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
