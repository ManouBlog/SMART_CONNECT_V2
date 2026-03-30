import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store/slices/modalSlice";

export default function Modal({ children }) {
  const dispatch = useDispatch();
  const { isOpen, title } = useSelector((state) => state.modal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-10 p-4"
    onClick={(e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  }}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-6 relative overflow-hidden"
        style={{ maxHeight: "80vh" }} // hauteur max pour scroll
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          onClick={() => dispatch(closeModal())}
        >
          ✕
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {/* Content area with scroll */}
        <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
