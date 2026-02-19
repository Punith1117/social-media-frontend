import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
`;

const StatLink = styled.a`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    text-decoration: underline;
  }
`;

const UserStats = ({ followersCount, followingCount, username }) => {
  return (
    <StatsContainer>
      <StatItem>
        <StatLink href={`/${username}/followers`}>
          <StatNumber>{followersCount}</StatNumber>
          <StatLabel>Followers</StatLabel>
        </StatLink>
      </StatItem>
      <StatItem>
        <StatLink href={`/${username}/following`}>
          <StatNumber>{followingCount}</StatNumber>
          <StatLabel>Following</StatLabel>
        </StatLink>
      </StatItem>
    </StatsContainer>
  );
};

export default UserStats;
