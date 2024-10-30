import styled from 'styled-components';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { Link, Outlet } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi2';
import { media } from '../style/media';
// import UserCard from '../features/users/UserCard';
import { useUser2 } from '../features/users/useUser';

const GoBack = styled(Link)`
  border: none;
  background-color: transparent;

  & svg {
    color: var(--color-grey-900);
    width: 6rem;
    height: 3rem;
  }
`;

const UserMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: 2rem;

  @media (${media.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const UserSubMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-200);

  /* overflow-y: scroll; */
  border-radius: 9px;
  /* height: 55rem; */
`;

// const Filters = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

const UserManagement = () => {
  const { user } = useUser2();
  if (!user) return null;

  return (
    <Row>
      <Row type="horizontal">
        <GoBack to="/">
          <HiArrowLeft />
        </GoBack>
        <Heading as="h1">Gestión de Personal</Heading>
      </Row>
      <UserMain>
        <div>
          <button>Formulario</button>
          <button>Actas Administrativas</button>
          <button>Contratos</button>
          <button>Consulta de Documentos</button>
        </div>
        <UserSubMain>
          <Outlet />
        </UserSubMain>
      </UserMain>
    </Row>
  );
};

export default UserManagement;