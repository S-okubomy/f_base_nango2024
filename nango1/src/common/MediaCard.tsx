import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ 
      maxWidth: 700,
      bgcolor: 'white',
      boxShadow: 10,
      borderRadius: 2,
      p: 2,
      minWidth: 300,  
    }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
              <li>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜気楽、和気あいあいを大切に＞</span><br/>
                  当店は初めての方でも、気楽に楽しいひと時をモットー<br/>
                  にしております。また、楽器演奏有無、年齢問わず<br/>
                  老若男女、和気あいあいとした雰囲気です。<br/>
                  是非、お気軽にお越しください。<br/>
                  { /* TODO 一旦無効化しているので戻す  AI南郷君のお家!!!!!!!! */ }
                  {/* <AnimeNangoAi /> */}
              </li>
              <li>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜リーズナブルな価格＞</span><br/>
                  当店はリーズナブルな価格で楽しいひと時のご提供を<br/>
                  心がけております。<br/>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "red" }} > チャージ料金 1500円</span>、ビール等の<br/>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "red" }} >アルコール類を500円より</span><br/>
                  提供しております。演奏代無料で楽器演奏できます。<br/>
              </li>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}