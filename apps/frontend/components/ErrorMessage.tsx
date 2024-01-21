import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-red-100 text-red-700 py-2" style={{ color: "red" }}>
      {message}
    </div>
  );
};

export default ErrorMessage;
