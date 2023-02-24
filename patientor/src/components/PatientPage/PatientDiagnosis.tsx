import { Diagnosis } from '../../types';

interface Props {
  diagnosisCodes: Array<Diagnosis['code']>;
  diagnoses: Diagnosis[];
}

const PatientDiagnosis = ({ diagnosisCodes, diagnoses }: Props) => {
  return (
    <div>
      <ul>
        {diagnosisCodes.map(code => (
          <li key={code}>
            {code}{' '}
            {diagnoses
              .filter((diagnosis: Diagnosis) => diagnosis.code === code)
              .map(diagnosis => diagnosis.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDiagnosis;
