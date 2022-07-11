import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    rootCard: {
        minWidth: 200,
        maxWidth: 350,
        margin: '0 3%',
        maxHeight: 340,
        marginBottom: 20,
        borderRadius: "10px",
    },
    media: {
        height: 140,
    },

    typoTitle: {
        fontWeight: 400,
    },

    textStyle: {
        fontFamily: "Open Sans",
        letterSpacing: "3px",
        fontSize: "11px",
        fontWeight: 700,
        color: "gray",
    },
    desc: {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical"
    }
});

export default function VeritcalNews(props) {
    const classes = useStyles();
    let history = useHistory()
    return (
        <Card className={classes.rootCard}>
            <CardActionArea 
            >
                <CardMedia 
                    className={classes.media}
                    // TODO: FIX THE BELOW IMAGE
                    image={props.data?.image ? props.data.image : "https://images.pexels.com/photos/991012/pexels-photo-991012.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typoTitle}>
                        {props.data?.name}
                    </Typography>
                    <Typography className={classes.desc} variant="body2" color="textSecondary" component="p" >
                        {props.data?.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={()=>{history.push(`/courseDetail/${props.data?.id_course}`)}} size="small" color="primary" className={classes.textStyle}>
                    CHECK IT OUT
                </Button>
            </CardActions>
        </Card>
    );
}
