;

interface InsightCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, children, className = "" }) => (
  <div className={`rounded-lg p-6 bg-[#18181b]/80 ${className}`}>
    <h4 className="text-lg font-semibold text-light mb-2">{title}</h4>
    <div className="text-accent">{children}</div>
  </div>
);

export default InsightCard; 