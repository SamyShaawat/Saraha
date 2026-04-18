import React from 'react';
import { useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { UserProfileCard } from '../components/profile/UserProfileCard';

export function UserProfilePage() {
  const { username } = useParams();

  return (
    <PageShell pageName="UserProfilePage" contentName="UserProfilePage.Container" centered maxWidth="700px">
      <UserProfileCard username={username} />
    </PageShell>
  );
}

export default UserProfilePage;
