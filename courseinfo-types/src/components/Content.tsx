import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((coursePart, index) => (
        <Part key={index} part={coursePart} />
      ))}
    </div>
  );
};

export default Content;
