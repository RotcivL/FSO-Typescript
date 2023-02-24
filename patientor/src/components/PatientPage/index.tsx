import { Patient, Gender } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import PatientEntry from './PatientEntry';

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

      <PatientEntry entries={patient.entries} />
    </div>
  );
};

export default PatientPage;
