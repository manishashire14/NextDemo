import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {
  Typography,
  Stack,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { useRouter } from 'next/router';
const CustomCard = ({ card, handleCardChange, isEditable=false }) => {
  let { _id } = card;
  const router = useRouter();
  const handleProfileRedirect = () => {
    router.push(`/edit-blog?id=${_id}`)
  }
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea onClick={handleCardChange}>
        {/* <CardMedia
          component="img"
          // image="https://source.unsplash.com/random"
          alt="blog-image"
        /> */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack>
            {card?.tags?.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                variant="filled"
                sx={{ margin: '2px', width: '40%' }}
              />
            ))}
          </Stack>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {card?.title}
          </Typography>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
            dangerouslySetInnerHTML={{ __html: card.description }}
          >
          </Typography>
        </CardContent>
      </CardActionArea>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button variant="text" startIcon={<FavoriteBorderOutlinedIcon />}>
            {card?.voteCount?.length}
          </Button>
          {isEditable ? (
            // <Link >
            <Button onClick={handleProfileRedirect} startIcon={<EditIcon />}/>
            // </Link>
          ) : null}
        </CardActions>
    </Card>
  );
};

export default CustomCard;