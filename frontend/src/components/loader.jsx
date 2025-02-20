import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <motion.div
        className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin"
        animate={{ scale:0,opacity:0 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

export default Loader;
