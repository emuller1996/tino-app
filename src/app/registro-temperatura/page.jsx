"use client";
import { useTemperature } from "@/hooks/useTemperature";
import { Box, Button, Modal, TextField } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function RegistroTemperatura() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { postCreateTemperature, getTemperatures, DataList } = useTemperature();

  useEffect(() => {
    getTemperatures();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      data.temperature = parseFloat(data?.temperature);
      console.log(data);
      const result = await postCreateTemperature(data);
      await getTemperatures();
      console.log(result);
    } catch (error) {}
  };
  return (
    <div>
      <p className="text-center py-6 text-orange-700">
        <i className="fa-solid fa-temperature-low fa-xl"></i>Registro y
        Monitoreo de Temperatura
      </p>

      <div className="md:container mx-3 md:mx-auto ">
        <hr className="mb-2 border-orange-400" />
        <div className="flex justify-between">
          <Link href={"/"}>
            <Button variant="contained" sx={{ backgroundColor: "#b61717" }}>
              <i className="fa-solid fa-chevron-left me-2"></i>Atras
            </Button>
          </Link>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ backgroundColor: "oklch(55.3% 0.195 38.402)" }}
          >
            <i className="fa-solid fa-plus me-2"></i>Registrar Temperatura
          </Button>
        </div>

        <div className="flex  w-full md:w-1/2 md:mx-auto flex-col items-start md:items-center mt-5">
          {DataList &&
            DataList.map((temp) => (
              <div key={temp._id} className="group flex gap-x-6">
                <div className="relative">
                  <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-slate-200"></div>
                  <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-slate-200 text-slate-800">
                    <i className="fa-solid fa-temperature-low"></i>
                  </span>
                </div>
                <div className="-translate-y-1.5 pb-4 text-slate-600">
                  <p className="font-sans text-base font-bold text-slate-800 antialiased dark:text-white">
                    {temp?.temperature}
                  </p>
                  <div className="flex  justify-between w-[200px] items-end">
                    <small className="mt-2 font-sans text-sm text-slate-600 antialiased">
                      {new Date(temp?.createdTime).toLocaleDateString()} -{" "}
                      {new Date(temp?.createdTime).toLocaleTimeString()}
                    </small>
                    <small>test</small>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "80vw",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "1px solid #7a7a7a",
            boxShadow: 24,
            borderRadius: "0.5em",
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="mb-4 text-center font-semibold text-orange-800">
              Registrando Nueva Temperatura
            </p>
            <div className="mb-4">
              <TextField
                id="outlined-basic"
                label="Temperatura"
                variant="outlined"
                type="number"
                slotProps={{
                  htmlInput: {
                    min: 0, // Opcional: valor mínimo
                    max: 100, // Opcional: valor máximo
                    step: 0.1,
                  },
                }}
                fullWidth
                {...register("temperature", { required: true })}
              />
            </div>
            <div className="text-center">
              <Button type="submit" variant="contained">
                <i className="fa-solid fa-floppy-disk me-2    "></i>Guardar
              </Button>
            </div>
            {/* <input type="number" step={0.1}/> */}
          </form>
        </Box>
      </Modal>
    </div>
  );
}
