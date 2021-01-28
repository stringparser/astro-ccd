import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";

const Paragraph: React.FC = ({ children }) => {
  return (
    <Box margin="0 10%">
      <Typography component="p">
        {children}
      </Typography>
    </Box>
  );
};

export default Paragraph;