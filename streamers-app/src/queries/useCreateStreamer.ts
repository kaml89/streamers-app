import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StreamersService } from '../services/streamers';

const useCreateStreamer = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (data: any) => StreamersService.addStreamer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streamers'] });
    },
  });

  return { mutate, isLoading, isError, error };
};

export default useCreateStreamer;
