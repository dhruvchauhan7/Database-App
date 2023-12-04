import { db } from '..//db.js';
import jwt from "jsonwebtoken";

export const getProducts = (req, res) => {

    const q = 'SELECT * FROM products';

    db.query(q, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.send(data);
        }
    });
};

export const getProduct = (req, res) => {
    res.json("from controller")
}

// export const addProduct = (req, res=>{
//     const sql = "INSERT INTO products (`u_id`,`title`,`description`,`category`,`price`) VALUES (?)";

//     const values = [
//         req.body.u_id,
//         req.body.title,
//         req.body.description,
//         req.body.category,
//         req.body.price
//     ]

//     db.query(sql, [values], (err, data) => {
//         if (err) {
//             return res.json("Error");
//         }
//         return res.json(data);
//     })
// })

export const addProduct = (req, res) => {
    const { u_id, title, description, category, price } = req.body;
  
    const q = 'INSERT INTO products (u_id, title, description, category, price) VALUES (?, ?, ?, ?, ?)';
    const values = [u_id, title, description, category, price];
  
    db.query(q, values, (err, result) => {
      if (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ message: 'Failed to add product' });
      } else {
        res.status(201).json({ message: 'Product added successfully' });
      }
    });
  };

  export const addReview=(req,res)=>{
      const {u_id, p_id, reviewText, rating } = req.body;

      const q = 'INSERT INTO reviews (u_id, p_id, reviewText, rating) VALUES (?,?,?,?)';
      const values = [u_id, p_id, reviewText, rating];

      db.query(q, values, (err, result) => {
        if (err) {
          console.error('Error adding review:', err);
          res.status(500).json({ message: 'Failed to add product' });
        } else {
          res.status(201).json({ message: 'Review added successfully' });
        }
      });
  };
  
  export const Review=(req,res)=>{
    res.send("Hello, World!");
  };




// export const addProduct = async (req, res) => {

//     const token = req.cookies.access_token;
//     if (!token) return res.status(401).json("Not authenticated!");

//     jwt.verify(token, "jwtkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!");

//         const q =
//             "INSERT INTO products (`u_id`, `title`,`description`,`category`,`price`) VALUES (?)";

//         const values = [
//             userInfo.id,
//             req.body.title,
//             req.body.description,
//             req.body.category,
//             req.body.price

//         ];

//         db.query(q, [values], (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.json("Product has been inserted.");
//         });
//     });

// };



