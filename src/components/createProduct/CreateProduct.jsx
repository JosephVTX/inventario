import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiPostProduct } from "../../api/apiProducts";
import { Modal } from "../modal/Modal";

export const CreateProduct = ({ setOpenModal, setRefresh, refresh }) => {
  const { register, getValues: productData } = useForm({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      code: "",
      description: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    toast
      .promise(apiPostProduct(productData()), {
        pending: "Eliminando...",
        success: "Producto Creado. 👌",
        error: "Ups! Al parecer hubo un error. 🤯",
      })
      .then(() => setRefresh(!refresh))
      .then(() => setOpenModal(false));
  };

  return (
    <Modal>
      <div className="w-screen h-screen backdrop-blur-md  fixed top-0">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[20rem] gap-2 bg-white fixed left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] shadow-lg p-3 rounded-md"
        >
          <div className="flex items-center">
            <span className="fa-solid fa-store mr-2 text-indigo-700 text-[0.8rem] bg-indigo-300 p-2 rounded-full"></span>
            <h2 className="mb-2 text-[1.25rem] font-semibold text-gray-500 tracking-wider">
              Crear Producto
            </h2>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="name" className="text-gray-500">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="outline-none border h-[2rem] rounded-[0.25rem] px-2"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="price" className="text-gray-500">
              Precio
            </label>
            <input
              type="number"
              id="price"
              step={0.1}
              className="outline-none border h-[2rem] rounded-[0.25rem] px-2"
              {...register("price")}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="category" className="text-gray-500">
              Categoria
            </label>
            <input
              type="text"
              id="category"
              className="outline-none border h-[2rem] rounded-[0.25rem] px-2"
              {...register("category")}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="category" className="text-gray-500">
              Codigo
            </label>
            <input
              type="text"
              id="category"
              className="outline-none border h-[2rem] rounded-[0.25rem] px-2"
              {...register("code")}
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-gray-500" htmlFor="category">
              Descripción {"(Opcional)"}
            </label>
            <textarea
              type="text"
              id="category"
              className="outline-none border h-[8rem] resize-none px-2"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="bg-indigo-700 py-[0.625rem] rounded-md text-white border-b-indigo-900 border-b-[4px]">
              Crear
            </button>
            <input
              onClick={() => setOpenModal(false)}
              className="bg-gray-500 py-[0.625rem] rounded-md text-white border-b-gray-700 border-b-[4px]"
              type="button"
              value="Cancelar"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
