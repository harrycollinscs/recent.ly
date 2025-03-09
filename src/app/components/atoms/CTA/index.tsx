import React from "react";
import './CTA.styles.scss'

interface CTAProps {
  text: string;
  type?: "submit" | "reset" | "button" | undefined
  onClick?: () => void;
}

const CTA = ({ type, onClick, text }: CTAProps) => (
  <button type={type} onClick={onClick}>
    {text}
  </button>
);

export default CTA;
