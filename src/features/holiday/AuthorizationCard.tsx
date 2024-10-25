import StateHoliday from './StateHoliday';
import styled from 'styled-components';
import {
  HiOutlineCalendarDays,
  HiOutlineCheck,
  HiOutlineChevronDown,
} from 'react-icons/hi2';
import { HiOutlineXMark } from 'react-icons/hi2';
import { HolidayInfo } from './type';
import { formatDate, joinName } from '../../utils/helpers';
import { useUpdateHoliday } from './useUpdateHoliday';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../users/useUser';
import html2pdf from 'html2pdf.js';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import { FaFilePdf } from 'react-icons/fa6';
import Print from '../../pages/Print';
import ReactDOMServer from 'react-dom/server';
import { useState } from 'react'; // Importa useState
import { useMe } from '../authentication/useMe';
import { UserInfo } from '../users/types';

const AuthorizationCardStyled = styled.div`
  background-color: var(--color-grey-0);
  padding: 3rem;
  grid-column: 1 /3;
  border-radius: 9px;
  box-shadow: var(--shadow-sm);
`;

const OptionsAuthorization = styled.div`
  display: flex;
  justify-content: start;
  padding: 2rem 0rem 0;
  border-top: 2px solid var(--color-grey-100);
`;

const Form = styled.form``;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const AuthorizationItem = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  justify-items: center;
  gap: 5rem;
`;

const EmployedItem = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  gap: 5rem;
`;

const Title = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
`;

const Authorization = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const RowMain = styled.div`
  display: flex;
  gap: 1.8rem;
`;

const SubTitle = styled.span`
  color: var(--color-brand-900);
  font-weight: bold;
`;

const ObservationField = styled.textarea`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  box-shadow: var(--shadow-sm);
  border-radius: 5px;
  padding: 1rem;
  resize: none;
  width: 100%;
`;

const AuthorizationButtons = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  margin-bottom: 1.8rem;
  gap: 4rem;
`;

interface PropsButton {
  $color?: string;
}

const Button = styled.button<PropsButton>`
  background-color: ${(props) => props.$color};
  border: none;
  text-transform: uppercase;
  font-weight: 700;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius-sm);
  color: #fff;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  gap: 1rem;

  & svg {
    height: 2rem;
    width: 2rem;
  }
`;

const ButtonPDF = styled.button`
  background-color: #c92a2a;
  color: #fff;
  padding: 1rem 1.2rem;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 11px;
  border: none;
  box-shadow: var(--shadow-md);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 2rem;

  & svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

// Nuevo estilo para el botón de mostrar fechas
const ShowDatesButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background-color: var(--color-brand-500);
  color: #fff;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: #4338ca;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    transform: rotate(180deg);
  }
`;

// COMPONENT DAYS
const RequestListContainer = styled.div`
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.8rem;
  border-radius: 11px;
  overflow-y: auto;
  max-height: 15rem;
`;

const TextTitle = styled.span`
  color: var(--color-grey-600);
  font-size: 1.8rem;
  font-weight: 700;
`;

const RequestListCard = styled.div`
  background-color: var(--color-brand-100);
  box-shadow: var(--shadow-sm);
  color: var(--color-brand-900);
  border-radius: 8px;
  display: flex;
  padding: 0.8rem;
  align-items: center;
  font-size: 1.6rem;
`;

const TextCreation = styled.span`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  width: 100%;
`;

const CreatedAt = styled.span`
  color: var(--color-grey-500);
  font-size: 1.6rem;
`;

const DaysRequest = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const DaysRequestInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const DaysNumber = styled.span`
  font-size: 2.4rem;
  font-weight: 800;
  transform: translateY(-5%);
`;

const DatesModal = styled.div`
  position: absolute;
  top: 85px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  box-shadow: var(--shadow-md);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  z-index: 10;
`;

const TimeTag = styled.label`
  //COLORS
  // Present:
  /* color: #b91c1c;
  border: 1px solid #ffd4d4;
  background-color: #fee2e2; */
  // Future:
  /* color: #0369a1;
  border: 1px solid #d1eeff;
  background-color: #e0f2fe; */
  // Past:
  color: #15803d;
  border: 1px solid #cbffde;
  background-color: #dcfce7;

  font-weight: 700;
  font-size: 1.4rem;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  user-select: none;
  text-transform: uppercase;
`;

interface PropsAuthorizationCard {
  holiday: HolidayInfo;
}

const AuthorizationCard: React.FC<PropsAuthorizationCard> = ({ holiday }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue } = useForm<HolidayInfo>({
    defaultValues: {
      authorizationAdmin: holiday.authorizationAdmin,
      authorizationManager: holiday.authorizationManager,
      observation: holiday.observation,
      observationAdmin: holiday.observationAdmin,
      observationManager: holiday.observationManager,
    },
  });

  const { user: curUser } = useUser();
  const { updateHoliday } = useUpdateHoliday();
  const [showDates, setShowDates] = useState(false);

  const { userAuthenticated } = useMe();

  if (!userAuthenticated) return null;
  if (!curUser) return null;

  const manager = holiday.manager as UserInfo | undefined;
  const admin = holiday.admin as UserInfo | undefined;

  const onSubmit = (data: HolidayInfo) => {
    const acceptedBy =
      userAuthenticated.role === 'admin'
        ? { admin: userAuthenticated.id }
        : { manager: userAuthenticated.id };

    updateHoliday(
      { id: holiday._id || '', newHoliday: { ...data, ...acceptedBy } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['user', curUser.id] });
        },
      }
    );
  };

  const printHandler = () => {
    const printElement = ReactDOMServer.renderToString(Print({ holiday }));
    const options = {
      margin: 0,
      filename: `holiday-${holiday._id}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(options).from(printElement).save();
  };

  return (
    <AuthorizationCardStyled>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Row type="horizontal">
            <Heading as="h2">
              Solicitud:{' '}
              <CreatedAt>
                {formatDate(holiday?.createdAt || '', {
                  monthsName: true,
                })}
              </CreatedAt>
            </Heading>
            <TimeTag>pasado</TimeTag>
          </Row>

          <EmployedItem>
            <DaysRequest>
              <DaysRequestInfo>
                <TextTitle>Días solicitados: </TextTitle>
                <DaysNumber>{holiday?.days?.length}</DaysNumber>
              </DaysRequestInfo>
              <ShowDatesButton onClick={() => setShowDates(!showDates)} type="button">
                {showDates ? 'Ocultar Fechas' : 'Mostrar Fechas'}
                <HiOutlineChevronDown
                  style={{
                    transform: showDates
                      ? 'translate(0px, 0px) rotate(-180deg)'
                      : 'translate(0px, 0px) rotate(0deg)',
                    transition: 'transform 0.3s',
                  }}
                />
              </ShowDatesButton>
              {showDates && (
                <DatesModal>
                  <RequestListContainer>
                    {holiday?.days?.map((day, i) => (
                      <RequestListCard key={i}>
                        <TextCreation>
                          {formatDate(day.toString(), { monthsName: true })}
                          <HiOutlineCalendarDays />
                        </TextCreation>
                      </RequestListCard>
                    ))}
                  </RequestListContainer>
                </DatesModal>
              )}
            </DaysRequest>

            <Authorization>
              <RowMain>
                <SubTitle>Observación</SubTitle>
                <span>Empleado</span>
              </RowMain>
              <ObservationField defaultValue={holiday?.observation} disabled={true} />
            </Authorization>
          </EmployedItem>

          {/* MANAGER */}
          <AuthorizationItem>
            <Status>
              <Title>Jefe Directo</Title>
              <StateHoliday state={holiday?.authorizationManager || 'pending'} />
            </Status>

            <Authorization>
              <RowMain>
                <SubTitle>Observación</SubTitle>
                <span>
                  {manager
                    ? joinName({
                        name: manager?.name || '',
                        paternSurname: manager?.paternSurname || '',
                        motherSurname: manager?.motherSurname || '',
                      })
                    : 'En proceso...'}
                </span>
              </RowMain>
              <ObservationField
                defaultValue={holiday?.observationManager}
                {...register('observationManager')}
                disabled={
                  userAuthenticated.role !== 'manager' ||
                  holiday.authorizationManager === 'approved'
                }
              />
              {userAuthenticated.role === 'manager' &&
                holiday.authorizationManager !== 'approved' && (
                  <AuthorizationButtons>
                    <Button
                      onClick={() => setValue('authorizationManager', 'approved')}
                      $color="#087f5b"
                    >
                      <HiOutlineCheck />
                      Aceptar
                    </Button>
                    <Button
                      onClick={() => setValue('authorizationManager', 'rejected')}
                      $color="#a61e4d"
                    >
                      <HiOutlineXMark />
                      Rechazar
                    </Button>
                  </AuthorizationButtons>
                )}
            </Authorization>
          </AuthorizationItem>

          {/* ADMIN */}
          <AuthorizationItem>
            <Status>
              <Title>Administrador</Title>
              <StateHoliday state={holiday?.authorizationAdmin || 'pending'} />
            </Status>

            <Authorization>
              <RowMain>
                <SubTitle>Observación</SubTitle>
                <span>
                  {admin
                    ? joinName({
                        name: admin?.name || '',
                        paternSurname: admin?.paternSurname || '',
                        motherSurname: admin?.motherSurname || '',
                      })
                    : 'En proceso...'}
                </span>
              </RowMain>
              <ObservationField
                defaultValue={holiday.observationAdmin}
                disabled={userAuthenticated.role !== 'admin'}
                {...register('observationAdmin')}
              />
              {userAuthenticated.role === 'admin' &&
                holiday.authorizationAdmin !== 'approved' && (
                  <AuthorizationButtons>
                    <Button
                      onClick={() => setValue('authorizationAdmin', 'approved')}
                      $color="#087f5b"
                    >
                      <HiOutlineCheck />
                      Aceptar
                    </Button>
                    <Button
                      onClick={() => setValue('authorizationAdmin', 'rejected')}
                      $color="#a61e4d"
                    >
                      <HiOutlineXMark />
                      Rechazar
                    </Button>
                  </AuthorizationButtons>
                )}
            </Authorization>
          </AuthorizationItem>
        </Row>
      </Form>

      {userAuthenticated.role === 'admin' &&
        holiday.authorizationAdmin === 'approved' &&
        holiday.authorizationManager === 'approved' && (
          <OptionsAuthorization>
            <ButtonPDF onClick={printHandler}>
              <FaFilePdf />
              <span>Descargar</span>
            </ButtonPDF>
          </OptionsAuthorization>
        )}
    </AuthorizationCardStyled>
  );
};

export default AuthorizationCard;
