import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import { Link } from "react-router-dom";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = {
  title: string,
  content: any,
}

export default function MyCard({ title, content }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="typo_gy" sx={{ float: 'center', margin: '5px 2px 5px 2px' }}>
      <CardHeader
        sx={{
          // bgcolor: 'rgb(35, 118, 210)',
          bgcolor: 'rgb(10,125,250)',
          borderRadius: 5,
          minWidth: 100,
          height: 30,
          color: 'white',
          border: 3,
          boxShadow: 3,
        }}
        avatar={
          <Avatar sx={{ bgcolor: red[900], height: 30 }} aria-label="nango">
            南郷
          </Avatar>
        }
        title={title}
        // subheader="September 14, 2016"
      />
      <CardContent
        sx={{
          bgcolor: '#FCFCE0',
          // margin: '0px 5px 5px 5px',
          padding: '0px 5px 5px 10px',
        }}
      >
        {content}

        {/* </Typography> */}


      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
