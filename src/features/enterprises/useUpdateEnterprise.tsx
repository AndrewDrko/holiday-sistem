import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEnterprises as updateEnterpriseApi } from '../../services/apiEnterprise';
import toast from 'react-hot-toast';
import { EnterpriseInfo } from './types';

export const useUpdateEnterprise = () => {
  const queryClient = useQueryClient();

  const { mutate: updateEnterprises, isPending: isPending } = useMutation({
    // mutationFn: updateEnterpriseApi,
    mutationFn: ({ id, newData }: { id: string; newData: EnterpriseInfo | FormData }) =>
      updateEnterpriseApi(id, newData),
    onSuccess: () => {
      toast.success('Empresa actualizada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['enterprise'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    updateEnterprises,
    isPending,
  };
};
