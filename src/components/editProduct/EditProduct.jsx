import React from "react";
import { Modal } from "../modal/Modal";
import { useForm } from "react-hook-form";
import { apiPutProduct } from "../../api/apiProducts";
import { toast } from "react-toastify";

export const EditProduct = ({ data, setRefresh, setOpenEdit, refresh }) => {
  const { register, getValues: productData } = useForm({
    defaultValues: data,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setOpenEdit(false);

   

    toast
      .promise(apiPutProduct(data.id, productData()), {
        pending: "Editando...",
        success: "Producto Editado. 👌",
        error: "Ups! Al parecer hubo un error. 🤯",
      }).then(() => setRefresh(!refresh)).then(() => setOpenEdit(false));
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
              Editar Producto
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
              {...register("price",{ valueAsNumber: true}) }
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
            <label htmlFor="code" className="text-gray-500">
              Codigo
            </label>
            <input
              type="text"
              id="code"
              className="outline-none border h-[2rem] rounded-[0.25rem] px-2"
              {...register("code")}
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-gray-500" htmlFor="description">
              Descripción {"(Opcional)"}
            </label>
            <textarea
              type="text"
              id="description"
              className="outline-none border h-[8rem] resize-none px-2"
              {...register("description")}
              maxLength={64}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="bg-indigo-700 py-[0.625rem] rounded-md text-white border-b-indigo-900 border-b-[4px]">
              Editar
            </button>
            <input
              className="bg-gray-500 py-[0.625rem] rounded-md text-white border-b-gray-700 border-b-[4px]"
              type="button"
              value="Cancelar"
              onClick={() => setOpenEdit(false)}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
