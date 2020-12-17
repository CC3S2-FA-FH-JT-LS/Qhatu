import React from "react";
import FormularioComerciante from "./FormularioComerciante";
import ComercianteModels from "./modelData/Comerciante";
export default function EditarCuenta() {
  const initial_category = {
    categoria: "abarrotes"
  };
  const [category, setCategory] = React.useState(initial_category);

  const handleChange = (event) => {
    let cat = event.target.value;
    setCategory({ categoria: cat });
  };
  const comerciante = ComercianteModels.comercianteEjemplo();
  return (
    <div>
      <FormularioComerciante
        componentTitle="Editar Cuenta Comerciante"
        comerciante={comerciante}
        showDelBut="visible"
      ></FormularioComerciante>
    </div>
  );
}
