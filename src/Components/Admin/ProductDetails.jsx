  import React, { useEffect, useState } from 'react';
  import axios from 'axios';

  export default function CarProductTable() {
    const [cars, setCars] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
      fetchCars();
    }, []);

    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:8080/GetAllProducts');
        setCars(res.data.data); // assuming API returns { data: [...] }
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };

    const handleEdit = (index) => {
      setEditIndex(index);
      setEditData({ ...cars[index] });
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
      try {
        await axios.put(`http://localhost:8080/UpdateProduct/${editData._id}`, editData);
        const updatedCars = [...cars];
        updatedCars[editIndex] = editData;
        setCars(updatedCars);
        setEditIndex(null);
      } catch (err) {
        console.error('Error updating car:', err);
      }
    };

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/DeleteProduct/${id}`);
        const updatedCars = cars.filter((car) => car._id !== id);
        setCars(updatedCars);
      } catch (err) {
        console.error('Error deleting car:', err);
      }
    };

    return (
      <div className="p-6 mt-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Car Product List</h2>
        <table className="min-w-full border bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Car Name</th>
              <th className="p-3 border">Model</th>
              <th className="p-3 border">Fuel</th>
              <th className="p-3 border">Transmission</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Mileage</th>
              <th className="p-3 border">Color</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car._id} className="text-center">
                <td className="p-2 border">
                  {editIndex === index ? (
                    <input
                      name="car_name"
                      value={editData.car_name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    car.car_name
                  )}
                </td>
                <td className="p-2 border">
                  {editIndex === index ? (
                    <input
                      name="Model"
                      value={editData.Model}
                      onChange={handleInputChange}
                    />
                  ) : (
                    car.Model
                  )}
                </td>
                <td className="p-2 border">
                  {editIndex === index ? (
                    <select
                      name="FuelType"
                      value={editData.FuelType}
                      onChange={handleInputChange}
                    >
                      {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  ) : (
                    car.FuelType
                  )}
                </td>
                <td className="p-2 border">
                  {editIndex === index ? (
                    <select
                      name="transmission"
                      value={editData.transmission}
                      onChange={handleInputChange}
                    >
                      {['Automatic', 'Manual', 'Semi-Automatic'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  ) : (
                    car.transmission
                  )}
                </td>
                <td className="p-2 border">
                  {editIndex === index ? (
                    <input
                      name="Price"
                      value={editData.Price}
                      onChange={handleInputChange}
                    />
                  ) : (
                    `$${car.Price}`
                  )}
                </td>
                <td className="p-2 border">
                  {editIndex === index ? (
                    <input
                      name="Mileage"
                      value={editData.Mileage}
                      onChange={handleInputChange}
                    />
                  ) : (
                    car.Mileage
                  )}
                </td>
                <td className="p-2 border">
                  {editIndex === index ? (
                    <input
                      type="color"
                      name="Color"
                      value={editData.Color}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div
                      style={{ backgroundColor: car.Color }}
                      className="w-6 h-6 inline-block rounded"
                    ></div>
                  )}
                </td>
                <td className="p-2 border space-x-2">
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
