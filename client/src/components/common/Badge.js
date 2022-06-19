const Badge = ({ badgeText }) => {
  return (
    <div className="bg-blue-50  h-6 w-24 mb-2 rounded-full flex items-center justify-center">
      <span className="text-xs text-neutral-600  font-medium">{badgeText}</span>
    </div>
  );
};

export default Badge;
