import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const StatLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
  }
`;

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
