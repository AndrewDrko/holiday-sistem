import HolidayRow from './HolidayRow';
import { useUsers } from '../../users/hooks/useUsers';
import { UserInfo } from '../../users/types';
import { useStateApp } from '../../../context/stateAppContext';
import Spinner from '../../../shared/ui/Spinner';
import { formatText } from '../../../shared/utils/helpers';
import Table from '../../../shared/ui/Table';
import { getStatusHoliday } from '../../../shared/utils/holidayUtils';
import { useEffect } from 'react';

const HolidayTable = () => {
  const { users, isPending, error } = useUsers();
  const {
    state: { queryHoliday, filterDepartment, filterEnterprise },
    handleFilter,
  } = useStateApp();

  useEffect(() => {
    handleFilter('department', 'all');
    handleFilter('enterprise', 'all');
  }, []);

  if (isPending) return <Spinner />;
  if (error) return <h1>{error.message}</h1>;

  // DATA SEARCH
  const dataSearch = users.filter((user: UserInfo) => {
    return (
      formatText(`${user.name} ${user.paternSurname} ${user.motherSurname}`).includes(
        queryHoliday
      ) || user?.employNumber?.includes(queryHoliday)
    );
  });

  // ORDER PER PENDING HOLIDAYS
  const sortedData = dataSearch.sort((a: UserInfo, b: UserInfo) => {
    const { pendingHolidays: pendingHolidaysA } = getStatusHoliday(a.holidays);
    const { pendingHolidays: pendingHolidaysB } = getStatusHoliday(b.holidays);

    const hasPendingA = pendingHolidaysA.length !== 0;
    const hasPendingB = pendingHolidaysB.length !== 0;

    // if 'a' have pending request and 'b' not, 'a' go first
    if (hasPendingA && !hasPendingB) return -1;
    // if 'b' have pending request and 'a' not, 'b' go first
    if (!hasPendingA && hasPendingB) return 1;
    // if both or anything have pending request, not change the order
    return 0;
  });

  // DATA FILTER
  const dataFilters = sortedData
    .filter((user: UserInfo) => {
      const departmentId =
        typeof user.department === 'object' && user.department
          ? user.department._id || ''
          : '';
      return departmentId.includes(filterDepartment) || filterDepartment === 'all';
    })
    .filter((user: UserInfo) => {
      const enterpriseId =
        typeof user.enterprise === 'object' && user.enterprise
          ? user.enterprise._id || ''
          : '';
      return enterpriseId.includes(filterEnterprise) || filterEnterprise === 'all';
    });

  return (
    <Table columns=".4fr .6fr 1fr 1fr  1.2fr">
      <Table.Header>
        <span></span>
        <span>N° Empleado</span>
        <span>Nombre</span>
        {/* <span>Puesto</span> */}
        <span>Departamento</span>
        <span>Solicitudes</span>
      </Table.Header>
      <Table.Body
        data={dataFilters}
        render={(user: UserInfo) => <HolidayRow user={user} key={user.id} />}
      />
    </Table>
  );
};

export default HolidayTable;
