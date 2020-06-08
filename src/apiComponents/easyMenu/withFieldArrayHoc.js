import React from 'react';
import { useFieldArray } from "react-hook-form";
  

export const withFieldArrayHoc = (Component) => {
  return (props) => {
    const { handleSubmit, register, reset, control } = props;

    const { fields, append, remove } = useFieldArray({
      control,
      name: "items"
    });

    return (
        <Component handleSubmit={handleSubmit} register={register} reset={reset} control={control} fields={fields} append={append} remove={remove} {...props} />
    )    
  };
};