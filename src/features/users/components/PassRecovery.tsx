import styled from 'styled-components';

import Button from '../../../shared/ui/Button';
import { useUser2 } from '../hooks/useUser';
import Heading from '../../../shared/ui/Heading';
import { FormEvent } from 'react';
import { useResetPassword } from '../../authentication/hooks/useResetPassword';

const Input = styled.input`
  border: none;

  background-color: var(--color-grey-100);
  color: var(--color-grey-400);
  letter-spacing: 1px;
  padding: 1rem 1.5rem;
  width: 100%;
  border-radius: 3px;

  &::placeholder {
    letter-spacing: 3px;
    font-size: 2rem;
    color: var(--color-grey-400);
  }

  &:focus {
    outline: none;
  }
`;

const Form = styled.form`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem 4rem;
`;

const PassRecovery = () => {
  const { user } = useUser2();
  const { isPending, resetPassword } = useResetPassword();

  if (!user) return null;

  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword();
  };

  return (
    <Content>
      <Heading as="h2">Recuperación de Contraseñas</Heading>
      <p>
        Genere una nueva contraseña de recuperación, la contraseña generada se enviará a:
      </p>
      <Form onSubmit={handleResetPassword}>
        <div>
          <label>Correo Electrónico de Recuperación</label>
          <Input type="email" readOnly={true} value={user?.email} />
        </div>
        <Button $variation="secondary" disabled={isPending}>
          GENERAR CONTRASEÑA
        </Button>
      </Form>
    </Content>
  );
};

export default PassRecovery;
