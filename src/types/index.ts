import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export * from "./user.type";
export * from "./post.type";
export * from "./payment.type";
export * from "./comment.type";
