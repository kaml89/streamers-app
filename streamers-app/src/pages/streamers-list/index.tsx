import React from 'react';
import StreamerList from '../../components/streamers-list';
import StreamerForm from '../../components/streamer-form';
import useStreamers from '../../queries/useStreamers';
import useCreateStreamer from '../../queries/useCreateStreamer';
import useVote from '../../queries/useVote';

import { Grid, Typography } from '@mui/material';

const StreamerListPage: React.FC = () => {
  const { streamers, isLoading, isError } = useStreamers();
  const createStreamer = useCreateStreamer();
  const voteMutation = useVote();

  const handleFormSubmit = (data: any) => {
    createStreamer.mutate(data);
  };

  const handleVote = (streamerId: number, vote: number) => {
    voteMutation.mutate({ streamerId, vote });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred</div>;
  }

  return (
    <>
      <Typography variant='h4' align='center' gutterBottom padding={4}>
        Streamer App
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <StreamerForm
            onSubmit={handleFormSubmit}
            isLoading={createStreamer.isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>List of Streamers:</Typography>
          <StreamerList streamers={streamers || []} onVote={handleVote} />
        </Grid>
      </Grid>
    </>
  );
};

export default StreamerListPage;
