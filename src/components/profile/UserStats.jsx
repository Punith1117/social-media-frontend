import React from 'react';
import {
  StatsContainer,
  StatItem,
  StatNumber,
  StatLabel,
  StatLink
} from './UserStats.styles';

const UserStats = ({ followersCount, followingCount, username }) => {
  return (
    <StatsContainer>
      <StatItem>
        <StatLink to={`/users/${username}/followers`}>
          <StatNumber>{followersCount}</StatNumber>
          <StatLabel>Followers</StatLabel>
        </StatLink>
      </StatItem>
      <StatItem>
        <StatLink to={`/users/${username}/following`}>
          <StatNumber>{followingCount}</StatNumber>
          <StatLabel>Following</StatLabel>
        </StatLink>
      </StatItem>
    </StatsContainer>
  );
};

export default UserStats;
