import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StreamersService } from '../services/streamers';

const useVote = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (voteData: { streamerId: number; vote: number }) =>
      StreamersService.vote(voteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streamers'] });
    },
  });

  return { mutate, isLoading, isError, error };
};

export default useVote;
