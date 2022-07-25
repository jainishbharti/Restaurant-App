import { Box } from "@mui/material";

type BackgroundProps = {
  children: React.ReactNode;
};

export const Background = (props: BackgroundProps) => {
  return (
    <Box className="bg">
      <Box>{props.children}</Box>
    </Box>
  );
};
