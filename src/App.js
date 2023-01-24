import { useState } from "react";
import Navbar from "./components/navbar";
import CodeWriter from "./pages/codeWriter";
import SecurityThreatsChecker from "./pages/securityThreatsChecker";
import TestWriter from "./pages/testWriter";
import CodeComplaianceChecker from "./pages/generateDoc";

const NavbarItems = {
  TestWriter: "Write unit and functional tests",
  CodeWriter: "Write code from tests",
  SecurityThreatsChecker: "Check for application security threats",
  GenerateDocumentation: "Generate documentation",
};

function App() {
  const [currentPage, setCurrentPage] = useState(NavbarItems.TestWriter);

  return (
    <div className="bg-wave-blue container mx-auto">
      <Navbar
        currentPage={currentPage}
        changePage={setCurrentPage}
        navbarItems={NavbarItems}
      />
      {currentPage === NavbarItems.TestWriter && <TestWriter />}
      {currentPage === NavbarItems.CodeWriter && <CodeWriter />}
      {currentPage === NavbarItems.SecurityThreatsChecker && (
        <SecurityThreatsChecker />
      )}
      {currentPage === NavbarItems.GenerateDocumentation && (
        <CodeComplaianceChecker />
      )}
    </div>
  );
}

export default App;
