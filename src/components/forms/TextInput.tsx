import { TextField } from "@radix-ui/themes";
import React from "react";

interface TextInputProps extends React.ComponentProps<typeof TextField.Root> {
  label: string;
  error?: string;
}

export default function TextInput({ label, error, ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.id} className="font-medium">{label}</label>
      <TextField.Root {...props} />
      {error && (
        <div className="text-red-600 text-xs italic" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
