import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

interface CustomRatingProps {
  rating: string;
}

export default function CustomRating({ rating }: CustomRatingProps) {
  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Rating name="read-only" value={+rating} readOnly />
    </Box>
  );
}
