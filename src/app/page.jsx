import { Avatar, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-center flex justify-center flex-col items-center">
        <Avatar
          sx={{ width: "100px", height: "100px" }}
          alt="Remy Sharp"
          src="valen.jpg"
        />
        <p>Valentino APP</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Link href={"/registro-temperatura"}>
          <Button
            sx={{
              height: "80px",
              backgroundColor: "oklch(55.3% 0.195 38.402)",
            }}
            variant="contained"
          >
            <i className="fa-solid fa-temperature-low fa-2xl me-2"></i>Registro
            Temperatura
          </Button>
        </Link>
        <Link href={"/registro-popis"}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              height: "80px",
              backgroundColor: "oklch(51.8% 0.253 323.949)",
            }}
          >
            <i className="fa-solid fa-toilet fa-2xl me-2"></i>Registro Popis
          </Button>
        </Link>
        <Button variant="contained">
          <i className="fa-solid fa-carrot"></i>Registro Comidas
        </Button>
        <Link href={"/registro-dormir"}>
          <Button
            fullWidth

            variant="contained"
            sx={{
              height: "80px",
              backgroundColor: "oklch(50% 0.134 242.749)",
            }}
          >
            <i className="fa-solid fa-bed fa-2xl me-2"></i> Registro de Sueño
          </Button>
        </Link>
      </div>
    </div>
  );
}
