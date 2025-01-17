import { HiMiniTrash, HiMiniPencil, HiEye } from 'react-icons/hi2';
import Menus from '../../../shared/ui/Menus';
import { UserInfo } from './../types';
import Table from '../../../shared/ui/Table';
import { useDeleteUser } from './../hooks/useDeleteUser';
import Modal from '../../../shared/ui/Modal';
import CreateUser from './createUser';
import ConfirmDelete from '../../../shared/ui/ConfirmDelete';
import { formatDate, yearMothDay } from '../../../shared/utils/helpers';
import { Link } from 'react-router-dom';

interface Props {
  user: UserInfo;
}

const UserRow: React.FC<Props> = ({ user }) => {
  const { deleteUser, isDeleting } = useDeleteUser();

  if (!user) return null;

  const {
    employNumber,
    dateHiring,
    name,
    paternSurname,
    motherSurname,
    email,
    position,
    enterprise,
    department,
    photo,
  } = user;

  if (!dateHiring) return;

  const dateHiringFormat = formatDate(dateHiring, {
    formatDate: 'yyyy-mm-dd',
    separationBy: '-',
    spaces: false,
  });

  const userId = user.id || '';
  const departmentId =
    typeof department === 'object' && department ? department._id || '' : '';
  const enterpriseId =
    typeof enterprise === 'object' && enterprise ? enterprise._id || '' : '';

  return (
    <>
      <Table.Row key={user.id} columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <span>{user.employNumber}</span>
        <span>
          {user.name} {user.paternSurname} {user.motherSurname}
        </span>
        <span>{formatDate(user.dateHiring + '')}</span>
        <span>
          {yearMothDay(
            user.seniority?.years,
            user.seniority?.moths,
            user.seniority?.days
          )}
        </span>
        <span>{user.department?.name}</span>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={userId} />

              <Menus.List id={userId}>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiMiniTrash />}>Eliminar</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiMiniPencil />}>Editar</Menus.Button>
                </Modal.Open>

                <Link to={userId}>
                  <Menus.Button icon={<HiEye />}>Ver</Menus.Button>
                </Link>
              </Menus.List>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="Empleados"
                  disabled={isDeleting}
                  onConfirm={() => deleteUser(userId)}
                />
              </Modal.Window>

              <Modal.Window name="edit">
                <CreateUser
                  userToUpdate={{
                    id: userId,
                    employNumber,
                    dateHiring: dateHiringFormat,
                    name,
                    email,
                    position,
                    enterprise: { _id: enterpriseId },
                    department: { _id: departmentId },
                    paternSurname,
                    motherSurname,
                    photo,
                  }}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default UserRow;
