import { ReactNode } from "react";
import BottomNav from "./BottomNav";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen pb-16 bg-gray-100">
      {children}
      <BottomNav />
    </div>
  );
};

export default Layout;
