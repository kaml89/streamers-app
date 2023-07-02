import { useQuery } from '@tanstack/react-query';
import { StreamersService } from '../services/streamers';
import { Streamer } from '../types/streamers';

const useStreamer = (id: number) => {
  const {
    data: streamer,
    isLoading,
    isError,
    error,
  } = useQuery<Streamer>({
    queryKey: ['streamer'],
    queryFn: () => StreamersService.getStreamerByID(Number(id)),
  });

  return { streamer, isLoading, isError, error };
};

export default useStreamer;
