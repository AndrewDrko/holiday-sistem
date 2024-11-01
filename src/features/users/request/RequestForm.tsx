import Heading from '../../../ui/Heading';
import Button from '../../../ui/Button';
import { useState } from 'react';

import {
  EmployControllers,
  Field,
  FieldCheck,
  FieldRadio,
  Form,
  FormContainer,
  InitialContainer,
  Input,
  Label,
  Page,
  PageChange,
  Percentage,
  Section,
  Select,
  Title,
} from '../../../ui/FormPieces';
import FormPersonalData from './FormPersonalData';
import FormPersonalReference from './FormPersonalReference';

const RequestForm = () => {
  const [page, setPage] = useState(0);
  const [employs, setEmploys] = useState([{}]); // Almacena los formularios de empleo (inicia con 1)

  const handleNext = () => setPage((prevPage) => prevPage + 1);
  const handleBack = () => setPage((prevPage) => prevPage - 1);

  // Función para agregar un formulario de empleo
  const addEmploy = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    if (employs.length < 3) {
      setEmploys([...employs, {}]);
    }
  };

  // Función para quitar un formulario de empleo
  const removeEmploy = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    if (employs.length > 1) {
      setEmploys(employs.slice(0, -1));
    }
  };

  return (
    <Section>
      {page === 0 && (
        <InitialContainer>
          <Heading as="h1">Bienvenido</Heading>
          <Heading as="h2">
            Haga clic en continuar para comenzar a llenar la solicitud de empleo
          </Heading>
          <Button $variation="primary" onClick={handleNext}>
            COMENZAR
          </Button>
        </InitialContainer>
      )}

      <Form>
        {page === 1 && <FormPersonalData handleNext={handleNext} />}

        {page === 2 && (
          <Page>
            <Title as="h2">DATOS COMPLEMENTARIOS</Title>
            <FormContainer>
              <Field>
                <Label>R.F.C.</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>No. Afiliación al IMSS</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>CURP</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>No. Crédito Infonavit</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>Afore</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>¿Disponibilidad para viajar?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="travel"></Input>
                  <span>No</span>
                  <Input type="radio" name="travel"></Input>
                </FieldRadio>
              </Field>

              <Field>
                <Label>No. IMSS</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>No. Crédito Infonavit</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>¿Podría cambiar de residencia?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="residence"></Input>
                  <span>No</span>
                  <Input type="radio" name="residence"></Input>
                </FieldRadio>
              </Field>

              <Field>
                <Label>Licencia</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>¿Tiene familiares en DAI?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="family"></Input>
                  <span>No</span>
                  <Input type="radio" name="family"></Input>
                </FieldRadio>
              </Field>

              <Field>
                <Label>¿Por qué medio se enteró del puesto?</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>¿Ha trabajado en DAI?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="work-before"></Input>
                  <span>No</span>
                  <Input type="radio" name="work-before"></Input>
                </FieldRadio>
              </Field>

              <Field>
                <Label>¿En qué Fecha?</Label>
                <Input type="date"></Input>
              </Field>

              <Field>
                <Label>¿En qué Departamento?</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>¿Con quién vive actualmente?</Label>
                <Input type="text"></Input>
              </Field>

              <Field>
                <Label>¿Dependen personas económicamente de usted?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="depending"></Input>
                  <span>No</span>
                  <Input type="radio" name="depending"></Input>
                </FieldRadio>
              </Field>

              <Field>
                <Label>¿Contribuye con el gasto familiar?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="familiar-contribution"></Input>
                  <span>No</span>
                  <Input type="radio" name="familiar-contribution"></Input>
                </FieldRadio>
              </Field>

              <Field>
                <Label>¿Posee Automóvil propio?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>

              <Field>
                <Label>Marca y Modelo</Label>
                <Input type="text"></Input>
              </Field>
            </FormContainer>
            <PageChange>
              <Button $variation="primary" onClick={handleBack}>
                Atrás
              </Button>

              <Button $variation="confirm" onClick={handleNext}>
                Siguiente
              </Button>
            </PageChange>
          </Page>
        )}

        {page === 3 && (
          <Page>
            <Title as="h2">DATOS DE EMPLEOS</Title>
            {employs.map((_, index) => (
              <FormContainer key={index}>
                <Field>
                  <Label>Nombre de la compañía</Label>
                  <Input type="text"></Input>
                </Field>
                <Field>
                  <Label>Giro</Label>
                  <Input type="text"></Input>
                </Field>
                <Field>
                  <Label>Domicilio</Label>
                  <Input type="text"></Input>
                </Field>
                <Field>
                  <Label>Teléfono</Label>
                  <Input type="text"></Input>
                </Field>
                <Field>
                  <Label>Fecha de Ingreso</Label>
                  <Input type="date"></Input>
                </Field>
                <Field>
                  <Label>Fecha de Salida</Label>
                  <Input type="date"></Input>
                </Field>
                <Field>
                  <Label>Puesto Desempeñado</Label>
                  <Input type="text"></Input>
                </Field>
                <Field>
                  <Label>Sueldo Final</Label>
                  <Input type="text"></Input>
                </Field>
                <Field>
                  <Label>Nombre de Jefe Inmediato</Label>
                  <Input type="text"></Input>
                </Field>
                <Field>
                  <Label>Motivo de Separación</Label>
                  <Input type="text"></Input>
                </Field>
              </FormContainer>
            ))}

            <EmployControllers>
              <Button
                $variation="secondary"
                type="button" // Añadir este atributo
                onClick={removeEmploy}
                disabled={employs.length === 1}
              >
                Quitar Empleo
              </Button>

              <Button
                $variation="secondary"
                type="button" // Añadir este atributo
                onClick={addEmploy}
                disabled={employs.length === 3}
              >
                Agregar Empleo
              </Button>
            </EmployControllers>

            <PageChange>
              <Button $variation="primary" onClick={handleBack}>
                Atrás
              </Button>

              <Button $variation="confirm" onClick={handleNext}>
                Siguiente
              </Button>
            </PageChange>
          </Page>
        )}

        {page === 4 && (
          <Page>
            <Title as="h2">DATOS ESCOLARES</Title>
            <Title as="h3">Secundaria</Title>
            <FormContainer>
              <Field>
                <Label>Años Cursados</Label>
                <Input type="number"></Input>
              </Field>
              <Field>
                <Label>Nombre de la Escuela</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Fecha de Inicio</Label>
                <Input type="date"></Input>
              </Field>
              <Field>
                <Label>Fecha de Término</Label>
                <Input type="date"></Input>
              </Field>
              <Field>
                <Label>Certificado o Título</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
            </FormContainer>

            <Title as="h3">Bachillerato ó Carrera Técnica</Title>
            <FormContainer>
              <Field>
                <Label>Años Cursados</Label>
                <Input type="number"></Input>
              </Field>
              <Field>
                <Label>Nombre de la Escuela</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Fecha de Inicio</Label>
                <Input type="date"></Input>
              </Field>
              <Field>
                <Label>Fecha de Término</Label>
                <Input type="date"></Input>
              </Field>
              <Field>
                <Label>Certificado o Título</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
            </FormContainer>

            <Title as="h3">Licenciatura</Title>
            <FormContainer>
              <Field>
                <Label>Años Cursados</Label>
                <Input type="number"></Input>
              </Field>
              <Field>
                <Label>Nombre de la Escuela</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Fecha de Inicio</Label>
                <Input type="date"></Input>
              </Field>
              <Field>
                <Label>Fecha de Término</Label>
                <Input type="date"></Input>
              </Field>
              <Field>
                <Label>Certificado o Título</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
            </FormContainer>

            <Title as="h3">Especialidad y Otros</Title>
            <FormContainer>
              <Field>
                <Label>Años Cursados</Label>
                <Input type="number"></Input>
              </Field>
              <Field>
                <Label>Nombre de la Escuela</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Fecha de Inicio</Label>
                <Input type="date"></Input>
              </Field>
              <Field>
                <Label>Fecha de Término</Label>
                <Input type="date"></Input>
              </Field>
              <Field>
                <Label>Certificado o Título</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
              <Field>
                <Label>Especifique Nombre de la Carrera</Label>
                <Input type="text"></Input>
              </Field>
            </FormContainer>

            <Title as="h3">Estudios Actuales</Title>
            <FormContainer>
              <Field>
                <Label>¿Estudia Actualmente?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
              <Field>
                <Label>Horario</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>¿Qué Estudia?</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Escuela</Label>
                <Input type="text"></Input>
              </Field>
            </FormContainer>
            <PageChange>
              <Button $variation="primary" onClick={handleBack}>
                Atrás
              </Button>

              <Button $variation="confirm" onClick={handleNext}>
                Siguiente
              </Button>
            </PageChange>
          </Page>
        )}

        {page === 5 && (
          <Page>
            <Title as="h2">CONOCIMIENTOS Y EXPERIENCIA</Title>
            <Title as="h3">Idioma Inglés</Title>
            <FormContainer>
              <Field>
                <Label>Habla</Label>
                <Percentage>
                  <Input type="number"></Input>
                  <span>%</span>
                </Percentage>
              </Field>
              <Field>
                <Label>Escribe</Label>
                <Percentage>
                  <Input type="number"></Input>
                  <span>%</span>
                </Percentage>
              </Field>
            </FormContainer>

            <Title as="h3">Otro Idioma</Title>
            <FormContainer>
              <Field>
                <Label>Idioma</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Habla</Label>
                <Percentage>
                  <Input type="number"></Input>
                  <span>%</span>
                </Percentage>
              </Field>
              <Field>
                <Label>Escribe</Label>
                <Percentage>
                  <Input type="number"></Input>
                  <span>%</span>
                </Percentage>
              </Field>
            </FormContainer>

            <Title as="h3">Experiencia en:</Title>
            <FormContainer>
              <FieldCheck>
                <Label>Compras</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Cred. y Cob.</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Almacén</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Comer. Ext.</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Ventas</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Rel. Públicas</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Contabilidad</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Mecánico</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Compras</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Mercadotecnia</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Paquetes Software</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Publicidad</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Secretariado</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
              <FieldCheck>
                <Label>Promotora</Label>
                <Input type="checkbox"></Input>
              </FieldCheck>
            </FormContainer>

            <FormContainer>
              <Field>
                <Label>¿Tiene experiencia práctica en el puesto que solicita?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
              <Field>
                <Label>Especifique</Label>
                <Input type="text"></Input>
              </Field>
            </FormContainer>
            <PageChange>
              <Button $variation="primary" onClick={handleBack}>
                Atrás
              </Button>

              <Button $variation="confirm" onClick={handleNext}>
                Siguiente
              </Button>
            </PageChange>
          </Page>
        )}
        {page === 6 && (
          <Page>
            <Title as="h2">DATOS FAMILIARES</Title>
            <Title as="h3">Padre</Title>
            <FormContainer>
              <Field>
                <Label>Nombre Completo</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>¿Vive?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
              <Field>
                <Label>Edad</Label>
                <Input type="number"></Input>
              </Field>
              <Field>
                <Label>Ocupación</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Domicilio</Label>
                <Input type="text"></Input>
              </Field>
            </FormContainer>
            <Title as="h3">Madre</Title>
            <FormContainer>
              <Field>
                <Label>Nombre Completo</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>¿Vive?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
              <Field>
                <Label>Edad</Label>
                <Input type="number"></Input>
              </Field>
              <Field>
                <Label>Ocupación</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Domicilio</Label>
                <Input type="text"></Input>
              </Field>
            </FormContainer>
            <Title as="h3">Esposo(a)</Title>
            <FormContainer>
              <Field>
                <Label>Nombre Completo</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>¿Vive?</Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
              <Field>
                <Label>Edad</Label>
                <Input type="number"></Input>
              </Field>
              <Field>
                <Label>Ocupación</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Domicilio</Label>
                <Input type="text"></Input>
              </Field>
            </FormContainer>

            <Title as="h3">Hijo 1</Title>
            <FormContainer>
              <Field>
                <Label>Nombre Completo</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Sexo</Label>
                <Select>
                  <option>Seleccione una opción...</option>
                  <option>Masculino</option>
                  <option>Femenino</option>
                </Select>
              </Field>
              <Field>
                <Label>Edad</Label>
                <Input type="number"></Input>
              </Field>
              <Field>
                <Label>Ocupación</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Domicilio</Label>
                <Input type="text"></Input>
              </Field>
            </FormContainer>
            <Title as="h3">Hijo 2</Title>
            <FormContainer>
              <Field>
                <Label>Nombre Completo</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Sexo</Label>
                <Select>
                  <option>Seleccione una opción...</option>
                  <option>Masculino</option>
                  <option>Femenino</option>
                </Select>
              </Field>
              <Field>
                <Label>Edad</Label>
                <Input type="number"></Input>
              </Field>
              <Field>
                <Label>Ocupación</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Domicilio</Label>
                <Input type="text"></Input>
              </Field>
            </FormContainer>
            <Title as="h3">Hijo 3</Title>
            <FormContainer>
              <Field>
                <Label>Nombre Completo</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Sexo</Label>
                <Select>
                  <option>Seleccione una opción...</option>
                  <option>Masculino</option>
                  <option>Femenino</option>
                </Select>
              </Field>
              <Field>
                <Label>Edad</Label>
                <Input type="number"></Input>
              </Field>
              <Field>
                <Label>Ocupación</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>Domicilio</Label>
                <Input type="text"></Input>
              </Field>
            </FormContainer>

            <PageChange>
              <Button $variation="primary" onClick={handleBack}>
                Atrás
              </Button>

              <Button $variation="confirm" onClick={handleNext}>
                Siguiente
              </Button>
            </PageChange>
          </Page>
        )}
        {page === 7 && (
         <FormPersonalReference handleNext={handleNext} handleBack={handleBack}/>)}
        {page === 8 && (
          <Page>
            <Title as="h2">INFORMACIÓN CLÍNICA</Title>
            <FormContainer>
              <Field>
                <Label>Estatura</Label>
                <Percentage>
                  <Input type="number"></Input>
                  <span>cm</span>
                </Percentage>
              </Field>
              <Field>
                <Label>Peso</Label>
                <Percentage>
                  <Input type="number"></Input>
                  <span>Kg</span>
                </Percentage>
              </Field>
              <Field>
                <Label>Tipo de Sangre</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>
                  ¿Padece o padeció enfermedades que necesiten atención médica?
                </Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
              <Field>
                <Label>¿Qué enfermedades?</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>
                  ¿En el transcurso del último año ha tenido algún tipo de intervención
                  quirúrgica?
                </Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
              <Field>
                <Label>¿De qué tipo?</Label>
                <Input type="text"></Input>
              </Field>
              <Field>
                <Label>
                  ¿Tiene algún inpedimento físico que lo limite en su trabajo?
                </Label>
                <FieldRadio>
                  <span>Sí</span>
                  <Input type="radio" name="car"></Input>
                  <span>No</span>
                  <Input type="radio" name="car"></Input>
                </FieldRadio>
              </Field>
            </FormContainer>
            <FieldCheck>
              <Label>
                Certifico que la información aquí proporcionada es verídica, por lo que
                autorizo a Distribuidora de Auto Industrias, S.A de C.V, a corroborarla
                cuestionando a las referencias señaladas tanto sobre mi conducta personal
                como laboral, así como el uso de mis datos personales con base en el aviso
                de privacidad de la empresa, el cual podré consultar en www.dai.com.mx,
                reconociemdo que la presente solicitud no significa el establecimiento de
                ninguna relación laboral, ni crea el compromiso de que ésta me otorgue.
              </Label>
              <Input type="checkbox"></Input>
            </FieldCheck>
            <PageChange>
              <Button $variation="primary" onClick={handleBack}>
                Atrás
              </Button>
            </PageChange>
          </Page>
        )}
      </Form>
    </Section>
  );
};

export default RequestForm;
