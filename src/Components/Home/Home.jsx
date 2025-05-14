
import React, { useEffect, useState } from 'react';
import SilidingBar from './SilidingBar'
import axios from 'axios';

export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:8080/GetAllProducts');
      setCars(res.data.data);
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };

  return (
    <div>
      <div   className=''>

         <SilidingBar/>




      </div>  

      <div className="max-w-7xl mx-auto px-4 py-10 mt-20">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          🚗 Available Cars
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <div className="p-5">
                {/* Optional: Image placeholder */}
                {/* <div className="mb-4 h-40 bg-gray-100 rounded-lg"></div> */}

                <h2 className="text-2xl font-bold text-gray-800 mb-2">{car.car_name}</h2>
                <p className="text-gray-600 mb-1">Model: <span className="font-medium">{car.Model}</span></p>
                <p className="text-gray-600 mb-1">Fuel Type: <span className="font-medium">{car.FuelType}</span></p>
                <p className="text-gray-600 mb-1">Transmission: <span className="font-medium">{car.transmission}</span></p>
                <p className="text-gray-600 mb-1">Mileage: <span className="font-medium">{car.Mileage} km/l</span></p>

                <p className="text-green-700 font-semibold text-lg mt-3">
                  ₹{car.Price.toLocaleString()}
                </p>

                <div className="flex items-center mt-4">
                  <span className="text-sm text-gray-600 mr-3">Color:</span>
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-inner"
                    title={car.Color}
                    style={{ backgroundColor: car.Color }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>


  );
}



