import Header from "@/components/Header/Header";
import SimpleBottomNavigation from "@/components/MainNav";
import "@/styles/globals.css";
import { Container } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="app">
        <Container>
          <Component {...pageProps} />
        </Container>
      </div>
      <div>
        <SimpleBottomNavigation />
      </div>
    </>
  );
}
