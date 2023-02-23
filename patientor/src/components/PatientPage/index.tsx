import { Patient, Gender } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface Props {
  patient: Patient | null | undefined;
}
const PatientPage = ({ patient }: Props) => {
  if (!patient) {
    return null;
  }

  const genderIcon = () => {
    if (patient.gender === Gender.Male) {
      return <MaleIcon />;
    } else if (patient.gender === Gender.Female) {
      return <FemaleIcon />;
    }
  };
  return (
    <div>
      <h1>
        {patient.name} {genderIcon()}
      </h1>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <h2>entries</h2>
      <div>
        {patient.entries.map(entry => (
          <div key={entry.id}>
            {entry.date} <em>{entry.description}</em>
            <ul>
              {entry.diagnosisCodes?.map(code => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
