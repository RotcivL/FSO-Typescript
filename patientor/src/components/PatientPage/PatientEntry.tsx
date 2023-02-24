import { useEffect, useState } from 'react';
import {
  Diagnosis,
  Entry,
  EntryTypes,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';
import diagnosesService from '../../services/diagnoses';
import HealthRatingBar from '../HealthRatingBar';
import PatientDiagnosis from './PatientDiagnosis';
import { Divider } from '@mui/material';
import {
  Healing,
  LocalHospital,
  MedicalInformation,
} from '@mui/icons-material';

interface Props {
  entries: Entry[];
}

const Healthcheck = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div>
      <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
    </div>
  );
};

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      Discharge Info:
      <br />
      Date: {entry.discharge.date}
      <br />
      Criteria: {entry.discharge.criteria}
    </div>
  );
};

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      Employer: {entry.employerName}
      {entry.sickLeave ? (
        <div>
          Sickleave:
          <br />
          Start Date: {entry.sickLeave.startDate}
          <br />
          End Date: {entry.sickLeave.endDate}
        </div>
      ) : null}
    </div>
  );
};

const PatientEntry = ({ entries }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const entryIcons = (entry: Entry) => {
    switch (entry.type) {
      case EntryTypes.HealthCheck:
        return <MedicalInformation />;
      case EntryTypes.Hospital:
        return <LocalHospital />;
      case EntryTypes.OccupationalHealthcare:
        return <Healing />;
      default:
        return assertNever(entry);
    }
  };

  const entryDetails = (entry: Entry) => {
    switch (entry.type) {
      case EntryTypes.HealthCheck:
        return <Healthcheck entry={entry} />;
      case EntryTypes.Hospital:
        return <Hospital entry={entry} />;
      case EntryTypes.OccupationalHealthcare:
        return <OccupationalHealthcare entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h2>entries</h2>
      {entries.map((entry: Entry) => (
        <div key={entry.id}>
          {entry.date} {entryIcons(entry)}
          <div>
            <em>{entry.description}</em>
          </div>
          {entry.diagnosisCodes ? (
            <PatientDiagnosis
              diagnosisCodes={entry.diagnosisCodes}
              diagnoses={diagnoses}
            />
          ) : null}
          {entryDetails(entry)}
          Diagnose by {entry.specialist}
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default PatientEntry;
