import { CoursePart } from '../types';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((coursePart, index) => (
        <p key={index}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
