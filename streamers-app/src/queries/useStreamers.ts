import { useQuery } from '@tanstack/react-query';
import { StreamersService } from '../services/streamers';
import { Streamer } from '../types/streamers';

const useStreamers = () => {
  const {
    data: streamers,
    isLoading,
    isError,
    error,
  } = useQuery<Streamer[]>({
    queryKey: ['streamers'],
    queryFn: StreamersService.getAllStreamers,
  });

  return { streamers, isLoading, isError, error };
};

export default useStreamers;
