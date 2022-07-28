import { Box } from "@mui/material";

type BackgroundProps = {
  children: React.ReactNode;
};

export const Background = (props: BackgroundProps) => {
  return (
    <Box data-testid="bg" className="bg">
      <Box>{props.children}</Box>
    </Box>
  );
};
