import './Icon.css';

interface IconProps {
  id: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  onClick: (id: string) => void;
}

const Icon: React.FC<IconProps> = ({ id, title, icon, x, y, onClick }) => {
  return (
    <div
      className="desktop-icon"
      style={{ left: `${x}px`, top: `${y}px` }}
      onDoubleClick={() => onClick(id)}
    >
      <div className="icon-image">{icon}</div>
      <div className="icon-title">{title}</div>
    </div>
  );
};

export default Icon;
