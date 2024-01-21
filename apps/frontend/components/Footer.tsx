import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-4 text-center" style={{ position: "fixed", bottom: 0, right: 5 }}>
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Hydrapa Shipping Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
