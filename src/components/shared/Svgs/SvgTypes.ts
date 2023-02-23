import { SvgIconProps } from "@mui/material";

export interface ISvgProps extends SvgIconProps {
  width?: number;
  height?: number;
  size?: number;
  onClick?: () => void;
}
