import Axios from 'axios';
import { Streamer } from '../../types/streamers';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

const getAllStreamers = async () => {
  const response = await axios.get<Streamer[]>('/streamers');
  return response.data;
};

const getStreamerByID = async (id: number) => {
  const response = await axios.get<Streamer>(`/streamers/${id}`);
  return response.data;
};

const addStreamer = (newStreamer: Streamer) => {
  return axios.post<Streamer>(`/streamers`, newStreamer);
};

const vote = (voteData: { streamerId: number; vote: number }) => {
  return axios.put<Streamer>(`/streamers/${voteData.streamerId}/vote`, {
    vote: voteData.vote,
  });
};

export const StreamersService = {
  getAllStreamers,
  getStreamerByID,
  addStreamer,
  vote,
};
