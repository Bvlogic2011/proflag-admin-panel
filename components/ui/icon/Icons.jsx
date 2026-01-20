import React from "react";

export default function Icon({ icon: Icon, className, size }) {
  return (
    <span className={className}>
      <Icon size={size} />
    </span>
  );
}
