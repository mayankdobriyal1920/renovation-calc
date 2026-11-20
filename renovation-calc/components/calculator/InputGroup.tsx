import React from "react";

interface InputGroupProps {
  label: string;
  unit?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  id?: string;
}

export default function InputGroup({ label, unit, error, hint, children, id }: InputGroupProps) {
  const fieldId = id ?? React.useId();
  const child = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<{ id?: string }>, { id: fieldId })
    : children;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={fieldId} className="text-sm font-medium text-white/90">
          {label}
        </label>
        {unit && <span className="text-xs text-white/50">{unit}</span>}
      </div>
      {child}
      {hint && !error && <p className="text-xs text-white/50">{hint}</p>}
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}

export function GlassInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`glass-input w-full rounded-xl px-3 py-2.5 text-sm ${props.className ?? ""}`}
    />
  );
}

export function GlassSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`glass-input w-full rounded-xl px-3 py-2.5 text-sm ${props.className ?? ""}`}
    />
  );
}
