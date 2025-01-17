import Heading from '../../../../shared/ui/Heading';
import Button from '../../../../shared/ui/Button';
import { Dispatch, SetStateAction } from 'react';

import FormPersonalData from './FormPersonalData';
import FormPersonalReference from './FormPersonalReference';
import FormClinicInformation from './FormClinicInformation';
import FormComplementaryData from './FormComplementaryData';
import FormScholarData from './FormScholarData';
import FormKnowledgeExperience from './FormKnowledgeExperience';
import FormFamiliarData from './FormFamilarData';
import { InitialContainer, Section } from '../../../../shared/ui/FormPieces';
import FormEmploysData from './FormEmploysData';

const RequestForm = ({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const handleNext = () => setPage((prevPage) => prevPage + 1);
  const handleBack = () => setPage((prevPage) => prevPage - 1);

  return (
    <Section>
      {page === 0 && (
        <InitialContainer>
          <Heading as="h1">Bienvenido</Heading>
          <Heading as="h2">
            Haga clic en comenzar para llenar el formulario de datos generales.
          </Heading>
          <Button $variation="primary" onClick={handleNext}>
            COMENZAR
          </Button>
        </InitialContainer>
      )}
      {page === 1 && <FormPersonalData handleNext={handleNext} />}
      {page === 2 && (
        <FormComplementaryData handleNext={handleNext} handleBack={handleBack} />
      )}
      {page === 3 && <FormEmploysData handleNext={handleNext} handleBack={handleBack} />}
      {page === 4 && <FormScholarData handleNext={handleNext} handleBack={handleBack} />}
      {page === 5 && (
        <FormKnowledgeExperience handleNext={handleNext} handleBack={handleBack} />
      )}
      {page === 6 && <FormFamiliarData handleNext={handleNext} handleBack={handleBack} />}{' '}
      {page === 7 && (
        <FormPersonalReference handleNext={handleNext} handleBack={handleBack} />
      )}
      {page === 8 && <FormClinicInformation handleBack={handleBack} />}
    </Section>
  );
};

export default RequestForm;
