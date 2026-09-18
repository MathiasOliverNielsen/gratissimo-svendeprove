import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { LoginReminder } from "../LoginReminder/LoginReminder";
import "./Layout.module.scss";

export function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="layout-content">
        <LoginReminder />
        {children}
      </main>
      <Footer />
    </div>
  );
}
