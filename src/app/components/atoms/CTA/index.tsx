"use client"
import React from "react";
import './CTA.styles.scss'

interface CTAProps {
  text: string;
  type?: "submit" | "reset" | "button" | undefined
  appearance?: 'primary' | 'secondary'
  onClick?: () => void;
}

const CTA = ({ type, onClick, text, appearance = 'primary'}: CTAProps) => (
  <button className={`button ${appearance}`} type={type} onClick={onClick}>
    {text}
  </button>
);

export default CTA;
