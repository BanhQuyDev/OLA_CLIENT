import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '30px'
    },
}))


let GuideLineSection = (props) => {
    const classes = useStyles()

    return (
        <>
            <div className={`${classes.root}`}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="h6">{props.title ? props.title : `Guideline for creating courses`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {props.content ? props.content :
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sudisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sundisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
                            }
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    )
}


export default GuideLineSection