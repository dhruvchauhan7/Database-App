import { db } from '..//db.js';
//import jwt from "jsonwebtoken";

export const getMostItemsUsers = (req, res) => {
    const { staticDate } = req.query; // Retrieve the static date from the query parameter

    const q = `SELECT u.u_id, u.username, COUNT(p.p_id) AS productCount
    FROM products p
    JOIN user u ON u.u_id = p.u_id
    WHERE DATE(p.created_at) = ?
    GROUP BY u.u_id, u.username
    ORDER BY productCount DESC
    LIMIT 1;`
        ;

    db.query(q, [staticDate], (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.send(data);
        }
    });
};

//-----------------------------------------------------------------------------------------

export const getProductsWithGoodRatings = async (req, res) => {
    const { username } = req.query;

    const q = `
    SELECT pr.title AS title, rv.rating
    FROM products pr
    JOIN reviews rv ON pr.p_id = rv.p_id
    JOIN user u ON pr.u_id = u.u_id
    WHERE u.username = ? AND (rv.rating = 'excellent' OR rv.rating = 'good')`;

    db.query(q, [username], (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.send(data);
        }
    });
};

//-----------------------------------------------------------------------------------------

export const getNoPoorReviews = (req, res) => {
    const query = `
        SELECT u.u_id, u.username
        FROM user u
        WHERE NOT EXISTS (
            SELECT 1
            FROM reviews r
            WHERE r.u_id = u.u_id AND r.rating = 'bad'
        )
    `;

    db.query(query, (err, data) => {
        if (err) {
            console.error('Error fetching users with no poor ratings:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.send(data);
        }
    });
};

//-----------------------------------------------------------------------------------------

export const getPoorReviews = (req, res) => {
    const query = `
        SELECT u.u_id, u.username
        FROM user u
        WHERE (
            SELECT 1
            FROM reviews r
            WHERE r.u_id = u.u_id AND r.rating = 'bad'
        )
    `;

    db.query(query, (err, data) => {
        if (err) {
            console.error('Error fetching users with no poor ratings:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.send(data);
        }
    });
};

//-----------------------------------------------------------------------------------------

export const twoCategories = (req, res) => {
    const { category1, category2 } = req.body;

    const query = `
    SELECT DISTINCT u.u_id, u.username
    FROM user u
    JOIN products p1 ON u.u_id = p1.u_id
    JOIN products p2 ON u.u_id = p2.u_id
    WHERE p1.category = ? 
      AND p2.category = ? 
      AND DATE(p1.created_at) = DATE(p2.created_at)
    `;

    db.query(query, [category1, category2], (err, data) => {
        if (err) {
            console.error('Error fetching users with two categories:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.send(data);
        }
    });
};


//-----------------------------------------------------------------------------------------


export const getAllUsers = (req, res) => {

    const q = 'SELECT u_id, username FROM user';

    db.query(q, (err, data) => {
        if (err) {
            console.error('Error fetching usersss:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.send(data);
        }
    });
};


export const favourite = (req, res) => {
    const { u_id, fav } = req.body; // Assuming these values are sent in the request body

    if (!u_id || !fav) {
        return res.status(400).json({ message: 'Missing user IDs or favorite' });
    }

    const q = 'UPDATE user SET fav = ? WHERE u_id = ?';

    db.query(q, [fav, u_id], (err, result) => {
        if (err) {
            console.error('Error updating favorite:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Favorite updated successfully' });
        }
    });
};


export const findCommonFavourite = (req, res) => {
    const { user1, user2 } = req.body; // Assuming user1 and user2 IDs are sent in the request body

    if (!user1 || !user2) {
        return res.status(400).json({ message: 'Missing user IDs' });
    }

    const q = `
      SELECT u.fav AS commonFavourite
      FROM user u
      WHERE u.u_id = ? AND u.fav IN (
        SELECT fav
        FROM user
        WHERE u_id = ?
      )`;

    db.query(q, [user1, user2], (err, result) => {
        if (err) {
            console.error('Error finding common favourite:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'No common favourite found' });
            } else {
                const commonFavourite = result[0].commonFavourite;
                res.status(200).json({ commonFavourite });
            }
        }
    });
};

