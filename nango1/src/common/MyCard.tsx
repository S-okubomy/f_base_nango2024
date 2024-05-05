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
import { Link, Navigate } from "react-router-dom";
import ShareButton from "./ShareButton";


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
  shareUrl: string,
  msg: string,
}

export default function MyCard({ title, content, shareUrl, msg }: Props) {
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
          padding: '1px 1px 1px 1px',
          minWidth: 100,
          minHeight: 15,
          // height: 'auto',
          color: 'white',
          border: 3,
          boxShadow: 3,
        }}
        avatar={
          <Avatar sx={{ bgcolor: 'rgb(255,127,0)', height: 30, mr: -2 }} aria-label="nango">
            南郷
          </Avatar>
        }
        title={title}
      />
      <CardContent
        sx={{
          bgcolor: '#FCFCE0',
          // margin: '0px 5px 5px 5px',
          padding: '0px 5px 5px 10px',
        }}
      >
        {content}
      </CardContent>
      <CardActions disableSpacing>
        <ShareButton shareUrl={shareUrl} msg={msg}/>
      </CardActions>
    </Card>
  );
}
