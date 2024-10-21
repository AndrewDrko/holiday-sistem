import styled from 'styled-components';

import { HiCalendarDays, HiArrowLeft } from 'react-icons/hi2';

import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';

import Stat from '../../ui/Start';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Filter from '../../ui/Filter';

import { useUser } from '../users/useUser';
import UserCard from '../users/UserCard';
import { Link, useSearchParams } from 'react-router-dom';
import CreateHoliday from './CreateHoliday';
import { useState } from 'react';
import AuthorizationCard from './AuthorizationCard';
import { HolidayInfo } from './type';
import ContentEmpty from '../../ui/ContentEmpty';
import { media } from '../../style/media';
import { getStatusHoliday } from '../../utils/holidayUtils';
import PeriodComponent from './PeriodComponent';

const HolidayInfoStyles = styled.div`
  display: grid;
  grid-template-columns: 50rem 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 2rem;

  @media (${media.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const HolidayOptions = styled.header`
  display: flex;
  justify-content: space-between;
`;

//MAIN
const HolidayMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-200);

  overflow-y: scroll;
  border-radius: 9px;
  height: 55rem;
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BtnIcon = styled.button<{ $isReturned: boolean }>`
  padding: 1.2rem;
  font-weight: 600;
  font-size: 1.6rem;
  gap: 1rem;

  display: flex;
  align-items: center;
  align-self: center;

  color: #fff;
  background: ${(props) =>
    props.$isReturned
      ? 'linear-gradient(to bottom, #a61e4d, #bc2950, #d13652, #e64353, #fa5252);'
      : 'linear-gradient(to right top, #862e9c, #8031a6, #7834b0, #6d38ba, #5f3dc4);'};

  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-grey-200);

  transition: all 0.5s;
  background-size: auto 210%;
  background-position: 0 100%;

  &:hover {
    background-position: 50% 0%;
    filter: saturate(130%);
  }

  & svg {
    width: 2.3rem;
    height: 2.3rem;
  }
`;

const GoBack = styled(Link)`
  border: none;
  background-color: transparent;

  & svg {
    color: var(--color-grey-900);
    width: 6rem;
    height: 3rem;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const HolidayManagement = () => {
  const [searchParams] = useSearchParams();
  const history = searchParams.get('history');
  const [isClicked, setClicked] = useState(false);

  const { user } = useUser();

  if (!user) return null;
  const { holidays } = user;
  if (!holidays) return null;

  let holidaysFilter: HolidayInfo[] = [];

  const { pendingHolidays, approvedHolidays, rejectedHolidays } =
    getStatusHoliday(holidays);

  //FILTERS
  switch (history) {
    case 'request':
      holidaysFilter = pendingHolidays;
      break;
    case 'successfull':
      holidaysFilter = approvedHolidays;
      break;
    case 'rejected':
      holidaysFilter = rejectedHolidays;
      break;
    case 'all':
      holidaysFilter = holidays;
      break;
  }

  return (
    <Row>
      <Row type="horizontal">
        <GoBack to="/">
          <HiArrowLeft />
        </GoBack>
        <Heading as="h1">Administración de Vacaciones</Heading>
      </Row>
      <HolidayInfoStyles>
        <UserCard user={user}>
          <Stats>
            <Stat
              tag="Actual"
              color="red"
              icon={<HiCalendarDays />}
              title="Días Restantes"
              value={`${user.credit?.balance ? user.credit?.balance : 0} de ${
                user.daysGrantedBySeniority ? user.daysGrantedBySeniority : 0
              }`}
            />

            <Stat
              color="brand"
              icon={<HiCalendarDays />}
              title="Vacaciones del periodo"
              value="2024"
            />

            <Stat
              color="green"
              icon={<HiCalendarDays />}
              title="Vacaciones del periodo"
              value={`2023 - ${user.creditPast?.balance ? user.creditPast?.balance : 0}/${
                user.daysGrantedBySeniorityPast ? user.daysGrantedBySeniorityPast : 0
              }`}
            />

            <Stat
              color="blue"
              icon={<HiCalendarDays />}
              title="Vacaciones del periodo"
              value={`2025 - ${user.creditFuture?.balance}/${user.daysGrantedBySeniorityFuture}`}
            />
          </Stats>
        </UserCard>

        <HolidayOptions>
          <Stat
            color="green"
            icon={<HiOutlineClipboardDocumentList />}
            title="Solicitudes pendientes"
            value={`${pendingHolidays.length} solicitudes`}
          />

          <PeriodComponent initialPeriod={2024} />
        </HolidayOptions>

        <Filters>
          <BtnIcon
            onClick={() => setClicked(!isClicked)}
            title="Crear vacaciones"
            $isReturned={isClicked}
          >
            {isClicked ? <HiArrowLeft /> : <HiOutlineDocumentCheck />}{' '}
            {isClicked ? 'Regresar' : 'Solicitar'}
          </BtnIcon>

          {isClicked ? null : (
            <Filter
              searchField="history"
              options={[
                { label: 'Solicitudes', value: 'request' },
                { label: 'Aceptadas', value: 'successfull' },
                { label: 'Rechazadas', value: 'rejected' },
                { label: 'Todas', value: 'all' },
              ]}
            />
          )}
        </Filters>

        <HolidayMain>
          {isClicked ? (
            <CreateHoliday onClose={setClicked} />
          ) : (
            <>
              {holidaysFilter.length === 0 && <ContentEmpty />}
              {holidaysFilter.map((holiday: HolidayInfo) => {
                return <AuthorizationCard holiday={holiday} key={holiday._id} />;
              })}
            </>
          )}
        </HolidayMain>
      </HolidayInfoStyles>
    </Row>
  );
};

export default HolidayManagement;
