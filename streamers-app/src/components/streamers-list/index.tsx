import { Streamer } from '../../types/streamers';
import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

type StreamerListProps = {
  streamers: Streamer[];
  onVote: (streamerId: number, vote: number) => void;
};

const StreamerList: React.FC<StreamerListProps> = ({ streamers, onVote }) => {
  const handleVote = (streamerId: number, vote: number) => {
    onVote(streamerId, vote);
  };

  return (
    <List>
      {streamers.map((streamer) => (
        <ListItem key={streamer.id}>
          <Grid container alignItems='center' spacing={2}>
            <Grid item>
              <Button onClick={() => handleVote(streamer.id, 1)} size='small'>
                <ThumbUp fontSize='small' />
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => handleVote(streamer.id, -1)} size='small'>
                <ThumbDown fontSize='small' />
              </Button>
            </Grid>
            <Grid item>
              <Link to={`/streamer/${streamer.id}`}>
                <ListItemText
                  primary={streamer.name}
                  secondary={streamer.description}
                />
              </Link>

              <Typography variant='body2'>
                Platform: {streamer.streamingPlatform}
              </Typography>
              <Typography variant='body2'>Votes: {streamer.votes}</Typography>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};

export default StreamerList;
