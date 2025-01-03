import { ref } from 'vue';
import axios from 'axios';
import { PexelImage, PexelsParams } from '../interface/Pexels';

export function usePexels() {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const cache = new Map<string, PexelImage[]>();

  const fetchImagesPexels = async (
    params: PexelsParams
  ): Promise<PexelImage[]> => {
    const API_URL = 'https://api.pexels.com/v1';
    const API_KEY = process.env.VITE_API_PEXELS;

    if (!params.query) return [];

    const cacheKey = JSON.stringify(params);
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as PexelImage[];
    }

    try {
      loading.value = true;
      const response = await axios.get(`${API_URL}/search`, {
        headers: { Authorization: API_KEY },
        params,
      });

      const photos: PexelImage[] =
        response.data.photos?.map((photo: any) => ({
          id: photo.id,
          width: photo.width,
          height: photo.height,
          url: photo.url,
          photographer: photo.photographer,
          photographer_url: photo.photographer_url,
          photographer_id: photo.photographer_id,
          avg_color: photo.avg_color || '#FFFFFF',
          src: {
            original: photo.src.original,
            large2x: photo.src.large2x,
            large: photo.src.large,
            medium: photo.src.medium,
            small: photo.src.small,
            portrait: photo.src.portrait,
            landscape: photo.src.landscape,
            tiny: photo.src.tiny,
          },
          liked: photo.liked || false,
          alt: photo.alt || '',
        })) || [];

      cache.set(cacheKey, photos);

      return photos;
    } catch (err: any) {
      console.error('Error al obtener imágenes de Pexels:', err);
      error.value = err.message || 'Error desconocido';
      return [];
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    fetchImagesPexels,
  };
}
