import React from "react";
import CustomSection from "./common/CustomSection";
export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t ">
      <CustomSection asDiv className="container-centered px-6 py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} TicketApp. All rights reserved.
      </CustomSection>
    </footer>
  );
}
