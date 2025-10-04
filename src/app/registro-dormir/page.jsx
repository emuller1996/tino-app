"use client";
import { useNap } from "@/hooks/useNap";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import es from "javascript-time-ago/locale/es";
import FormNap from "./components/FormNap";
import ItemsNap from "./components/ItemsNap";

export default function RegistroDormir() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { getNap, DataList, deleteDeleteNap } = useNap();
  useEffect(() => {
    getNap();
  }, [open]);

  return (
    <div>
      <p className="text-center py-6 text-sky-700">
        <i className="fa-solid fa-bed me-3 fa-xl"></i>Registro y Monitoreo de
        Horas de Sueño
      </p>

      <div className="md:container mx-3 md:mx-auto ">
        <hr className="mb-2 border-sky-400" />
        <div className="flex justify-between">
          <Link href={"/"}>
            <Button variant="contained" color="error">
              <i className="fa-solid fa-bed me-2"></i>Atras
            </Button>
          </Link>
          <Button
            variant="contained"
            onClick={() => {
              setOpenUpdate(null);
              handleOpen();
            }}
            sx={{ backgroundColor: "oklch(50% 0.134 242.749)" }}
          >
            <i className="fa-solid fa-plus me-2"></i>Registrar Siesta
          </Button>
        </div>

        <div className="text-center mt-12">
          {!DataList && (
            <CircularProgress sx={{ color: "oklch(50% 0.134 242.749)" }} />
          )}
        </div>
        <div className="flex  w-full md:w-1/2 md:mx-auto flex-col items-start md:items-center mt-5 py-2 h-[81vh] overflow-x-visible overflow-y-auto">
          {DataList &&
            DataList.map((temp) => (
              <ItemsNap
                key={temp._id}
                Nap={temp}
                setOpen={setOpen}
                setOpenDelete={setOpenDelete}
                setOpenUpdate={setOpenUpdate}
              />
            ))}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="w-full md:w-4/5 bg-white py-8"
          style={{
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
          <p className="mb-4 text-center font-semibold text-orange-800">
            Registro de Siesta
          </p>
          <FormNap
            Nap={openUpdate}
            setOpen={setOpen}
            setOpenUpdate={setOpenUpdate}
          />
        </div>
      </Modal>

      <Dialog
        open={openDelete?.bool}
        onClose={() => {
          setOpenDelete(null);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Seguro quiere eliminar el registro de Siesta de Tino?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>Temperatura : {openDelete?.data?.temperature}</span>
            <span className="block">
              Fecha :{" "}
              {new Date(openDelete?.data?.start_date).toLocaleDateString()} -{" "}
              {new Date(openDelete?.data?.start_date).toLocaleTimeString()}
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDelete(null)}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={async () => {
              try {
                console.log(openDelete.data._id);
                await deleteDeleteNap(openDelete.data._id);
                setOpenDelete(null);
                await getTemperatures();
              } catch (error) {
                console.log(error);
              }
            }}
            autoFocus
          >
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
