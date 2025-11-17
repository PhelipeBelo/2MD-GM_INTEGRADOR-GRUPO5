"use client";

import React from "react";

// Imports obrigatórios
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Teste() {
  return (
    <div style={{ padding: '50px', background: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: 'black' }}>Página de Teste</h1>
      <p style={{ color: 'black' }}>O calendário deve aparecer abaixo:</p>

      <DatePicker />

    </div>
  );
}