import { TeamsListProps } from '@/app/util/interfaces';
import React from 'react';
const TeamsList: React.FC<TeamsListProps> = (props) => {
  const maxVisibleMembers = 3;

  return (
    <div className="flex items-center relative">
      {props.data.slice(0, maxVisibleMembers).map((member, index) => (
        <div
          key={index}
          className={`relative group flex items-center justify-center w-10 h-10 text-white text-sm font-bold rounded-full`}
          style={{
            backgroundColor: index === 0 ? '#97A6BA' : index === 1 ? '#C4B5FD' : '#6EE7B7',
            width: '42px',
            height: '42px',
            marginLeft: index === 0 ? '0' : '-10px', 
            zIndex: props.data.length - index, 
          }}
        >
          {/* Initials */}
          {member.lastName?.slice(0, 1)}
          {member.firstName?.slice(0, 1)}

          {/* Tooltip */}
          <div className="absolute bottom-[calc(100%+5px)] left-1/2 transform -translate-x-1/2 bg-white text-black shadow-xl text-xs font-medium py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {member.firstName} {member.lastName}
          </div>
        </div>
      ))}
      {props.data.length > maxVisibleMembers && (
        <div
          className="relative group flex items-center justify-center w-10 h-10 bg-gray-400 text-white text-sm font-bold rounded-full"
          style={{
            width: '42px',
            height: '42px',
            marginLeft: '-10px',
            zIndex: 0, 
          }}
        >
          +{props.data.length - maxVisibleMembers}

          {/* Tooltip */}
          <div className="absolute bottom-[calc(100%+5px)] left-1/2 transform -translate-x-1/2 bg-white text-black shadow-xl text-xs font-medium py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {props.data.slice(maxVisibleMembers).map((member) => `${member.firstName} ${member.lastName}`).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsList;
