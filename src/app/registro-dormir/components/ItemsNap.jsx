import { IconButton } from "@mui/material";
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";

export default function ItemsNap({
  Nap,
  setOpen,
  setOpenUpdate,
  setOpenDelete,
}) {
  TimeAgo.addLocale(es);

  const timeAgo = new TimeAgo("es-CO");
  return (
    <div key={Nap._id} className="group flex gap-x-6">
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
                setOpenUpdate(Nap);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </IconButton>
            <IconButton
              size="small"
              aria-label="delete"
              onClick={() => {
                setOpenDelete({ bool: true, data: Nap });
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
              {new Date(Nap?.start_date).toLocaleDateString()} -{" "}
              {new Date(Nap?.start_date).toLocaleTimeString()}
            </small>
            <small>{timeAgo.format(new Date(Nap?.start_date).getTime())}</small>
          </div>
          <div className="flex  justify-between items-end">
            <span className="font-semibold text-sky-900">Fin</span>
            <small className="mt-2 font-sans text-sm text-slate-600 antialiased">
              {Nap?.end_date
                ? new Date(Nap?.end_date).toLocaleDateString()
                : ""}{" "}
              -{" "}
              {Nap?.end_date
                ? new Date(Nap?.end_date).toLocaleTimeString()
                : ""}
            </small>
            <small>
              {Nap?.end_date
                ? timeAgo.format(new Date(Nap?.end_date).getTime())
                : ""}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
