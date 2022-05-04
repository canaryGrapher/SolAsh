import React, { useState } from "react";

// importing the components
import Navbar from "@components/root/Navbar";
import Footer from "@components/root/Footer";
import LoginModal from "@components/modal";

// importing types
export type LayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: LayoutProps) => {
  const [isLoginModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen(!isLoginModalOpen);
  };
  return (
    <div className="overflow-x-hidden">
      <Navbar toggleFunction={toggleModal} loggedIn={isLoggedIn} />
      {isLoginModalOpen && !isLoggedIn && (
        <LoginModal toggleFunction={toggleModal} />
      )}
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
