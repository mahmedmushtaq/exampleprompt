import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import useToLoadLanguages from "../../../hooks/useToLoadLanguages";

interface IProps extends SelectProps {}

const SelectLanguage = (props: IProps) => {
  const { allLanguages } = useToLoadLanguages();
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Language</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Language"
        {...props}
      >
        {allLanguages.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLanguage;
