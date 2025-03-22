import { AnimatePresence, motion } from "motion/react";
import "./Modal.styles.scss";
import { ReactNode } from "react";

interface ModalProps {
  title?: string;
  children: ReactNode | ReactNode[];
  isOpen: boolean;
  handleClose: () => void;
}

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 0.25 },
  exit: { opacity: 0 },
};

const Modal = ({ isOpen, title, children, handleClose }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={"initial"}
            animate={"isOpen"}
            exit={"exit"}
            variants={modalVariant}
            onClick={handleClose}
          />

          <motion.div
            className="modal"
            key="modal"
            initial={{
              scale: 0.9,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: "auto",
            }}
            animate={{
              scale: 1,
              transition: { duration: 0.25 },
            }}
            exit={{ opacity: 0 }}
          >
            {title && <h1>{title}</h1>}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
