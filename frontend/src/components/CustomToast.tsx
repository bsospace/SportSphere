/**
 * CustomToast.tsx
 * This file is responsible for creating custom toasts.
 * Created: 28/01/2025
 */

import React from "react";
import { toast, Bounce } from "react-toastify";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

/**
 * CustomToastProps
 * @param {type} { "success" | "warning" | "danger" } - Type of toast
 * @param {message} - Message to display
 */

interface CustomToastProps {
  type: "success" | "warning" | "danger";
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ type, message }) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <FaCheckCircle color="#ffffff" className="mb-1 mr-2" size={24} />
        );
      case "warning":
        return (
          <FaExclamationTriangle
            color="#ffffff"
            className="mb-1 mr-2"
            size={24}
          />
        );
      case "danger":
        return (
          <FaTimesCircle color="#ffffff" className="mb-1 mr-2" size={24} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center text-white">
      {getIcon()}
      <span className="flex-1">{message}</span>
    </div>
  );
};

// Function to show the custom toast
const showCustomToast = (
  type: "success" | "warning" | "danger",
  message: string
) => {
  let backgroundColor;

  switch (type) {
    case "success":
      backgroundColor = "#63BE00";
      break;
    case "warning":
      backgroundColor = "#EC920E";
      break;
    case "danger":
      backgroundColor = "#EF4444";
      break;
    default:
      backgroundColor = "#2563EB";
  }

  toast(<CustomToast type={type} message={message} />, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor,
    },
    transition: Bounce,
    progressClassName: "toast-progress-bar",
  });
};

export { CustomToast, showCustomToast };