import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <p>Valentino APP</p>
      <div className="grid grid-cols-2 gap-3">
        <Link href={"/registro-temperatura"}>
          <Button
            sx={{
              height: "80px",
              backgroundColor: "oklch(55.3% 0.195 38.402)",
            }}
            variant="contained"
          >
            <i className="fa-solid fa-temperature-low fa-2xl"></i>Registro
            Temperatura
          </Button>
        </Link>
        <Link href={"/registro-popis"}>
          <Button
            variant="contained"
            sx={{
              height: "80px",
              backgroundColor: "oklch(51.8% 0.253 323.949)",
            }}
          >
            <i class="fa-solid fa-toilet fa-2xl"></i>Registro Popis
          </Button>
        </Link>
        <Button variant="contained">Contained</Button>
        <Button variant="contained">Contained</Button>
      </div>
    </div>
  );
}
