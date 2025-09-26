import { Button } from "@mui/material";
import Link from "next/link";

export default function RegistroPopis() {
  return (
    <div>
      <p className="text-center py-6 text-fuchsia-700">
        <i className="fa-solid fa-toilet fa-xl"></i>Registro y
        Monitoreo de la Popis
      </p>

      <div className="md:container mx-3 md:mx-auto ">
        <hr className="mb-2 border-fuchsia-400" />
        <div className="flex justify-between">
          <Link href={"/"}>
            <Button variant="contained" sx={{ backgroundColor: "#b61717" }}>
              <i className="fa-solid fa-chevron-left me-2"></i>Atras
            </Button>
          </Link>
          <Button
            variant="contained"
            sx={{ backgroundColor: "oklch(51.8% 0.253 323.949)" }}
          >
            <i className="fa-solid fa-plus me-2"></i>Registrar Popis
          </Button>
        </div>
      
      </div>
    </div>
  );
}
