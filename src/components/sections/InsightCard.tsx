;

interface InsightCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, children, className = "" }) => (
  <div className={`rounded-lg p-6 bg-[#18181b]/80 ${className}`}>
    <h4 className="text-lg font-semibold text-[#F2F2F2] mb-2">{title}</h4>
    <div className="text-[#A6A6A6]">{children}</div>
  </div>
);

export default InsightCard; 