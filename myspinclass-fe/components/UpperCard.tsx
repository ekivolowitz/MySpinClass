import React from "react";

const UpperCard = ({ title, label }) => {
  return (
    <>
      <p style={{ textAlign: "center" }}>{title}</p>
      <h1>{label}</h1>
    </>
  )
}

export { UpperCard };