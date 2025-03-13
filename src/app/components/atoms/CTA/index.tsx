"use client";
import React from "react";
import "./CTA.styles.scss";
import { BarLoader } from "react-spinners";

interface CTAProps {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  appearance?: "primary" | "secondary";
  isLoading?: boolean;
  onClick?: () => void;
}

const CTA = ({
  type,
  text,
  appearance = "primary",
  isLoading = false,
  onClick,
}: CTAProps) => (
  <button
    className={`button ${appearance}`}
    type={type}
    onClick={onClick}
    disabled={isLoading}
  >
    {isLoading ? <BarLoader /> : text}
  </button>
);

export default CTA;
