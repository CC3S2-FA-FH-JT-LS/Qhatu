import React from "react";
import FormularioComerciante from "../sitioComerciante/FormularioComerciante";
export default function SignUpComerciante() {
  const initial_category = {
    categoria: "abarrotes"
  };
  const [category, setCategory] = React.useState(initial_category);

  const handleChange = (event) => {
    let cat = event.target.value;
    setCategory({ categoria: cat });
  };
  return (
    <div>
      <FormularioComerciante componentTitle="Registro Comerciante"></FormularioComerciante>
    </div>
  );
}
