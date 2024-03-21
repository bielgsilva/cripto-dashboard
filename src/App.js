import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Dashboard from "./pages/dashboard";
import Criptos from "./pages/criptos";
import Calendar from "./pages/calendar";
import Notes from "./pages/notes";
import Mercado from "./pages/mercado";
import Links from "./pages/links";

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
                       <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/criptos" element={<Criptos />} />

                <Route path="/calendar" element={<Calendar />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/mercado" element={<Mercado />} />
                <Route path="/links" element={<Links />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
