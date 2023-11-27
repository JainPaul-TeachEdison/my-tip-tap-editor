import React from "react";
import { ReactNode } from "react";

interface ColorPickerProps {
    color: string;
    children: ReactNode;
    onChange: (color: string) => void;
  }
  
  export default function ColorPicker({ color, children, onChange }: Readonly<ColorPickerProps>) {
    const uniqueId = (React as any).useId();
  
    return (
      <div className={`relative`}>
        <label htmlFor={uniqueId} className="m-0">
          {children}
        </label>
        <input
          type="color"
          id={uniqueId}
          className="absolute invisible"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
  