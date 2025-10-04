import { useNap } from "@/hooks/useNap";
import { Alert, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function FormNap({ Nap, setOpen, setOpenUpdate }) {
  const { getNap, postCreateNap, patchUpdateNap } = useNap();

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
    if (Nap) {
      try {
        await patchUpdateNap(data, Nap._id);
        await getNap();
        setOpen(false);
        //toast.success("Se Actualizo Correctamente");
        toast((t) => (
          <Alert severity="warning" onClose={() => toast.dismiss(t.id)}>
            Se Actualizo Correctamente
          </Alert>
        ));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await postCreateNap(data);
        await getNap();
        setOpen(false);
        toast.success("Se Creado Correctamente");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <form className="mx-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-9">
          <TextField
            id="outlined-basic"
            label="Fecha y Hora de Inicio"
            variant="outlined"
            type="datetime-local"
            focused
            fullWidth
            defaultValue={Nap?.start_date?.slice(0, 16)}
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
            defaultValue={Nap?.end_date?.slice(0, 16)}
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
            defaultValue={Nap?.note?.slice(0, 16)}
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
            <i className="fa-solid fa-ban  me-2"></i>Cancelar
          </Button>
          <Button type="submit" variant="contained">
            <i className="fa-solid fa-floppy-disk me-2"></i>Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}
