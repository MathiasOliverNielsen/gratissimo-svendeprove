import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "./Layout.module.scss";

export function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
}
