import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiLogin } from "../../api/apiLogin";

export const Login = () => {
  const navigate = useNavigate();

  const { register, getValues } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();

    toast
      .promise(apiLogin(getValues()), {
        pending: "Cargando...",
        success: "Bienvenido!.",
        error: "Ups! Al parecer hubo un error. 🤯",
      })
      .then(() => navigate("/"))
      
    
  };

  return (
    <div className="w-[20rem] m-[1rem_auto]">
      <h2 className="text-center text-[28px] text-gray-500">INGRESAR</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="user">Usuario</label>
          <input
            id="user"
            type="text"
            className="h-[2.5rem] border rounded-md outline-none px-2"
            {...register("identifier")}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="h-[2.5rem] border rounded-md outline-none w-full px-2"
            {...register("password")}
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 p-3 w-full rounded-md text-gray-100"
        >
          INGRESAR
        </button>
      </form>
    </div>
  );
};
