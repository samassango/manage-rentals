'use client'
import React from 'react';

export default function Button({onFormSubmit, children}:{onFormSubmit: (e: any) => void, children: any}) {
  return (
    <button onClick={onFormSubmit}>{children}</button>
  );
}
