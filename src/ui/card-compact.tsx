import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { ReactNode } from "react";

type CardCompactProps = {
  title: string;
  description: string;
  content: React.ReactNode;
  className: string;
  footer?: React.ReactNode;
};

function CardCompact({
  title,
  description,
  content,
  className,
  footer,
}: CardCompactProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default CardCompact;
