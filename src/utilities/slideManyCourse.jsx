import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Row, Col } from 'reactstrap';
import Tooltip from '@mui/material/Tooltip';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  videoClass: {
    width: '100%'
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

}));

export default function SlideManyCourse(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      {
        props.units ? (
          <>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {
                  props.units.map((d, i) => (
                    <Tab
                      label={
                        <Tooltip title={d.name.toString()}>
                          <span className={classes.truncate}>{d.name.toString()}</span>
                        </Tooltip>
                      }
                      sx={{
                        marginRight: '10px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '&.Mui-selected': {
                          outline: 'none',
                        }
                      }}
                      {...a11yProps(i)} key={`Tab-${d.name}-with-index-${i}`} />
                  ))
                }
              </Tabs>
            </AppBar>
            {
              props.units.map((d, i) => (
                <TabPanel value={value} index={i} key={d.name + i}>
                  <Row>
                    <p><strong>Unit's Description:</strong>&emsp;{d.description}</p>
                  </Row>
                  <br></br>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                      <video src={d.video_url} className={classes.videoClass} controls>
                        <source src={d.video_url} />
                        Your browser does not support HTML video.
                      </video>
                    </Col>
                  </Row>
                </TabPanel>
              ))
            }
          </>
        ) : null
      }

    </div>
  );
}
