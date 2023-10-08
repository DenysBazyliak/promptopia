import Nav from "components/Nav";
import Provider from "components/Provider";

import "@styles/globals.css";
import KeywordContextProvider from "../contexts/KeywordContextProvider";

export const metadata = {
  title: "Promptopia",
  description: "Discover...",
};

const RootLayout = ({ children }) => {
  return (
    <html lang={"en"}>
      <body>
        <Provider>
          <div className={"main"}>
            <div className={"gradient"} />
          </div>
          <main className={"app"}>
            <Nav />
            <KeywordContextProvider>{children}</KeywordContextProvider>
          </main>
        </Provider>
      </body>
    </html>
  );
};
export default RootLayout;
