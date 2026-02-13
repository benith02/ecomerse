import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleDashed } from "lucide-react";
import "./StatusButton.css";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function StatusButton() {
  const [status, setStatus] = useState("Add to cart");
  const isEnabled = status === "Add to cart";

  const changeStatus = async () => {
    if (!isEnabled) return;

    setStatus("loading");
    await wait(1500);
    setStatus("Added to cart");
    await wait(1500);
    setStatus("Add to cart");
  };

  return (
    <button
      onClick={changeStatus}
      disabled={!isEnabled}
      className="status-button"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.1 }}
          className="status-content"
        >
          {status === "Added to cart" && (
            <motion.span
              className="icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <CheckCircle2 size={18} />
            </motion.span>
          )}

          {status === "loading" ? (
            <CircleDashed size={18} className="spin" />
          ) : (
            status
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
