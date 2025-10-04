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
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import TimeAgo from "javascript-time-ago";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import es from "javascript-time-ago/locale/es";

export default function RegistroDormir() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  TimeAgo.addLocale(es);

  const timeAgo = new TimeAgo("es-CO");

  const { getNap, postCreateNap, DataList, deleteDeleteNap } = useNap();

  const {
    register,
    handleSubmit,
    //watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.end_date === "") {
      data.end_date = null;
    }
    console.log(data);
    console.log(openUpdate);

    if (openUpdate) {
      console.log("update");
    } else {
      console.log("crear");
    }
    /* try {
      await postCreateNap(data);
      await getNap();
    } catch (error) {
      console.log(error);
    } */
  };

  useEffect(() => {
    getNap();
  }, []);

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
              <div key={temp._id} className="group flex gap-x-6">
                <div className="relative">
                  <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-sky-300"></div>
                  <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-sky-100 text-sky-700">
                    <i className="fa-solid fa-bed"></i>
                  </span>
                </div>
                <div className="-translate-y-1.5 pb-4 text-slate-600">
                  <div className="flex justify-between">
                    <p className="font-sans text-base font-bold text-sky-800 antialiased dark:text-white">
                      Registro de Siesta
                    </p>
                    <div>
                      <IconButton
                        size="small"
                        aria-label="Editar"
                        title="Editar"
                        onClick={() => {
                          setOpen(true);
                          setOpenUpdate(temp);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label="delete"
                        onClick={() => {
                          setOpenDelete({ bool: true, data: temp });
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </IconButton>
                    </div>
                  </div>
                  <div className=" w-[250px] md:w-[400px]">
                    <div className="flex  justify-between items-end">
                      <span className="font-semibold text-sky-900">Incio</span>
                      <small className="mt-2 font-sans text-sm text-slate-600 antialiased">
                        {new Date(temp?.start_date).toLocaleDateString()} -{" "}
                        {new Date(temp?.start_date).toLocaleTimeString()}
                      </small>
                      <small>
                        {timeAgo.format(new Date(temp?.start_date).getTime())}
                      </small>
                    </div>
                    <div className="flex  justify-between items-end">
                      <span className="font-semibold text-sky-900">Fin</span>
                      <small className="mt-2 font-sans text-sm text-slate-600 antialiased">
                        {new Date(temp?.createdTime).toLocaleDateString()} -{" "}
                        {new Date(temp?.createdTime).toLocaleTimeString()}
                      </small>
                      <small>{timeAgo.format(temp?.createdTime)}</small>
                    </div>
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

          <form className="mx-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-9">
              <TextField
                id="outlined-basic"
                label="Fecha y Hora de Inicio"
                variant="outlined"
                type="datetime-local"
                focused
                fullWidth
                defaultValue={
                  openUpdate?.start_date?.slice(0, 16)
                }
                {...register("start_date", { required: true })}
              />
            </div>
            <div className="mb-9">
              <TextField
                id="outlined-basic"
                label="Fecha y Hora de Fin"
                variant="outlined"
                type="datetime-local"
                focused
                fullWidth
                {...register("end_date")}
              />
            </div>
            <div className="mb-9">
              <TextField
                id="note"
                label="Nota"
                variant="outlined"
                multiline
                {...register("note")}
                rows={4}
                fullWidth
              />
            </div>
            <div className="flex justify-center gap-3 text-center">
              <Button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setOpenUpdate(false);
                }}
                variant="contained"
                color="error"
              >
                <i class="fa-solid fa-ban  me-2"></i>Cancelar
              </Button>
              <Button type="submit" variant="contained">
                <i className="fa-solid fa-floppy-disk me-2"></i>Guardar
              </Button>
            </div>
          </form>
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
