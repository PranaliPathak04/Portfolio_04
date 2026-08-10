import { motion } from "framer-motion";

// export const Reveal = ({ children }) => {
//   return (
//     <motion.div
//       // 1. Where the element starts (Invisible and 50px down)
//       initial={{ opacity: 0, y: 50 }} 
//       // 2. Where it ends when you scroll to it
//       whileInView={{ opacity: 1, y: 0 }} 
//       // 3. How long it takes (0.6s is the "sweet spot")
//       transition={{ duration: 0.6, ease: "easeOut" }} 
//       // 4. Only animate the first time you see it
//       viewport={{ once: true, amount: 0.2 }} 
//     >
//       {children}
//     </motion.div>
//   );
// };

// export const Reveal = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9, y: 30 }}
//       whileInView={{ opacity: 1, scale: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       transition={{
//         type: "spring",
//         stiffness: 100,
//         damping: 20,
//         mass: 1
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

export const Reveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} // Added a slight blur for a "focus" effect
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      // 'margin: "-100px"' ensures the next element doesn't trigger 
      // until it's 100px inside the viewport, creating a natural gap
      viewport={{ once: true, margin: "-100px" }} 
      transition={{ 
        duration: 0.7, 
        ease: [0.21, 0.47, 0.32, 0.98] // A "sleek" cubic-bezier curve
      }}
    >
      {children}
    </motion.div>
  );
}



