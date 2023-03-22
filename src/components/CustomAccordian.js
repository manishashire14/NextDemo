import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function CustomAccordian({chipData, title, handleChipFilter,clearFilter}) {
  const [chipDisplay, setChipDisplay] = useState({key:0, variant: "outlined", isActive: false});

  const handleChipDisplay = (chip, index) => {
    if (index || index === 0) {
      setChipDisplay({
        key: index,
        variant:'filled',
        isActive: true
      });
    }
    // if (chipDisplay.isActive === true) {
    //   localStorage.removeItem('blogFilter')
    //   setChipDisplay({
    //     key: index,
    //     color: "outlined",  
    //     isActive: false
    //   });
    // }
  };

  const handleDelete = (index, title) => {
    if (index === chipDisplay.key && chipDisplay.isActive  && chipDisplay.variant === 'filled' ) {

      setChipDisplay({
        key: index,
        variant:'outlined',
        isActive: false
      });
      handleChipFilter('', title);
    }
  };

  return (
    // <Accordion defaultExpanded sx={{ mt: "5px", width: "90%" }}>
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="Categories"
    //     id="Categories"
    //   >
    //     <Typography>{title}</Typography>
    //   </AccordionSummary>
    <div className="mx-3">
      <AccordionDetails>
        <Stack
          spacing={1}
          direction="row"
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          {chipData?.map((chip, index) => (
            <Chip
              key={index}
              label={chip}
              color="success"
              variant={chipDisplay.key === index && clearFilter !=="clearFilter" ? chipDisplay.variant : "outlined"}
              onClick={() => {
                handleChipDisplay(chip, index);
                handleChipFilter(chip, title);
              }}
              sx={{ margin: "5px" }}
              // onDelete={()=> {handleDelete(index, title);}}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </div>
  );
}
