import React, { useState, useEffect, useContext } from 'react'
import axios, { Axios } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/authContext"
//import "./style.scss"
//import InitializeDatabaseButton from './InitializeDatabaseButton'

function Home() {

  const { currentUser } = useContext(AuthContext)

  const [values, setValues] = useState({
    u_id: currentUser?.u_id,
    title: '',
    description: '',
    category: '',
    price: '',

  })

  //const navigate = useNavigate();

  const [errors, setErrors] = useState({})

  //---------------------------------------------------------------------------------------------
  const [dailyPostCount, setDailyPostCount] = useState(0); // Track daily post count
  const [isExceedingLimit, setIsExceedingLimit] = useState(false);


  useEffect(() => {
    // Fetch the current user's daily post count
    axios.get(`http://localhost:8080/backend/home${currentUser?.u_id}`)
      .then(res => {
        setDailyPostCount(res.data.count);
        setIsExceedingLimit(res.data.count > 3); // Check if the limit is exceeded
      })
      .catch(err => console.log(err));
  }, [currentUser?.u_id]);

  // ---------------------------------------------------------

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }


  const handleSubmit = (event) => {

    event.preventDefault();

    //----------------------------------------------------------------
     // Check if the user has exceeded the daily post limit
     if (isExceedingLimit) {
      alert('You have reached the daily limit of 3 posts.');
      return;
    }
    //------------------------------------------------------------

    axios.post('http://localhost:8080/backend/products/home', values)
      .then(res => {
        //navigate('/products');
        alert("Product Added Successfully!");
        event.target.reset();

        // Update the daily post count
        setDailyPostCount((prevCount) => prevCount + 1);
        setIsExceedingLimit(dailyPostCount + 1 >= 3);

      })
      .catch(err => console.log(err));

  }

  return (
    <div className="home">
      <h1>Add Products</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="productform">

          <input
            type='text'
            name='u_id'
            defaultValue={currentUser?.u_id}
            readOnly
            onChange={handleInput}>
          </input>
          <input
            type='text'
            name='title'
            placeholder="Enter Product Title"
            onChange={handleInput}>
          </input>

          <input type='text' name='description' placeholder="Enter Product Description" onChange={handleInput}></input>
          <input type='text' name='category' placeholder="Enter Product Category" onChange={handleInput}></input>
          <input type='text' name='price' placeholder="Enter Product Price" onChange={handleInput}></input>


          <button type='submit'>Submit</button>

        </div>
      </form>
      {/* <div className="mybutton">
        <button style={{ display: 'grid', textAlign: 'center', justifyContent: 'center' }}><Link to="/products">View All Products </Link></button>
      </div> */}
      {/* <InitializeDatabaseButton/> */}
    </div>

  )
}

export default Home;

