import { useEffect, useState } from 'react';
import { Diagnosis, Entry } from '../../types';
import diagnosesService from '../../services/diagnoses';

interface Props {
  entries: Entry[];
}

const PatientEntry = ({ entries }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  return (
    <div>
      <h2>entries</h2>
      {entries.map((entry: Entry) => (
        <div key={entry.id}>
          {entry.date} <em>{entry.description}</em>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>
                {code}{' '}
                {diagnoses
                  .filter((diagnosis: Diagnosis) => diagnosis.code === code)
                  .map(diagnosis => diagnosis.name)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientEntry;
