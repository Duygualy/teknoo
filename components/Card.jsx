// 
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import "../styles/Card.css";

export default function Card({ title, description, image }) {
  return (
    <motion.div className="card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <img src={image} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
}
