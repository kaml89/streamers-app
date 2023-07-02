import React from 'react';
import { useForm } from 'react-hook-form';
import { StreamerInput } from '../../types/streamers';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

type StreamerFormProps = {
  onSubmit: (data: StreamerInput) => void;
};

const StreamerForm: React.FC<StreamerFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StreamerInput>();

  const handleFormSubmit = (data: StreamerInput) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register('name', { required: true })}
            label='Name'
            fullWidth
            error={!!errors.name}
            helperText={errors.name ? 'Name is required' : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('description', { required: true })}
            label='Description'
            fullWidth
            error={!!errors.description}
            helperText={errors.description ? 'Description is required' : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='streamingPlatform-label'>
              Streaming Platform
            </InputLabel>
            <Select
              {...register('streamingPlatform', { required: true })}
              labelId='streamingPlatform-label'
              error={!!errors.streamingPlatform}
            >
              <MenuItem value='YouTube'>YouTube</MenuItem>
              <MenuItem value='TikTok'>TikTok</MenuItem>
              <MenuItem value='Twitch'>Twitch</MenuItem>
              <MenuItem value='TikTok'>Kick</MenuItem>
              <MenuItem value='Twitch'>Rumble</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StreamerForm;
