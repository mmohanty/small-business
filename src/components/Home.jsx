// src/components/Home.js
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Header from './Header';

const Home = () => {
  return (

    <div>
       <Header />
       <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > :not(style)': {
        m: 1,
        width: 500,
        height: 270,
      },
    }}>
      <Link to="/mint" style={{ "textDecorationLine": 'none' }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/images/cards/asset-mgmt-scaled.webp"
            title="Asset Manager"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Asset Manager
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Asset Manager manages Fund
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '10px' }}>
              Navigate to Asset Manager Screen
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Link to="/loans" style={{ "textDecorationLine": 'none' }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/images/cards/card-exchange.jpg"
            title="CRF Exchange"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              CRF Exchange
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Creates Loan
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary', marginTop: '10px' }}>
              Navigate to CRF Exchange Screen
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Link to="/am" style={{ "textDecorationLine": 'none' }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/images/cards/asset-mgmt-scaled.webp"
            title="Asset Manager"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Asset Manager
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Asset Manager manages Fund
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '10px' }}>
              Navigate to Asset Manager Screen
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
    </div>
    


  );
};

export default Home;
