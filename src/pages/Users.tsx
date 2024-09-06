import UserOptions from '../features/users/UserOptions';
import UsersTable from '../features/users/UsersTable';
import Row from '../ui/Row';
import Search from '../ui/Search';
import Heading from './../ui/Heading';

import { useStateApp } from '../context/stateAppContext';
import FilterUser from '../features/users/FiltersUser';
import { formatText } from '../utils/helpers';

const User = () => {
  const { handleSearch } = useStateApp();

  return (
    <>
      <Row>
        <Heading as="h1">Empleados</Heading>

        <Row type="horizontal">
          <Search
            width="60%"
            placeholder="Buscar por: nombre | N° Empleado"
            onSetQuery={(query) => handleSearch('user', formatText(query))}
            popUpFilter={<FilterUser />}
          />
          <UserOptions />
        </Row>
        <UsersTable />
      </Row>
    </>
  );
};

export default User;
