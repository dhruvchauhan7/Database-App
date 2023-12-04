import { db } from '..//db.js';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {

  // check exisiting user
  const q = "SELECT * FROM user WHERE email = ?"

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const q = "INSERT INTO user(`username`,`firstname`,`lastname`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.password];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    })
  });
};

//----------------------------------------------------------------------------------------

export const login = (req, res) => {

  console.log(req.body);

  const q = "SELECT * FROM user WHERE `email` = ? AND `password` = ?";

  db.query(q, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    if (data.length === 0) return res.status(404).json("User not found!!!");

    if (req.body.password !== data[0].password)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ u_id: data[0].u_id }, "jwtkey");

    console.log("Generated Token:", token);

    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

//----------------------------------------------------------------------------------------


export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.")
};

//----------------------------------------------------------------------------------------

export const initializedatabase = (req, res) => {
  // Drop tables in the reverse order to avoid foreign key constraint issues
  const dropReviewsQuery = "DROP TABLE IF EXISTS reviews";
  const dropProductsQuery = "DROP TABLE IF EXISTS products";
  const dropUsersQuery = "DROP TABLE IF EXISTS user";

  const createUsersQuery = `
    CREATE TABLE user (
      u_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      firstname VARCHAR(50) NOT NULL,
      lastname VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL
    )
  `;

  const createProductsQuery = `
  CREATE TABLE products (
    p_id INT AUTO_INCREMENT PRIMARY KEY,
    u_id INT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (u_id) REFERENCES user(u_id)
  )
`;


  const createReviewsQuery = `
    CREATE TABLE reviews (
      r_id INT AUTO_INCREMENT PRIMARY KEY,
      p_id INT,
      u_id INT,
      reviewText TEXT,
      rating VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (p_id) REFERENCES products(p_id),
      FOREIGN KEY (u_id) REFERENCES user(u_id)
    )
  `;

  db.query(dropReviewsQuery, (err1) => {
    if (err1) return res.status(500).json(err1);

    db.query(dropProductsQuery, (err2) => {
      if (err2) return res.status(500).json(err2);

      db.query(dropUsersQuery, (err3) => {
        if (err3) return res.status(500).json(err3);

        // Recreate tables
        db.query(createUsersQuery, (err4) => {
          if (err4) return res.status(500).json(err4);

          db.query(createProductsQuery, (err5) => {
            if (err5) return res.status(500).json(err5);

            db.query(createReviewsQuery, (err6) => {
              if (err6) return res.status(500).json(err6);

              // Insert data into tables if needed

              const userValues = [
                ['namo', 'Narendra', 'Modi', 'namo@gmail.com', 'namo123'],
                ['saumil', 'Saumil', 'Patel', 'saumil@gmail.com', 'saumil123'],
                ['manav', 'Manav', 'Patil', 'manav@gmail.com', 'manav123'],
                
              ];

              const productValues = [
                [3, '2 States', 'Nice Movie', 'Book', 10.99],
                [3, 'Pen', 'Helpful', 'Stationery', 20.99],
                [3, 'Samsung S23', 'Expensive Phone', 'Smartphone', 20.99],
                // Add more products as needed
              ];

              const reviewValues = [
                [3, 3, 'My dad gifted me this phone', 'Excellent'],
                [3, 3, 'This phone is very cheap. Next', 'Fair'],
                [3, 3, 'I can see the moon.', 'Good'],
              ];

              db.query("INSERT INTO user (username, firstname, lastname, email, password) VALUES ?", [userValues], (err7) => {
                if (err7) return res.status(500).json(err7);

                db.query("INSERT INTO products (u_id, title, description, category, price) VALUES ?", [productValues], (err8) => {
                  if (err8) return res.status(500).json(err8);

                  db.query("INSERT INTO reviews (p_id, u_id, reviewText, rating) VALUES ?", [reviewValues], (err9) => {
                    if (err9) return res.status(500).json(err9);

                    return res.status(200).json("Database initialized with new tables and data.");


                  });
                });
              });
            });
          });
        });
      });
    });
  });
};





