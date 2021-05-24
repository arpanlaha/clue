import React, { ReactElement, ReactNode } from "react";

import "../styles/card.css";

interface CardProps {
  children: ReactNode;
}

export default function Card(props: CardProps): ReactElement {
  const { children } = props;
  return <div className="card">{children}</div>;
}
