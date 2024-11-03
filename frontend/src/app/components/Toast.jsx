import React, { useState, useEffect } from "react";

const Toast = ({ text }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!text) return null;

  return (
    <div className="toast toast-bottom toast-center">
      <div className="alert alert-info">
        <div>
          <span>{text}</span>
        </div>
        <div className="flex-none">
          <button className="btn btn-sm btn-ghost" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
