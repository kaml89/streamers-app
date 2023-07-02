import { useParams, useNavigate } from 'react-router-dom';
import useStreamer from '../../queries/useStreamer';
import useVote from '../../queries/useVote';
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { ThumbDown, ThumbUp } from '@mui/icons-material';

const StreamerDetails: React.FC = () => {
  const { streamerId } = useParams();
  let navigate = useNavigate();

  const voteMutation = useVote();
  const { streamer, isLoading, isError } = useStreamer(Number(streamerId));

  const handleVote = (streamerId: number, vote: number) => {
    voteMutation.mutate({ streamerId, vote });
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    navigate('/');
  }

  if (streamer) {
    return (
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '16px',
          width: '75%',
          margin: '0 auto',
          borderRadius: '16px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component='img'
          alt={streamer.name}
          image={
            'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png'
          }
          sx={{
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '50%',
            margin: '16px',
          }}
        />
        <CardContent sx={{ flex: 1, padding: '16px' }}>
          <Typography
            variant='h5'
            sx={{ fontWeight: 'bold', marginBottom: '8px' }}
          >
            {streamer.name}
          </Typography>
          <Typography variant='body1' sx={{ marginBottom: '16px' }}>
            {streamer.description}
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: '#8e8e8e', marginBottom: '16px' }}
          >
            Platform: {streamer.streamingPlatform}
          </Typography>
          <Grid container spacing={1} alignItems='center'>
            <Grid item>
              <Button
                onClick={() => handleVote(Number(streamerId), 1)}
                size='small'
              >
                <ThumbUp fontSize='small' sx={{ color: '#8e8e8e' }} />
              </Button>
            </Grid>
            <Grid item>
              <Button size='small'>
                <ThumbDown fontSize='small' sx={{ color: '#8e8e8e' }} />
              </Button>
            </Grid>
            <Grid item>
              <Typography variant='body2' sx={{ color: '#8e8e8e' }}>
                Votes: {streamer.votes}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
};

export default StreamerDetails;
