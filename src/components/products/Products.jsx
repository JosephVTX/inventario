import React from "react";
import { toast } from "react-toastify";
import { useDebounce } from "usehooks-ts";
import { apiDeleteProduct } from "../../api/apiProducts";
import envData from "../../env/envData";
import { useApi } from "../../hooks/useApi";
import { CreateProduct } from "../createProduct/CreateProduct";
import { EditProduct } from "../editProduct/EditProduct";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/themes/material.css';
const { URL_BASE } = envData;

export const Products = () => {
  const [refresh, setRefresh] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [currentDataEdit, setCurrentDataEdit] = React.useState({});
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedValue = useDebounce(searchValue, 350);

  const { data } = useApi(
    `${URL_BASE}/api/products?sort=createdAt:desc&filters[name][$startsWith]=${debouncedValue}`,
      refresh, debouncedValue
  );

  const handleDelete = (e) => {
    toast
      .promise(apiDeleteProduct(e.target.id), {
        pending: "Eliminando...",
        success: "Producto Eliminado. 👌",
        error: "Ups! Al parecer hubo un error. 🤯",
      })
      .then(() => setRefresh(!refresh));
  };

  const handleSearch = (e) => {

    setSearchValue(e.target.value);
    
  };



  const handleEdit = (e) => {
    setOpenEdit(!openEdit);
    const itemId = e.target.getAttribute("itemId");
    const index = e.target.getAttribute("index");
    const productData = { ...data[index].attributes };
    setCurrentDataEdit({ ...currentDataEdit, ...productData, id: itemId });
  };

  return (
    <>
      <div className="lg:m-[0.8rem_4rem]">
        <h1 className="text-center m-2 text-[1.875rem] font-semibold text-gray-600">
          TODOS LOS PRODUCTOS
        </h1>
        <div className="flex justify-between items-center mb-[0.625rem]">
          <div>
            <span
              onClick={() => setOpenModal(true)}
              className="fa fa-square-plus text-[1.875rem]"
            ></span>
          </div>
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Buscar..."
            className="outline-none border h-[2.5rem] rounded-md px-2 w-[12.5rem]"
          />
        </div>
        <div className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-400 h-[25rem] overflow-y-scroll">

          <table className="table table-bordered">
            <thead>
              <tr className="table-dark">
                <th>Producto</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>Codigo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr key={product.id}>

                  <td><Tippy maxWidth="100%" touch={true} placement="bottom" theme="material" content={product.attributes.description}><span>{product.attributes.name}</span></Tippy></td>

                  <td>{`S/. ${product.attributes.price.toFixed(2)}`}</td>

                  <td>{product.attributes.category}</td>

                  <td>{product.attributes.code}</td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={handleEdit}
                        index={index}
                        itemID={product.id}
                        className="bg-indigo-600 text-white p-2 rounded-md"
                      >
                        Editar
                      </button>
                      <button
                        onClick={handleDelete}
                        id={product.id}
                        className="bg-[#dc3545] text-white p-2 rounded-md"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openModal && (
        <CreateProduct
          setOpenModal={setOpenModal}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
      {openEdit && (
        <EditProduct
          data={currentDataEdit}
          setOpenEdit={setOpenEdit}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
       
    </>
  );
};
